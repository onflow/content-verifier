"use client";
import { HashInput } from "./components/HashInput";
import { DisplayContent } from "./components/DisplayContent";
import { useState } from "react";
import { SignHash } from "./components/SignHash";

import * as fcl from "@onflow/fcl";

export default function Home() {
  const [hash, setHash] = useState<string>(
    "QmQqzMTavQgT4f4T5v6PWBp7XNKtoPmC9jvn12WPT3gkSE"
  );
  const [isVerified, setIsVerified] = useState<boolean | null>(false)
  const onLookup = async (hash: string) => {
    setIsVerified(null)
    setHash(hash);

    const hashInfo = await fcl.query({
      cadence: `
        import ContentVerifier from 0x9e107eadd013f40e

        pub fun main(hash: String): ContentVerifier.HashInfo? {
          let contentVerifier = getAccount(0x9e107eadd013f40e)
        
          let hashTableCapability = contentVerifier.getCapability<&ContentVerifier.HashTable>(/public/hashTable)
          
          let hashTableRef = hashTableCapability.borrow() 
              ?? panic("could not borrow reference to HashTable capability")
        
          let hashInfo = hashTableRef.getHash(hash: hash)

          return hashInfo
        }
      `,
      args: (arg: any, t: any) => [arg(hash, t.String)],
    })
    const isVerified = await fcl.AppUtils.verifyUserSignatures(
      Buffer.from(hashInfo.hash).toString("hex"),
      [{f_type: "CompositeSignature", f_vsn: "1.0.0", addr: hashInfo.address, keyId: 1, signature: hashInfo.signature}],
    )

    setIsVerified(isVerified)

  }
  const onSign = async () => {
    // use fcl to sign hash and return signature
    try {
      const MSG = Buffer.from(hash).toString("hex");
      const sign = await fcl.currentUser.signUserMessage(MSG);
      const [{ signature }] = sign
      onSigning(hash, signature);
    } catch (error) {
      console.log(error);
    }
  };

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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none"></div>
      </div>

      <div className="relative flex flex-col place-items-center">
        <HashInput onLookup={onLookup} />
        {hash && <DisplayContent hash={hash} isVerified={isVerified} />}
        <SignHash onSign={onSign} />
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left"></div>
    </main>
  );
}
