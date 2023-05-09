"use client"

import { useState } from "react";
import { HashInput } from "@/app/components/HashInput"
import { DisplayContent } from "@/app/components/DisplayContent"
import { UploadContent } from "../components/UploadContent";
import { ThirdwebProvider } from "@thirdweb-dev/react";


export default function Add() {
  const [hash, setHash] = useState<string>("");

  return (
    <ThirdwebProvider>
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <UploadContent onUpload={setHash} />
        <DisplayContent hash={hash} />
    </main>
    </ThirdwebProvider>
  )
}
