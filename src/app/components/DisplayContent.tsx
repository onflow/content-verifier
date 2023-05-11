import Image from "next/image";
import CheckBadge from "./icons/CheckBadge";
import ExclamationCircle from "./icons/ExclamationCircle";
import ArrowPath from "./icons/ArrowPath";
import { AccountInfo } from "./AccountInfo";

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
  return (
    <div className="m-2">
      {hash && (
        <>
          <Image src={fullLink} width="500" height="500" alt="IPFS Image" />
          <p>{fullLink}</p>
          <p>
            <AccountInfo account={ownerAddress} />
          </p>
        </>
      )}
      {isVerified ? (
        <ArrowPath />
      ) : isVerified ? (
        <CheckBadge />
      ) : (
        <ExclamationCircle />
      )}
    </div>
  );
};
