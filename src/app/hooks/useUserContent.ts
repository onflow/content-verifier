import { useState } from "react";
import * as fcl from "@onflow/fcl";


export const useUserContent = () => {

  const onUserContent = async (address: string) =>{
    const userHashes: [] = await fcl.query({
      cadence:`
      import ContentVerifierV2 from 0x9e107eadd013f40e
      
      pub fun main(address: Address) {
        let contentVerifier = getAccount(0x9e107eadd013f40e)
      
        let hashTableCapability = contentVerifier.getCapability<&ContentVerifierV2.HashTable>(/public/hashTable)
        
        let hashTableRef = hashTableCapability.borrow() 
            ?? panic("could not borrow reference to HashTable capability")
      
        return hashTableRef.getHashesForAddress(address: address)
      }
      `,
      args: (arg: any, t: any) => [arg(address, t.String)],
    })
  }

  return {
    onUserContent
  }

}

