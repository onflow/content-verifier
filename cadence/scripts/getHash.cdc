import ContentVerifier from 0x93585dc5825311aa

pub fun main(hash: String): ContentVerifier.HashInfo? {
  let contentVerifier = getAccount(0x93585dc5825311aa)

  let hashTableCapability = contentVerifier.getCapability<&ContentVerifier.HashTable>(/public/hashTable)
  
  let hashTableRef = hashTableCapability.borrow() 
      ?? panic("could not borrow reference to HashTable capability")

  let hashInfo = hashTableRef.getHash(hash: hash)

  return hashInfo
}
