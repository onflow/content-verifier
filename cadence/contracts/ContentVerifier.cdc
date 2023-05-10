access(all) contract ContentVerifier {

    pub struct HashInfo {
        pub let hash: String
        pub let address: Address
        pub let signature: String
        pub let keyId: UInt16

        init(hash: String, address: Address, signature: String, keyId: UInt16) {
            self.hash = hash
            self.address = address
            self.signature = signature
            self.keyId = keyId
        }
    }

    pub resource HashTable {
        access(self) let hashTable: {String: HashInfo}
        access(self) let users: {Address: [HashInfo]}

        access(self) fun isValidAddress (address: Address): Bool {
            let account = getAccount(address)

            return account != nil
        }

        init() {
            self.hashTable = {}
            self.users = {}
        }

        pub fun getHash(hash: String): HashInfo? {
            return self.hashTable[hash]
        }

        pub fun getHashesForAddress(address: Address): [HashInfo]? {
            return self.users[address]
        }

        pub fun addHash(hash: String, address: Address, signature: String, keyId: UInt16) {
            if (!self.isValidAddress(address: address)) {
                panic("invalid account")
            }
            if (self.getHash(hash: hash) != nil){
                panic("hash already exists")
            }

            let info = HashInfo(hash: hash, address: address, signature: signature, keyId: keyId)
            self.hashTable[hash] = info

            if (self.users[address] == nil) {
                self.users[address] = [info]
            } else {
                self.users[address]!.append(info)
            }
        }
    }

    init() {
        let hashTable <- create HashTable()

        self.account.save(<-hashTable, to: /storage/hashTable)
        self.account.link<&HashTable>(/public/hashTable, target: /storage/hashTable)
        log("HashTable is created and stored")
    }
}
