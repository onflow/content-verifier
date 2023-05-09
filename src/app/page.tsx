'use client';
import Image from 'next/image';
import { HashInput } from './components/HashInput';
import { DisplayContent } from './components/DisplayContent';
import { useState } from 'react';
import { SignHash } from './components/SignHash';
import * as verifier from './fcl-verifier';

import * as fcl from '@onflow/fcl';

export default function Home() {
  const [hash, setHash] = useState<string>(
    'QmQqzMTavQgT4f4T5v6PWBp7XNKtoPmC9jvn12WPT3gkSE'
  );
  const onLookup = async (hash: string) => {
    console.log(hash);
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
      args: (arg, t) => [arg(hash, t.String)],
    });
    console.log(hashInfo);
  };
  const onSign = async () => {
    // use fcl to sign hash and return signature
    try {
      const MSG = Buffer.from(hash).toString('hex');
      const [{ signature }] = await fcl.currentUser.signUserMessage(MSG);
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
      args: (arg, t) => [arg(hash, t.String), arg(signature, t.String)],
    });

    fcl.tx(transactionId).subscribe((res) => console.log(res.status));
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none"></div>
      </div>

      <div className="relative flex flex-col place-items-center">
        <HashInput onLookup={onLookup} />
        {hash && <DisplayContent hash={hash} />}
        <SignHash onSign={onSign} />
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left"></div>
    </main>
  );
}
