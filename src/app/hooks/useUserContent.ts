import { useState } from "react";
import * as fcl from "@onflow/fcl";


export const useUserContent = () => {

  const onUserContent = async (address: string) =>{
    const userHashes: [] = await fcl.query({
      cadence:`
      import ContentVerifier from 0x93585dc5825311aa
      
      pub fun main(address: Address) {
        let contentVerifier = getAccount(0x93585dc5825311aa)
      
        let hashTableCapability = contentVerifier.getCapability<&ContentVerifier.HashTable>(/public/hashTable)
        
        let hashTableRef = hashTableCapability.borrow() 
            ?? panic("could not borrow reference to HashTable capability from user content")
      
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

