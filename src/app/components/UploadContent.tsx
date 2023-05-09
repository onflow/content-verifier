"use client";
import { useStorageUpload } from "@thirdweb-dev/react";
import React, { useState } from "react";

export type UploadContentProps = {
  onUpload: (hash: string | undefined) => void;
};

const hashFromUrl = (url: string) => {
  const parsedUrl = new URL(url);
  return parsedUrl.pathname.split("/").pop();
};

export const UploadContent = ({ onUpload }: UploadContentProps) => {
  const [file, setFile] = useState<File | null>(null);
  const { mutateAsync: upload } = useStorageUpload();

  const selectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    const selectedFiles = files as FileList;
    console.log("selectedFiles", selectedFiles);
    setFile(selectedFiles?.[0]);
  };

  const uploadToIpfs = async () => {
    const uploadUrl = await upload({
      data: [file],
      options: { uploadWithGatewayUrl: true, uploadWithoutDirectory: true },
    });
    console.log("uploadUrl", uploadUrl);
    const hash = hashFromUrl(uploadUrl[0]);
    onUpload(hash);
  };

  return (
    <div>
      <input type="file" onChange={selectFile} />
      <button
        className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        disabled={!file}
        onClick={uploadToIpfs}
      >
        Upload
      </button>
    </div>
  );
};
