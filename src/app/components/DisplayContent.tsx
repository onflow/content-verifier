import Image from "next/image";
import CheckBadge from './icons/CheckBadge'
import ExclamationCircle from './icons/ExclamationCircle'
import ArrowPath from './icons/ArrowPath'

//const IPFS_ROOT = "https://ipfs.io/ipfs/";
const IPFS_ROOT = "https://ipfs.thirdwebcdn.com/ipfs/";
export const DisplayContent = ({ hash, isVerified }: { hash: string | undefined, isVerified: boolean | null }) => {
  const fullLink = `${IPFS_ROOT}${hash}`;
  return (
    <div className="m-2">
      {hash && (
        <>
          <Image src={fullLink} width="500" height="500" alt="IPFS Image" />
          <span>{fullLink}</span>
        </>
      )}
      {isVerified == null ? <ArrowPath /> : isVerified ? <CheckBadge /> :<ExclamationCircle />}
    </div>
  );
};
