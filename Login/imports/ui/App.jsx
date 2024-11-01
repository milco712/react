import React, { useRef } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Posts } from "../api/collections";

export const App = () => {
  const refUsername = useRef(null);
  const refPassword = useRef(null);
  const user = Meteor.user(); // 로그인 안되어 있으면 undefined 되어 있으면 유저 객체

  useTracker(() => {
    return [user];
  });

  const handleLogin = () => {
    const rslt = Meteor.loginWithPassword(
      refUsername.current.value,
      refPassword.current.value
    );
    console.log(rslt);
  };

  // if (user) {
  //   return <div>로그인됨</div>;
  // }
  // return (
  //   <div>
  //     <input type="text" ref={refUsername} />
  //     <input type="text" ref={refPassword} />
  //     <button onClick={handleLogin}>login</button>
  //   </div>
  // );

  return (
    <div>
      {/* {user ? (
        <div>로그인됨</div>
      ) : (
        <div>
          <input type="text" ref={refUsername} />
          <input type="text" ref={refPassword} />
          <button onClick={handleLogin}>login</button>
        </div>
      )} */}

      {Meteor.user() ? (
        <div>
          로그인됨
          <button
            onClick={() => {
              Meteor.logout();
            }}
          >
            logout
          </button>
        </div>
      ) : (
        <div>
          <input type="text" ref={refUsername} />
          <input type="text" ref={refPassword} />
          <button onClick={handleLogin}>login</button>
        </div>
      )}
    </div>
  );
};
