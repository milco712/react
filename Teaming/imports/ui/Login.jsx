import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";

export default () => {
  const refName = useRef(null);
  const refPw = useRef(null);
  const navigate = useNavigate();

  useTracker(() => {
    return Meteor.user();
  });

  const handleLogin = () => {
    const username = refName.current.value;
    const password = refPw.current.value;
    Meteor.loginWithPassword(username, password);
    navigate("/");
  };

  const goHome = () => {
    navigate("/");
  };

  const handleLogout = () => {
    Meteor.logout();
  };

  return (
    <div>
      {Meteor.user ? (
        <div>
          로그인된 상태입니다.
          <button onClick={goHome}>홈으로</button>
          <button onClick={handleLogout}>로그아웃</button>
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
