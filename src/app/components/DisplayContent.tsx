import Image from "next/image";
import CheckBadge from './icons/CheckBadge'
import ExclamationCircle from './icons/ExclamationCircle'
import ArrowPath from './icons/ArrowPath'

//const IPFS_ROOT = "https://ipfs.io/ipfs/";
const IPFS_ROOT = "https://ipfs.thirdwebcdn.com/ipfs/";
const FLOWSCAN_ROOT = "https://testnet.flowscan.org/account/0x";

export const DisplayContent = ({ hash, isVerified, ownerAddress }: { hash: string | undefined, isVerified?: boolean | null, ownerAddress?: string | null }) => {
  const fullLink = `${IPFS_ROOT}${hash}`;
  const fullOwnerLink = `${FLOWSCAN_ROOT}${ownerAddress}`
  return (
    <div className="m-2">
      {hash && (
        <>
          <Image src={fullLink} width="500" height="500" alt="IPFS Image" />
          <p>{fullLink}</p>
          <p><a href={fullOwnerLink}>{ownerAddress}</a></p>
        </>
      )}
      {typeof isVerified !== 'boolean' ? <ArrowPath /> : isVerified ? <CheckBadge /> :<ExclamationCircle />}
    </div>
  );
};
