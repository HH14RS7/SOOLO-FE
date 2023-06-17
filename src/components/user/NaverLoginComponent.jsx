import React from 'react';
import { ReactComponent as Loginicon } from '../../assets/loginpage/naver_login.svg';

const NaverLoginComponent = () => {
  const NAVER_CLIENT_ID = `${process.env.REACT_APP_NAVER_CLIENT_ID}`;
  const REDIRECT_URI = `${process.env.REACT_APP_NAVER_LOGIN_REDIRECT_URI}`;
  const STATE = 'flase';
  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${STATE}&redirect_uri=${REDIRECT_URI}`;

  const loginHandler = () => {
    alert('현재 네이버 로그인은 검수 처리중입니다.');
    // window.location.href = NAVER_AUTH_URL;
  };

  return (
    <button type="button" onClick={loginHandler}>
      <Loginicon />
    </button>
  );
};

export default NaverLoginComponent;
