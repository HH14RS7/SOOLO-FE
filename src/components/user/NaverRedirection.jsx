import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NaverRedirection = () => {
  const code = window.location.search;
  const navigate = useNavigate();

  useEffect(() => {
    axios.post(`${process.env.REACT_APP_REDIRECT_URI}/naver/callback${code}`).then(r => {
      console.log(r.data);

      // 토큰을 받아서 localStorage에 저장하는 코드를 여기에 쓴다.
      localStorage.setItem('memberId', r.data.memberId);
      localStorage.setItem('memberUniqueId', r.data.memberUniqueId);
      localStorage.setItem('memberName', r.data.memberName);
      localStorage.setItem('profileImage', r.data.profileImage);
      alert('로그인 완료!');
      navigate('/');
    });
  }, [code, navigate]);

  return <div>로그인 중입니다.</div>;
};

export default NaverRedirection;
