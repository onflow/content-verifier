import ContentVerifier from 0x9e107eadd013f40e

transaction (hash: String, signature: String) {

  let hashTableRef: &ContentVerifier.HashTable
  let address: Address

  prepare(signer: AuthAccount) {
    let contentVerifier = getAccount(0x9e107eadd013f40e)
    self.address = signer.address
    self.hashTableRef = contentVerifier.getCapability<&ContentVerifier.HashTable>(/public/hashTable).borrow() 
      ?? panic("could not borrow reference to HashTable")
  }

  execute {
    self.hashTableRef.addHash(hash: hash, address: self.address, signature: signature);
  }
}
