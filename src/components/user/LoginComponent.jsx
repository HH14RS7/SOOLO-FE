import React from 'react';

const LoginComponent = () => {
  const REST_API_KEY = '7592433975f9828ad850a19a2de302cd';
  const REDIRECT_URI = 'http://localhost:3000/kakao/callback';
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const loginHandler = () => {
    window.location.href = link;
  };

  return (
    <button type="button" onClick={loginHandler}>
      로그인 하기
    </button>
  );
};

export default LoginComponent;
