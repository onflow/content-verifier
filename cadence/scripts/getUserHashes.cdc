import ContentVerifier from 0x01

pub fun main(account: Account): [ContentVerifier.HashInfo]? {
  let contentVerifier = getAccount(0x01)

  let hashTableCapability = contentVerifier.getCapability<&ContentVerifier.HashTable>(/public/hashTable)

  let hashTableRef = hashTableCapability.borrow() 
      ?? panic("could not borrow reference to HashTable capability")

  return hashTableRef.getHashesForAddress(address: 0x01)
}
