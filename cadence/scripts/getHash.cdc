import ContentVerifierV2 from 0x9e107eadd013f40e

pub fun main(hash: String): ContentVerifierV2.HashInfo? {
  let contentVerifier = getAccount(0x9e107eadd013f40e)

  let hashTableCapability = contentVerifier.getCapability<&ContentVerifierV2.HashTable>(/public/hashTable)
  
  let hashTableRef = hashTableCapability.borrow() 
      ?? panic("could not borrow reference to HashTable capability")

  let hashInfo = hashTableRef.getHash(hash: hash)

  return hashInfo
}
