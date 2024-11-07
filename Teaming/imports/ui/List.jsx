import React, { useRef, useState } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { Files } from "../api/collections";
import { useNavigate } from "react-router-dom";

export default () => {
  const [selectdFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const refName = useRef(null);
  const refPw = useRef(null);
  const refFile = useRef(null);
  const navigate = useNavigate();

  const [files, user] = useTracker(() => {
    return [Files.find().fetch(), Meteor.user()];
  });

  const handleLogin = () => {
    const username = refName.current.value;
    const password = refPw.current.value;
    Meteor.loginWithPassword(username, password);
  };

  const handleLogout = () => {
    Meteor.logout();
  };

  const handleFileChange = (e) => {
    const file = e.currentTarget.files[0];
    setSelectedFile(file); // 파일 정보 저장
    const url = URL.createObjectURL(file); // 파일 임시 url 생성
    setPreviewUrl(url);
  };

  const cancleFile = () => {
    setPreviewUrl(null);
    refFile.current.value = null;
  };

  const handleFileUpload = () => {
    const rslt = Files.insert({
      file: selectdFile,
    });
    if (rslt) {
      console.log("Success");
      refFile.current.value = null;
      setPreviewUrl(null);
      const loginUser = Meteor.user();

      Meteor.users.update(
        { _id: loginUser._id },
        {
          $set: {
            "profile.profile_image_id": rslt.config.fileId,
          },
        }
      );
      navigate("/detail");
    } else {
      console.log("error");
    }
  };

  return (
    <div>
      {Meteor.user() ? (
        <div>
          <div>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <input type="file" onChange={handleFileChange} ref={refFile} />
          <button onClick={handleFileUpload}>저장</button>
          <div>
            {previewUrl ? (
              <div>
                <img src={previewUrl} alt="" />
                <button onClick={cancleFile}>선택 취소</button>
              </div>
            ) : (
              <div>이미지를 선택해주세요</div>
            )}
          </div>
        </div>
      ) : (
        <div>
          Username: <input type="text" ref={refName} />
          Password: <input type="text" ref={refPw} />
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
};
