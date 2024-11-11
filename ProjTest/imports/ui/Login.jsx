import React, { useRef, useState } from 'react';
import { useTracker } from "meteor/react-meteor-data";
import { useNavigate } from 'react-router-dom';

export default () => {
  const refEmail = useRef(null);
  const refPassword = useRef(null);
  const navigate = useNavigate();
  const [ message, setMessage ] = useState('');

  const user = useTracker(() => Meteor.user());

  const handleLogin = () => {
    const email = refEmail.current.value;
    const password = refPassword.current.value;
    Meteor.loginWithPassword(email, password, (err) => {
      if(err) {
        console.log('failed login', err.reason);
        const reason = err.reason;
        if ( reason === 'User not found' || reason === 'Incorrect password' ){
          setMessage('일치하는 정보가 없습니다.')
        } else {
          setMessage('로그인에 실패했습니다.')
        }
      }
    });
  }

  const handleLogout = () => {
    Meteor.logout();
  }

  const handleToEdit = () => {
    navigate(`/profile/${user._id}`)
  }

  const handleToSignup = () => {
    navigate('/signup')
  }


  return (
    <div>
      {
        user ? (
          <div>
            로그인 상태입니다.
            <button onClick={handleLogout}>Logout</button>
            <button onClick={handleToEdit}>Edit</button>
          </div>
        ) : (
          <div>
            <input type="text" ref={refEmail} placeholder='email' />
            <input type="password" ref={refPassword} placeholder='password' />
            {message}
            <button onClick={handleLogin}>Login</button>
            <div>
              <button onClick={handleToSignup}>Signup</button>
            </div>
          </div>
        )
      }
    </div>
  );
};
