import { useState } from "react";
import * as fcl from "@onflow/fcl";
import {CurrentUser} from "@onflow/typedefs"

export const useUserContent = () => {
  const [userHashes, setUserHashes] = useState<string[] | null>(null);

  const onUserContent = async () => {
    setUserHashes(null)

    const user: CurrentUser = await fcl.currentUser.snapshot()
    const hashes = await fcl.query({
      cadence:`
      import ContentVerifier from 0x2b349007fad7e563
      
      pub fun main(address: Address) {
        let contentVerifier = getAccount(0x2b349007fad7e563)
      
        let hashTableCapability = contentVerifier.getCapability<&ContentVerifier.HashTable>(/public/hashTable)
        
        let hashTableRef = hashTableCapability.borrow() 
            ?? panic("could not borrow reference to HashTable capability from user content")
      
        return hashTableRef.getHashesForAddress(address: address)
      }
      `,
      args: (arg: any, t: any) => [arg(user.addr, t.String)],
    })

    setUserHashes(hashes)
  }

  return {
    userHashes,
    onUserContent
  }

}

