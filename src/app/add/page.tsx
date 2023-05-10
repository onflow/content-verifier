"use client";

import { useState } from "react";
import { DisplayContent } from "@/app/components/DisplayContent";
import { UploadContent } from "../components/UploadContent";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { useLookup } from "../hooks/useLookup";

export default function Add() {
  const {hash, onLookup, isVerified, ownerAddress} = useLookup()

  return (
    <ThirdwebProvider>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <UploadContent onUpload={onLookup} />

        {hash && <DisplayContent hash={hash} isVerified={isVerified} ownerAddress={ownerAddress}/>}
      </main>
    </ThirdwebProvider>
  );
}
