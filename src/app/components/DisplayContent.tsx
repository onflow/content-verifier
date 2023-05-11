import Image from "next/image";
import ExclamationCircle from "./icons/ExclamationCircle";
import { AccountInfo } from "@/app/components/AccountInfo";
import GreenCheckmark from "@/app/components/icons/GreenCheckmark";

//const IPFS_ROOT = "https://ipfs.io/ipfs/";
const IPFS_ROOT = "https://ipfs.thirdwebcdn.com/ipfs/";

export const DisplayContent = ({
  hash,
  isVerified,
  ownerAddress,
}: {
  hash: string | null;
  isVerified?: boolean | null;
  ownerAddress?: string | null;
}) => {
  const fullLink = `${IPFS_ROOT}${hash}`;
  console.log("display isVerified", isVerified);
  return (
    <div className="m-2">
      {hash && (
        <>
          <Image src={fullLink} width="500" height="500" alt="IPFS Image" />
          <a
            className="text-blue-500"
            href={fullLink}
            target="_blank"
            rel="noreferrer"
          >
            <div>IPFS Link: {fullLink.slice(46)}...</div>
          </a>
          <div className="flex flex-row">
            {isVerified ? <GreenCheckmark /> : <ExclamationCircle />}
            <AccountInfo account={ownerAddress} />
          </div>
        </>
      )}
    </div>
  );
};
