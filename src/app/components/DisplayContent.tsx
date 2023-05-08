import Image from 'next/image';

const IPFS_ROOT = "https://ipfs.io/ipfs/";
export const DisplayContent = ({hash}: {hash: String} ) => {
    return (
        <div className="m-2">
            <Image src={`${IPFS_ROOT}${hash}`} 
            width="500"
            height="500"
            alt="IPFS Image"
            />
            </div>
    )
}