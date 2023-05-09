"use client"

import { useState } from "react";
import { HashInput } from "@/app/components/HashInput"
import { DisplayContent } from "@/app/components/DisplayContent"


export default function Add() {
    const [hash, setHash] = useState<string>("QmQqzMTavQgT4f4T5v6PWBp7XNKtoPmC9jvn12WPT3gkSE");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <HashInput onLookup={setHash} />
        <DisplayContent hash={hash} />
    </main>
  )
}
