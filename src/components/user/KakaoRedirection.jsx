import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../common/Loading';
import crypto from 'crypto-js';

const JWT_EXPIRY_TIME = 3 * 60 * 60 * 1000;

const KakaoRedirection = () => {
  const code = window.location.search;
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_REDIRECT_URI}/kakao/callback${code}`)
      .then(onLoginSuccess)
      .catch(error => {});
  }, [code]);

  const onSilentRefresh = async () => {
    const refreshkey = 'Bearer ' + Cookies.get('Refresh_key');
    try {
      await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/reissue`,
        { name: 'name' },
        {
          headers: {
            Access_key: null,
            Refresh_key: refreshkey,
          },
        },
      );
      onLoginRefresh();
    } catch (error) {}
  };

  const onLoginSuccess = response => {
    // data을 받아서 localStorage에 저장.
    localStorage.setItem('memberId', response.data.data.memberId);
    localStorage.setItem('memberUniqueId', response.data.data.memberUniqueId);
    localStorage.setItem('memberName', response.data.data.memberName);
    localStorage.setItem('profileImage', response.data.data.profileImage);
    localStorage.setItem('sse', null);

    // access_key설정
    const accessKey = response.headers.get('access_key').split(' ')[1];

    // refresh_key설정
    const refreshkey = response.headers.get('refresh_key').split(' ')[1];

    Cookies.set('Access_key', accessKey);
    Cookies.set('Refresh_key', refreshkey);

    // access_key설정
    // const accessKey = response.headers.get('access_key').split(' ')[1];
    // axios.defaults.headers.common['Access_key'] = `Bearer ${accessKey}`;

    // refresh_key설정
    // const refreshkey = response.headers.get('refresh_key').split(' ')[1];
    // Cookies.set('Refresh_key', refreshkey);

    // accessToken 만료하기 1분 전에 로그인 연장
    setTimeout(onSilentRefresh, JWT_EXPIRY_TIME - 60000);
    navigate('/home');
  };

  const onLoginRefresh = response => {
    // access_key설정
    const accessKey = response.headers.get('access_key').split(' ')[1];

    // refresh_key설정
    const refreshkey = response.headers.get('refresh_key').split(' ')[1];

    Cookies.set('Access_key', accessKey);
    Cookies.set('Refresh_key', refreshkey);
    // access_key설정
    // const accessKey = response.headers.get('access_key').split(' ')[1];
    // axios.defaults.headers.common['Access_key'] = `Bearer ${accessKey}`;

    // refresh_key설정
    // const refreshkey = response.headers.get('refresh_key').split(' ')[1];
    // Cookies.set('Refresh_key', refreshkey);

    // accessToken 만료하기 1분 전에 로그인 연장
    setTimeout(onSilentRefresh, JWT_EXPIRY_TIME - 60000);
  };

  return <Loading />;
};

export default KakaoRedirection;
