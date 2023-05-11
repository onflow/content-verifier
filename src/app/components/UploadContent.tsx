"use client";
import { useStorageUpload } from "@thirdweb-dev/react";
import React, { useState } from "react";

export type UploadContentProps = {
  onUpload: (hash: string) => Promise<void>;
};

const hashFromUrl = (url: string) => {
  const parsedUrl = new URL(url);
  return parsedUrl.pathname.split("/").pop();
};

export const UploadContent = ({ onUpload }: UploadContentProps) => {
  const [buttonText, setButtonText] = useState<string>("First, Choose File");
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const { mutateAsync: upload } = useStorageUpload();

  const selectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    const selectedFiles = files as FileList;
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result as string);
    };
    const file = selectedFiles?.[0];
    if (file) {
      reader.readAsDataURL(file);
    }
    setFile(selectedFiles?.[0]);
    setButtonText("Save to IPFS");
  };

  const uploadToIpfs = async () => {
    setButtonText("Uploading...");
    const uploadUrl = await upload({
      data: [file],
      options: { uploadWithGatewayUrl: true, uploadWithoutDirectory: true },
    });
    const hash = hashFromUrl(uploadUrl[0]);
    if (hash) {
      onUpload(hash);
    }
    setButtonText("Uploaded");
  };

  return (
    <div>
      <input type="file" onChange={selectFile} />
      <button
        className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        disabled={!file}
        onClick={uploadToIpfs}
      >
        {buttonText}
      </button>
      {image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image}
          alt="Selected"
          style={{ height: "25%", width: "25%" }}
        />
      )}
    </div>
  );
};
