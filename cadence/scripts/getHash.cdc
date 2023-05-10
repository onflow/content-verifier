import ContentVerifier from 0x2b349007fad7e563

pub fun main(hash: String): ContentVerifier.HashInfo? {
  let contentVerifier = getAccount(0x2b349007fad7e563)

  let hashTableCapability = contentVerifier.getCapability<&ContentVerifier.HashTable>(/public/hashTable)
  
  let hashTableRef = hashTableCapability.borrow() 
      ?? panic("could not borrow reference to HashTable capability")

  let hashInfo = hashTableRef.getHash(hash: hash)

  return hashInfo
}
