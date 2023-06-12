import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const KakaoRedirection = () => {
  const code = window.location.search;
  const navigate = useNavigate();

  useEffect(() => {
    axios.post(`${process.env.REACT_APP_REDIRECT_URI}/kakao/callback${code}`).then(r => {
      console.log('data => ', r.data);
      console.log('header => ', r.headers);

      // data을 받아서 localStorage에 저장.
      localStorage.setItem('memberId', r.data.data.memberId);
      localStorage.setItem('memberUniqueId', r.data.data.memberUniqueId);
      localStorage.setItem('memberName', r.data.data.memberName);
      localStorage.setItem('profileImage', r.data.data.profileImage);

      // access_key설정
      const accessKey = r.headers.get('access_key').split(' ')[1];

      // refresh_key설정
      const refreshkey = r.headers.get('refresh_key').split(' ')[1];

      Cookies.set('Access_key', accessKey);
      Cookies.set('Refresh_key', refreshkey);

      //  Access Token 만료 시간 지정
      // const expirationTime = new Date();
      // expirationTime.setMinutes(expirationTime.getMinutes() + 1);

      //  Refresh Token 만료 시간 지정
      // const refreshTokenExpirationTime = new Date();
      // refreshTokenExpirationTime.setDate(refreshTokenExpirationTime.getDate() + 7);

      // Cookies.set('Access_key', accessKey, { expires: expirationTime });
      // Cookies.set('Refresh_key', refreshkey, { expires: refreshTokenExpirationTime });

      // alert(r.data.msg);
      navigate('/');
    });
  }, [code, navigate]);

  return <div>로그인 중입니다.</div>;
};

export default KakaoRedirection;
