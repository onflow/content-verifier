import { useState } from "react";
import * as fcl from "@onflow/fcl";
import "@/app/config";

export const useLookup = () => {
  const [hash, setHash] = useState<string | null>(
    null
    // "QmQqzMTavQgT4f4T5v6PWBp7XNKtoPmC9jvn12WPT3gkSE"
  );
  const [isVerified, setIsVerified] = useState<boolean | null>(null);
  const [ownerAddress, setOwnerAddress] = useState<string | null>(null);

  const onLookup = async (hash: string) => {
    setIsVerified(null);
    setOwnerAddress(null);
    setHash(hash);
    console.log({hash})

    const hashInfo = await fcl.query({
      cadence: `
        import ContentVerifier from 0x93585dc5825311aa

        pub fun main(hash: String): ContentVerifier.HashInfo? {
          let contentVerifier = getAccount(0x93585dc5825311aa)
        
          let hashTableCapability = contentVerifier.getCapability<&ContentVerifier.HashTable>(/public/hashTable)
          
          let hashTableRef = hashTableCapability.borrow() 
              ?? panic("could not borrow reference to HashTable capability from lookup")
        
          let hashInfo = hashTableRef.getHash(hash: hash)

          return hashInfo
        }
      `,
      args: (arg: any, t: any) => [arg(hash, t.String)],
    });
    console.log(hashInfo)
    if (!hashInfo) {
      return;
    }
    setOwnerAddress(hashInfo.address);
    console.log({hashInfo})

    const isVerified = await fcl.AppUtils.verifyUserSignatures(
      Buffer.from(hashInfo.hash).toString("hex"),
      [
        {
          f_type: "CompositeSignature",
          f_vsn: "1.0.0",
          addr: hashInfo.address,
          keyId: hashInfo.keyId,
          signature: hashInfo.signature,
        },
      ]
    );

    setIsVerified(isVerified);
  };

  return {
    isVerified,
    hash,
    ownerAddress,
    onLookup,
  };
};
