import ContentVerifier from 0x93585dc5825311aa

transaction (hash: String, signature: String, keyId: UInt16) {

  let hashTableRef: &ContentVerifier.HashTable
  let address: Address

  prepare(signer: AuthAccount) {
    let contentVerifier = getAccount(0x93585dc5825311aa)
    self.address = signer.address
    self.hashTableRef = contentVerifier.getCapability<&ContentVerifier.HashTable>(/public/hashTable).borrow() 
      ?? panic("could not borrow reference to HashTable")
  }

  execute {
    self.hashTableRef.addHash(hash: hash, address: self.address, signature: signature, keyId: keyId);
  }
}
