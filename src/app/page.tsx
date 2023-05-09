'use client';
import Image from 'next/image';
import { HashInput } from './components/HashInput';
import { DisplayContent } from './components/DisplayContent';
import { useState } from 'react';
import { SignHash } from './components/SignHash';
import * as verifier from './fcl-verifier';

export default function Home() {
  const [hash, setHash] = useState<string>(
    'QmQqzMTavQgT4f4T5v6PWBp7XNKtoPmC9jvn12WPT3gkSE'
  );
  const onLookup = (hash: string) => {
    console.log(hash);
    setHash(hash);
  };
  const onSign = (signature: string) => {};

  const onSigning = (signature: string) => {
    console.log(signature);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none"></div>
      </div>

      <div className="relative flex flex-col place-items-center">
        <HashInput onLookup={onLookup} />
        {hash && <DisplayContent hash={hash} />}
        <SignHash hash={hash} onSigning={onSigning} />
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left"></div>
    </main>
  );
}
