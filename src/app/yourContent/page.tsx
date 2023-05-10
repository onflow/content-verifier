"use client";
import { DisplayContent } from "@/app/components/DisplayContent";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { useUserContent } from "../hooks/useUserContent";


export default function YourContent() {
  const { userHashes, onUserContent } = useUserContent();


  // TODO: Display content from userHashes
  return (
    <ThirdwebProvider>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        {(userHashes == null || userHashes.length == 0)
          ? "Sign content to have it displayed here!"
          : <DisplayContent hash={userHashes[0]}/>} 
      </main>
    </ThirdwebProvider>
  );
}
