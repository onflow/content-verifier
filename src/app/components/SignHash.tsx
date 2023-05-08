import * as fcl from "@onflow/fcl"
export type SignHashProps = {
    hash: String,
    onSigning: (hash: string) => void;
}

export const  SignHash = ({hash, onSigning}: SignHashProps) => {

    // use fcl to sign hash and return signature
    const signHash = async () => {
        const signature = await fcl.sign(hash)
        onSigning(signature)
    }

    return (
        <div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => signHash()}>Sign Hash</button>
            </div>
    )

}