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

    const hashInfo = await fcl.query({
      cadence: `
        import ContentVerifierV2 from 0x9e107eadd013f40e

        pub fun main(hash: String): ContentVerifierV2.HashInfo? {
          let contentVerifier = getAccount(0x9e107eadd013f40e)
        
          let hashTableCapability = contentVerifier.getCapability<&ContentVerifierV2.HashTable>(/public/hashTable)
          
          let hashTableRef = hashTableCapability.borrow() 
              ?? panic("could not borrow reference to HashTable capability")
        
          let hashInfo = hashTableRef.getHash(hash: hash)

          return hashInfo
        }
      `,
      args: (arg: any, t: any) => [arg(hash, t.String)],
    });
    if (!hashInfo) {
      return;
    }
    setOwnerAddress(hashInfo.address);

    const isVerified = await fcl.AppUtils.verifyUserSignatures(
      Buffer.from(hashInfo.hash).toString("hex"),
      [
        {
          f_type: "CompositeSignature",
          f_vsn: "1.0.0",
          addr: hashInfo.address,
          keyId: 1,
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
