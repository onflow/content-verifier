import { useState } from "react";
import * as fcl from "@onflow/fcl";
import { CurrentUser } from "@onflow/typedefs";
import "@/app/config";

export const useUserContent = () => {
  const [userHashes, setUserHashes] = useState<any[]>([]);

  const onUserContent = async (addr: string) => {
    setUserHashes([]);

    if (addr) {
      const hashes = await fcl.query({
        cadence: `
        import ContentVerifier from 0x93585dc5825311aa
        
        pub fun main(address: Address): [ContentVerifier.HashInfo]? {
          let contentVerifier = getAccount(0x93585dc5825311aa)
        
          let hashTableCapability = contentVerifier.getCapability<&ContentVerifier.HashTable>(/public/hashTable)
          
          let hashTableRef = hashTableCapability.borrow() 
              ?? panic("could not borrow reference to HashTable capability from user content")
        
          return hashTableRef.getHashesForAddress(address: address)
        }
        `,
        args: (arg: any, t: any) => [arg(addr, t.Address)],
      });

      setUserHashes(hashes);
    }
  };

  return {
    userHashes,
    onUserContent,
  };
};
