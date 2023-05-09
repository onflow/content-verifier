"use client";
import { useState } from "react";

type HashInputProps = {
  onLookup: (hash: string) => void;
};

export const HashInput = ({ onLookup }: HashInputProps) => {
  const [hashValue, setHashValue] = useState<string>(
    "QmQqzMTavQgT4f4T5v6PWBp7XNKtoPmC9jvn12WPT3gkSE"
  );

  return (
    <div className="m-3 w-100">
      <input
        className="m-2 w-100 text-black"
        id="hashValue"
        type="text"
        name="hash"
        placeholder="hash value"
        value={hashValue}
        onChange={(event) => setHashValue(event.target.value)}
      />
      <button
        className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => onLookup(hashValue)}
      >
        Lookup Hash
      </button>
    </div>
  );
};
