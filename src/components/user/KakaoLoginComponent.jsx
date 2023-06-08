import React from 'react';
import { ReactComponent as Loginicon } from '../../assets/loginpage/kakao_login.svg';

const KakaoLoginComponent = () => {
  const REST_API_KEY = `${process.env.REACT_APP_REST_API_KEY}`;
  const REDIRECT_URI = `${process.env.REACT_APP_KAKAO_LOGIN_REDIRECT_URI}`;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const loginHandler = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <button type="button" onClick={loginHandler}>
      <Loginicon />
    </button>
  );
};

export default KakaoLoginComponent;
