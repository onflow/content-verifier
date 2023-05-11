"use client";
import { useStorageUpload } from "@thirdweb-dev/react";
import React, { useState } from "react";
import Image from "next/image";

export type UploadContentProps = {
  onUpload: (hash: string) => Promise<void>;
};

const hashFromUrl = (url: string) => {
  const parsedUrl = new URL(url);
  return parsedUrl.pathname.split("/").pop();
};

export const UploadContent = ({ onUpload }: UploadContentProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const { mutateAsync: upload } = useStorageUpload();

  const selectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    const selectedFiles = files as FileList;
    console.log("selectedFiles", selectedFiles);

    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result as string);
    };
    const file = selectedFiles?.[0];
    if (file) {
      console.log("read file");
      reader.readAsDataURL(file);
    }
    setFile(selectedFiles?.[0]);
  };

  const uploadToIpfs = async () => {
    const uploadUrl = await upload({
      data: [file],
      options: { uploadWithGatewayUrl: true, uploadWithoutDirectory: true },
    });
    console.log("uploadUrl", uploadUrl);
    const hash = hashFromUrl(uploadUrl[0]);
    if (hash) {
      onUpload(hash);
    }
  };

  return (
    <div>
      <input type="file" onChange={selectFile} />
      <button
        className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        disabled={!file}
        onClick={uploadToIpfs}
      >
        Save to IPFS
      </button>
      {image && (
        <img
          src={image}
          alt="Selected"
          style={{ height: "100px", width: "100px" }}
        />
      )}
    </div>
  );
};
