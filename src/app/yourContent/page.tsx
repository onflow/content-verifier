"use client";

import { useState } from "react";
import { DisplayContent } from "@/app/components/DisplayContent";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import * as fcl from "@onflow/fcl";

// TODO: Query user table for hash info on the accounts

export default function YourContent() {

  let userContent = []

  
  return (
    <ThirdwebProvider>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {userContent.length == 0 ? "Sign content to have it displayed here!" : null}
      </main>
    </ThirdwebProvider>
  );
}
