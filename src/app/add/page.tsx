"use client";

import { useState } from "react";
import { DisplayContent } from "@/app/components/DisplayContent";
import { UploadContent } from "../components/UploadContent";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { SignHash } from "../components/SignHash";

import { useLookup } from "../hooks/useLookup";
import { useSign } from "../hooks/useSign";

export default function Add() {
  const { hash, onLookup, isVerified, ownerAddress } = useLookup()
  const { onSign } = useSign()

  return (
    <ThirdwebProvider>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <UploadContent onUpload={onLookup} />
        {hash && <DisplayContent hash={hash} isVerified={isVerified} ownerAddress={ownerAddress}/>}
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
