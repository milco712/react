import React, { useState } from "react";
import { Files } from "../api/collections";

export const Home = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const hanbleFileChange = (e) => {
    const file = e.currentTarget.files[0];
    console.log(file);
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleFileUpload = () => {
    const rslt = Files.insert({
      file: selectedFile,
    });
    if (rslt) {
      console.log("uploaded");
      setSelectedFile(null);
      setPreviewUrl(null);
    } else {
      console.log("error");
    }
  };
  return (
    <>
      <div>
        <input type="file" onChange={hanbleFileChange} />
        <button onClick={handleFileUpload}>Upload</button>
        <div>
          {previewUrl ? (
            <img src={previewUrl} alt="" />
          ) : (
            <p>이미지를 선택해주세요</p>
          )}
        </div>
      </div>
    </>
  );
};
