import React from 'react';

const KakaoLoginComponent = () => {
  const REST_API_KEY = `${process.env.REACT_APP_REST_API_KEY}`;
  const REDIRECT_URI = `${process.env.REACT_APP_KAKAO_LOGIN_REDIRECT_URI}`;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const loginHandler = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <button type="button" onClick={loginHandler}>
      <img src="/img/kakao_login.png" alt="Kakao Login" width="190" height="48" />
    </button>
  );
};

export default KakaoLoginComponent;
