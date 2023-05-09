import ContentVerifier from 0x9e107eadd013f40e

transaction {

  let hashTableRef: &ContentVerifier.HashTable

  prepare(acct: AuthAccount) {
    let contentVerifier = getAccount(0x01)
    self.hashTableRef = contentVerifier.getCapability<&ContentVerifier.HashTable>(/public/hashTable).borrow() 
      ?? panic("could not borrow reference to HashTable")
  }

  execute {
    log(self.hashTableRef.getHash(hash: "Test hash five"))
  }
}
