import * as fcl from "@onflow/fcl";
import "@/app/config";

export const useSign = () => {
  const onSign = async (hash: string | null) => {
    if (!hash) {
      return;
    }
    // use fcl to sign hash and return signature
    try {
      const MSG = Buffer.from(hash).toString("hex");
      console.log(MSG);
      const sign = await fcl.currentUser.signUserMessage(MSG);
      // @ts-ignore
      const [{ signature, keyId }] = sign;
      onSigning(hash, signature, keyId);
    } catch (error) {
      console.log(error);
    }
  };

  const onSigning = async (hash: String, signature: String, keyId: Number) => {
    if (!hash) {
      return;
    }
    console.log({ hash, signature, keyId });

    const transactionId = await fcl.mutate({
      cadence: `
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
      `,
      args: (arg: any, t: any) => [
        arg(hash, t.String),
        arg(signature, t.String),
        arg(String(keyId), t.UInt16),
      ],
    });

    fcl.tx(transactionId).subscribe((res: any) => console.log(res.status));
  };

  return { onSign };
};
