"use client";

import { DisplayContent } from "@/app/components/DisplayContent";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { useUserContent } from "../hooks/useUserContent";

export default function YourContent() {
  const { onUserContent } = useUserContent();

  // TODO: query for hashes
  //let account = ""
  //let userHashes: [] = onUserContent(account)
  let userHashes = [];

  return (
    <ThirdwebProvider>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        {userHashes.length == 0
          ? "Sign content to have it displayed here!"
          : null}
      </main>
    </ThirdwebProvider>
  );
}
