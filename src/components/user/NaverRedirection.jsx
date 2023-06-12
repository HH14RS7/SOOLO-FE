import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NaverRedirection = () => {
  const code = window.location.search;
  const navigate = useNavigate();

  useEffect(() => {
    axios.post(`${process.env.REACT_APP_REDIRECT_URI}/naver/callback${code}`).then(r => {
      console.log('data => ', r.data);
      console.log('header => ', r.headers);

      // 토큰을 받아서 localStorage에 저장하는 코드를 여기에 쓴다.
      localStorage.setItem('memberId', r.data.data.memberId);
      localStorage.setItem('memberUniqueId', r.data.data.memberUniqueId);
      localStorage.setItem('memberName', r.data.data.memberName);
      localStorage.setItem('profileImage', r.data.data.profileImage);
      // Access_key를 쿠키로 설정
      const accessKey = r.headers.get('access_key').split(' ')[1];
      Cookies.set('Access_key', accessKey);

      // Refresh_key를 쿠키로 설정
      const refreshkey = r.headers.get('refresh_key').split(' ')[1];
      Cookies.set('Refresh_key', refreshkey);

      // alert(r.data.msg);
      navigate('/');
    });
  }, [code, navigate]);

  return <div>로그인 중입니다.</div>;
};

export default NaverRedirection;
