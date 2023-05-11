"use client";
import { HashInput } from "./components/HashInput";
import { DisplayContent } from "./components/DisplayContent";
import { useLookup } from "./hooks/useLookup";

export default function Home() {
  const { hash, onLookup, isVerified, ownerAddress } = useLookup();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none"></div>
      </div>

      <div className="m-12 w-full relative flex flex-col place-items-center h-full overflow-auto">
        <div className="place-items-start text-left w-1/2">
          <h4 className="text-xl text-gray-900 dark:text-white">
            Content verification is a two step process
          </h4>
          <div className="text-md text-gray-900 dark:text-white">
            <span className="font-bold">Step one:</span> Add content and sign
            the IPFS hash
          </div>
          <div className="text-md text-gray-900 dark:text-white">
            <span className="font-bold">Step two:</span> Display content with
            source verification
          </div>
        </div>

        <div className="mt-10 place-items-start text-left w-1/2">
          <h4 className="text-xl text-gray-900 dark:text-white text-left">
            Look up IFPS hash to verify content ownership:
          </h4>
          <span className="text-sm font-bold">Unverified: </span>
          <h3 className="text-sm text-gray-900 dark:text-white text-left">
            QmQqzMTavQgT4f4T5v6PWBp7XNKtoPmC9jvn12WPT3gkSE
          </h3>
          <span className="text-sm font-bold">Verified: </span>
          <h3 className="text-sm text-gray-900 dark:text-white text-left">
            QmUiAxDHZMJSVM7umzAZ1ojJjZmxWGWUffyiG1v8TC7mob
          </h3>
          <HashInput onLookup={onLookup} />
          {hash && (
            <DisplayContent
              hash={hash}
              isVerified={isVerified}
              ownerAddress={ownerAddress}
            />
          )}
        </div>
      </div>

      <div className="flex w-full mb-32 text-center lg:mb-0">
        This application is built on the Flow blockchain using fcl-js. It is a
        fully frontend application. It allows users to prove proof of ownership
        of their assert on IPFS (InterPlanetary File System). Ownership can be
        publicly verified by comparing the signature retrieved from the
        blockchain to the accompanying account address.
      </div>
    </main>
  );
}
