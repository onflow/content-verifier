import ContentVerifier from 0x9e107eadd013f40e

transaction {

  let hashTableRef: &ContentVerifier.HashTable
  let address: Address

  prepare(signer: AuthAccount) {
    let helloAccount = getAccount(0x01)
    self.address = signer.address
    self.hashTableRef = helloAccount.getCapability<&ContentVerifier.HashTable>(/public/hashTable).borrow() 
      ?? panic("could not borrow reference to HashTable")
  }

  execute {
    self.hashTableRef.addHash(hash: "Test hash five", address: self.address, signature: "my signature five");
  }
}
