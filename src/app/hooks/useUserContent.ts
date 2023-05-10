import { useState } from "react";
import * as fcl from "@onflow/fcl";


export const useUserContent = () => {

  const onUserContent = async (account: string) =>{
    const userHashes: [] = await fcl.query({
      cadence:`
      import ContentVerifier from 0x01
      
      pub fun main(account: Account) {
        let contentVerifier = getAccount(0x01)
      
        let hashTableCapability = contentVerifier.getCapability<&ContentVerifier.HashTable>(/public/hashTable)
        
        let hashTableRef = hashTableCapability.borrow() 
            ?? panic("could not borrow reference to HashTable capability")
      
        return hashTableRef.getHashesForAddress(address: 0x01)
      }
      `,
      args: (arg: any, t: any) => [arg(account, t.String)],
    })
  }

  return {
    onUserContent
  }

}

