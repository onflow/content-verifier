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
      const [{ signature }] = sign;
      onSigning(hash, signature);
    } catch (error) {
      console.log(error);
    }
  };

  const onSigning = async (hash: String, signature: String) => {
    if (!hash) {
      return;
    }
    console.log({ hash, signature });

    const transactionId = await fcl.mutate({
      cadence: `
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
      `,
      args: (arg: any, t: any) => [
        arg(hash, t.String),
        arg(signature, t.String),
      ],
    });

    fcl.tx(transactionId).subscribe((res: any) => console.log(res.status));
  };

  return { onSign };
};
