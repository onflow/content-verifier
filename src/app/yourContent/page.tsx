"use client";
import { DisplayContent } from "@/app/components/DisplayContent";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { useUserContent } from "../hooks/useUserContent";
import { useLookup } from "../hooks/useLookup";
import { useEffect, useState } from "react";
import * as fcl from "@onflow/fcl";
import "@/app/config";

export default function YourContent() {
  const { userHashes, onUserContent } = useUserContent();
  const { hash, onLookup, isVerified, ownerAddress } = useLookup();
  const [imageIndex, setImageIndex] = useState<number>(0);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [user, setUser] = useState({ loggedIn: null, addr: null });

  useEffect(() => {
    fcl.currentUser.subscribe(setUser);
  }, []);

  useEffect(() => {
    if (!user?.addr) {
      return;
    }
    setLoaded(true);
    onUserContent(user.addr).finally(() => {
      loadContent();
      setLoaded(false);
    });
  }, [user?.addr]);

  const loadContent = () => {
    console.log(userHashes[imageIndex]?.hash);
    if (userHashes[imageIndex]?.hash) {
      onLookup(userHashes[imageIndex]?.hash).finally(() => {
        setLoaded(false);
      });
    }
  };

  useEffect(() => {
    if (userHashes[imageIndex]?.hash) {
      onLookup(userHashes[imageIndex]?.hash).finally(() => {
        loadContent();
        setLoaded(false);
      });
    }
  }, [userHashes.length, imageIndex]);

  const nextImage = () => {
    if (imageIndex < userHashes.length - 1) {
      setImageIndex(imageIndex + 1);
    }
  };

  const previousImage = () => {
    if (imageIndex > 0) {
      setImageIndex(imageIndex - 1);
    }
  };

  return (
    <ThirdwebProvider>
      <main className="flex min-h-screen flex-row items-center justify-between p-24">
        {loaded && <div>Loading...</div>}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={previousImage}
        >
          Previous
        </button>
        <div>
          {userHashes == null || userHashes.length == 0 ? (
            "Sign content to have it displayed here!"
          ) : (
            <div>
              <div>
                {imageIndex + 1} of {userHashes.length}
              </div>
              <DisplayContent
                hash={hash ? hash : ""}
                isVerified={isVerified}
                ownerAddress={ownerAddress}
              />
            </div>
          )}
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={nextImage}
        >
          Next
        </button>
      </main>
    </ThirdwebProvider>
  );
}
