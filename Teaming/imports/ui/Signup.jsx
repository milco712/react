import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default () => {
  const refName = useRef(null);
  const refPw = useRef(null);
  const refNickname = useRef(null);
  const navigate = useNavigate();

  const handleSignup = () => {
    const user = {
      username: refName.current.value,
      password: refPw.current.value,
      profile: {
        nickname: refNickname.current.value,
      },
    };
    Accounts.createUser(user);
    navigate("/login");
  };

  return (
    <div>
      Username: <input type="text" ref={refName} /> <br />
      Password: <input type="text" ref={refPw} /> <br />
      Nickname: <input type="text" ref={refNickname} /> <br />
      <button onClick={handleSignup}>Sign up</button>
    </div>
  );
};
