import React from 'react';

const NaverLoginComponent = () => {
  const NAVER_CLIENT_ID = `${process.env.REACT_APP_NAVER_CLIENT_ID}`;
  const REDIRECT_URI = 'https://soolo-fe.vercel.app/naver/callback'; // 프론트 서버 배포 주소
  const STATE = 'flase';
  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${STATE}&redirect_uri=${REDIRECT_URI}`;

  const loginHandler = () => {
    window.location.href = NAVER_AUTH_URL;
  };

  return (
    <button type="button" onClick={loginHandler}>
      <img src="/img/naver_login.png" alt="Naver Login" width="190" height="48" />
    </button>
  );
};

export default NaverLoginComponent;
