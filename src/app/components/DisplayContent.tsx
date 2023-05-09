import Image from 'next/image';

//const IPFS_ROOT = "https://ipfs.io/ipfs/";
const IPFS_ROOT = 'https://ipfs.thirdwebcdn.com/ipfs/';
export const DisplayContent = ({ hash }: { hash: String }) => {
  const fullLink = `${IPFS_ROOT}${hash}`;
  return (
    <div className="m-2">
      {hash && (
        <>
          <Image src={fullLink} width="500" height="500" alt="IPFS Image" />
          <span>{fullLink}</span>
        </>
      )}
    </div>
  );
};
