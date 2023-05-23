import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Redirection = () => {
  const code = window.location.search;
  const navigate = useNavigate();

  useEffect(() => {
    //console.log(process.env.REACT_APP_URL);
    console.log(code);
    axios.post(`http://222.102.175.141:8080/kakao/callback${code}`).then(r => {
      console.log(r.data);

      // 토큰을 받아서 localStorage같은 곳에 저장하는 코드를 여기에 쓴다.
      localStorage.setItem('memberId', r.data.memberId);
      localStorage.setItem('memberEmailId', r.data.memberEmailId);
      localStorage.setItem('memberName', r.data.memberName);
      localStorage.setItem('profileImage', r.data.profileImage);
      alert('로그인 완료!');
      navigate('/');
    });
  }, [code, navigate]);

  return <div>로그인 중입니다.</div>;
};

export default Redirection;
