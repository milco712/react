import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default () => {
  const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
  const passwordRegEx = /^[A-Za-z0-9]{8,15}$/;

  const [ emailMsg, setEmailMsg ] = useState('');
  const [ nickNameMsg, setNickNameMsg ] = useState('');
  const [ passwordMsg, setPasswordMsg ] = useState('비밀번호 영문 대소문자, 숫자를 혼합해 8~15자로 입력해주세요.');
  const [ confirmPwMsg, setConfirmPwMsg ] = useState('');
  const [ isValid, setIsValid ] = useState(false);
  const refEmail = useRef(null);
  const refNickname = useRef(null);
  const refPassword = useRef(null);
  const refConfirmPw = useRef(null);
  const navigate = useNavigate();

  const emailCheck = () => {
    const email = refEmail.current.value;
    if(!emailRegEx.test(email)) {
      setEmailMsg('이메일 형식에 맞지 않습니다.')
    } else {
      setEmailMsg('')
    }
  }

  const nicknameCheck = () => {    
    const nickname = refNickname.current.value;
    if(nickname.length < 2) {
      setNickNameMsg('2~10자 사이로 입력해주세요.')
    } else {
      setNickNameMsg('')
    }
  }

  const passwordCheck = () => {
    const password = refPassword.current.value;
    const confirmPw = refConfirmPw.current.value;

    if(!passwordRegEx.test(password)) {
      setPasswordMsg('비밀번호 영문 대소문자, 숫자를 혼합해 8~15자로 입력해주세요.')
      setConfirmPwMsg('')
    } else {
      setPasswordMsg('')
    }
    if ((password !== confirmPw) && (confirmPw !== '') ) {
      setConfirmPwMsg('비밀번호가 일치하지 않습니다.')
    } else {
      setConfirmPwMsg('')
    }
  }

  
  useEffect(()=> {
    const email = refEmail.current.value;
    const nickname = refNickname.current.value; 
    const password = refPassword.current.value; 
    const confirmPassword = refConfirmPw.current.value; 
    if (
      email &&
      !emailMsg &&
      nickname &&
      !nickNameMsg &&
      password &&
      !passwordMsg &&
      confirmPassword &&
      !confirmPwMsg 
     ) {
      setIsValid(true);
     } else {
      setIsValid(false);
     }
  },[emailMsg, nickNameMsg, passwordMsg, confirmPwMsg])

  const handleSignup = () => {
    Accounts.createUser({
      email: refEmail.current.value,
      password: refPassword.current.value,
      username: refNickname.current.value
    }, (err) => {
      if (err) {
        console.log('가입 실패: ', err.reason);
      } else {
        navigate('/')
      }
    })
  }


  return (
    <div>
      <input type="email" placeholder='email' ref={refEmail} onChange={emailCheck} /> <br />
      {emailMsg} <br />
      <input type="text" placeholder='nickname' ref={refNickname} onChange={nicknameCheck} maxLength='10'/> <br />
      {nickNameMsg} <br />
      <input type="password" placeholder='password' ref={refPassword} onChange={passwordCheck}/> <br />
      {passwordMsg} <br />
      <input type="password" placeholder='confirm password' ref={refConfirmPw} onChange={passwordCheck}/> <br />
      {confirmPwMsg} <br />
      <button onClick={handleSignup} disabled={!isValid}>Signup</button>
    </div>
  )
}
