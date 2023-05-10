"use client";
import { DisplayContent } from "@/app/components/DisplayContent";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { useUserContent } from "../hooks/useUserContent";
import { useState } from "react";


export default function YourContent() {
  const { userHashes, onUserContent } = useUserContent();
  const [imageIndex, setImageIndex] = useState<number>(0);

  function nextImage() {
    if (userHashes == null) {
      return
    }
    setImageIndex((imageIndex + 1) % userHashes.length)
  }

  return (
    <ThirdwebProvider>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button onClick={onUserContent}>Load Content</button>
      <div>
        {(userHashes == null || userHashes.length == 0)
          ? "Sign content to have it displayed here!"
          : <DisplayContent hash={userHashes[imageIndex].hash}/>} 
        <button onClick={nextImage}>NextImage</button>
      </div>
      </main>
    </ThirdwebProvider>
  );
}


