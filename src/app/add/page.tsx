"use client";
import { useEffect, useState } from "react";
import { DisplayContent } from "@/app/components/DisplayContent";
import { UploadContent } from "../components/UploadContent";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { SignHash } from "../components/SignHash";
import { useLookup } from "../hooks/useLookup";
import { useSign } from "../hooks/useSign";
import * as fcl from "@onflow/fcl";
import { useMemo } from "react";

export default function Add() {
  const { hash, onLookup, isVerified, ownerAddress } = useLookup();
  const [address, setAddress] = useState<string | null>(ownerAddress);

  console.log("add isVerified", isVerified);
  useMemo(async () => {
    // use logged in user as default owner
    if (!ownerAddress) {
      const currentUser = await fcl.currentUser.snapshot();
      if (currentUser?.addr) setAddress(currentUser?.addr);
    }
  }, [ownerAddress]);

  const onUpload = async (hash: string) => {
    await onLookup(hash);
  };

  const onStatusChange = (statusCode: number) => {
    console.log("update txStatus", statusCode);
    if (statusCode === 4 && hash) {
      onLookup(hash);
    }
  };

  return (
    <ThirdwebProvider>
      <main className="flex min-h-screen flex-col items-center p-24">
        {!hash && (
          <>
            <div className="text-xl block m-2 py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
              Upload Image, Save to IPFS, and Sign
            </div>
            <UploadContent onUpload={onUpload} />
          </>
        )}

        {hash && (
          <>
            <div className="text-xl block m-2 py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
              Sign IPFS Hash
            </div>

            <DisplayContent
              hash={hash}
              isVerified={isVerified}
              ownerAddress={address}
            />
            <SignHash hash={hash} onStatusChange={onStatusChange} />
          </>
        )}
      </main>
    </ThirdwebProvider>
  );
}
