import React, { useEffect, useState } from "react";
import { Files } from "../api/collections";

export default () => {;


  const [selectdFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (e) => {
    const file = e.currentTarget.files[0];
    setSelectedFile(file); // 파일 정보 저장
    const url = URL.createObjectURL(file) // 파일 임시 url 생성
    setPreviewUrl(url);
  }

  const cancleFile = () => {
    setPreviewUrl(null);
  }

  const handleFileUpload = () => {
    const rslt = Files.insert({
      file: selectdFile
    })

    if (rslt) {
      console.log("Success");
      setPreviewUrl(null);
    } else {
      console.log("error");
    }

  }

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>저장</button>
      <div>
        {previewUrl ? 
        <div>
          <img src={previewUrl} alt="" /> 
          <button onClick={cancleFile}>선택 취소</button>
        </div>
        : 
        <sapn>이미지를 선택해주세요</sapn>}
      </div>
    </div>
    // <>
    //   <div>
    //     <input type="file" onChange={hanbleFileChange} />
    //     <button onClick={handleFileUpload}>Upload</button>
    //     <div>
    //       {previewUrl ? (
    //         <img src={previewUrl} alt="" />
    //       ) : (
    //         <p>이미지를 선택해주세요</p>
    //       )}
    //     </div>
    //   </div>
    // </>
  );
};
