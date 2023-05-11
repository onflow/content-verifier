import { useEffect } from "react";
import { useSign } from "../hooks/useSign";

export type SignHashProps = {
  onStatusChange: (statusCode: number) => void;
  hash: string | null;
};

export const SignHash = ({ onStatusChange, hash }: SignHashProps) => {
  const { onSign, txStatus } = useSign();

  let buttonText = "Sign Hash";
  if (txStatus) {
    if ([1, 2, 3].includes(txStatus)) {
      buttonText = "Signing...";
    } else if (txStatus === 4) {
      buttonText = "Signed!!!!";
    }
  }

  useEffect(() => {
    if (txStatus) {
      onStatusChange(txStatus);
    }
  }, [txStatus]);

  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        onClick={() => onSign(hash)}
        disabled={txStatus === 3 || txStatus === 4}
      >
        {buttonText}
      </button>
    </div>
  );
};
