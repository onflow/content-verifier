export type SignHashProps = {
  onSign: () => void;
};

export const SignHash = ({ onSign }: SignHashProps) => {
  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => onSign()}
      >
        Sign Hash
      </button>
    </div>
  );
};
