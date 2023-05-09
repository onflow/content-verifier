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
      <nav className="bg-white border-gray-200 dark:bg-gray-900 w-full">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Image
            src="/flow-logo.png"
            className="h-8 mr-3"
            alt="Flowbite Logo"
            width={40}
            height={40}
          />
          <verifier.SignInButton />
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a
                  href="add"
                  className="block m-2 py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Add Content
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

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
