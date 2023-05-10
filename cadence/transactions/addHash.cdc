import ContentVerifier from 0x2b349007fad7e563

transaction (hash: String, signature: String) {

  let hashTableRef: &ContentVerifier.HashTable
  let address: Address

  prepare(signer: AuthAccount) {
    let contentVerifier = getAccount(0x2b349007fad7e563)
    self.address = signer.address
    self.hashTableRef = contentVerifier.getCapability<&ContentVerifier.HashTable>(/public/hashTable).borrow() 
      ?? panic("could not borrow reference to HashTable")
  }

  execute {
    self.hashTableRef.addHash(hash: hash, address: self.address, signature: signature);
  }
}
