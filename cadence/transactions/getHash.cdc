import ContentVerifier from 0x9e107eadd013f40e

transaction (hash: String) {

  let hashTableRef: &ContentVerifier.HashTable

  prepare(acct: AuthAccount) {
    let contentVerifier = getAccount(0x9e107eadd013f40e)
    self.hashTableRef = contentVerifier.getCapability<&ContentVerifier.HashTable>(/public/hashTable).borrow() 
      ?? panic("could not borrow reference to HashTable")
  }

  execute {
    log(self.hashTableRef.getHash(hash: hash))
  }
}
