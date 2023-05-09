import ContentVerifier from 0x9e107eadd013f40e

pub fun main(hash: String): ContentVerifier.HashInfo? {
  let contentVerifier = getAccount(0x9e107eadd013f40e)

  let hashTableCapability = contentVerifier.getCapability<&ContentVerifier.HashTable>(/public/hashTable)
  
  let hashTableRef = hashTableCapability.borrow() 
      ?? panic("could not borrow reference to HashTable capability")

  let hashInfo = hashTableRef.getHash(hash: hash)

  return hashInfo
}
