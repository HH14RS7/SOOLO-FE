import React from 'react';
import { ReactComponent as Loginicon } from '../../assets/loginpage/kakao-login.svg';

const KakaoLoginComponent = () => {
  const REST_API_KEY = `${process.env.REACT_APP_REST_API_KEY}`;
  const REDIRECT_URI = `${process.env.REACT_APP_KAKAO_LOGIN_REDIRECT_URI}`;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const loginHandler = () => {
    alert(
      '🚨주의🚨\n회원가입시 모든 정보제공 (성별,연령) 체크 필수에 동의하여야만 가입이 가능합니다!',
    );
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <button type="button" onClick={loginHandler}>
      <Loginicon />
    </button>
  );
};

export default KakaoLoginComponent;
