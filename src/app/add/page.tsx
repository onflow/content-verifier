"use client";

import { useState } from "react";
import { DisplayContent } from "@/app/components/DisplayContent";
import { UploadContent } from "../components/UploadContent";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { SignHash } from "../components/SignHash";

import * as fcl from "@onflow/fcl";

export default function Add() {
  const [hash, setHash] = useState<string | undefined>();

  const onSign = async () => {
    if (hash == undefined) {
      return
    }
    // use fcl to sign hash and return signature
    try {
      const MSG = Buffer.from(hash).toString("hex");
      const sign = await fcl.currentUser.signUserMessage(MSG);
      const [{ signature }] = sign
      onSigning(hash, signature)
    } catch (error) {
      console.log(error);
    }
  }

  const onSigning = async (hash: String, signature: String) => {
    console.log({ hash, signature });

    const transactionId = await fcl.mutate({
      cadence: `
        import ContentVerifier from 0x9e107eadd013f40e

        transaction (hash: String, signature: String) {
        
          let hashTableRef: &ContentVerifier.HashTable
          let address: Address
        
          prepare(signer: AuthAccount) {
            let contentVerifier = getAccount(0x9e107eadd013f40e)
            self.address = signer.address
            self.hashTableRef = contentVerifier.getCapability<&ContentVerifier.HashTable>(/public/hashTable).borrow() 
              ?? panic("could not borrow reference to HashTable")
          }
        
          execute {
            self.hashTableRef.addHash(hash: hash, address: self.address, signature: signature);
          }
        }
      `,
      args: (arg: any, t: any) => [
        arg(hash, t.String),
        arg(signature, t.String),
      ],
    });

    fcl.tx(transactionId).subscribe((res: any) => console.log(res.status));
  };

  return (
    <ThirdwebProvider>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <UploadContent onUpload={setHash} />
        <DisplayContent hash={hash} />
        {hash != undefined
        ? <SignHash onSign={onSign} />
        : <a
        className="block m-2 py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
        >
        Add content to sign
      </a>
      }
      </main>
    </ThirdwebProvider>
  );
}