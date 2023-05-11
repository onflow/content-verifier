"use client";
import { DisplayContent } from "@/app/components/DisplayContent";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { useUserContent } from "../hooks/useUserContent";
import { useLookup } from "../hooks/useLookup";
import { useState } from "react";

export default function YourContent() {
  const { userHashes, onUserContent } = useUserContent();
  const { hash, onLookup, isVerified, ownerAddress } = useLookup();
  const [imageIndex, setImageIndex] = useState<number>(0);
  const [loaded, setLoaded] = useState<boolean>(false);

  async function loadContent() {
    setLoaded(true)
    await onUserContent()
    if (userHashes == null) {
      return
    }
    await onLookup(userHashes[imageIndex].hash)
  }

  function nextImage() {
    if (userHashes == null) {
      return
    }
    setImageIndex((imageIndex + 1) % userHashes.length)
    void onLookup(userHashes[imageIndex].hash)
  }

  if (!loaded) {
    loadContent()
  }

  return (
    <ThirdwebProvider>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button onClick={nextImage}>NextImage</button>
      <button onClick={loadContent}>Reload</button>
      <div>
        {(userHashes == null || userHashes.length == 0)
          ? "Sign content to have it displayed here!"
          : <DisplayContent hash={hash? hash : ""} isVerified={isVerified} ownerAddress={ownerAddress}/>} 
      </div>
      </main>
    </ThirdwebProvider>
  );
}


