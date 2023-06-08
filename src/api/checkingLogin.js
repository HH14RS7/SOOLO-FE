import Cookies from 'js-cookie';

const checkingLogin = () => {
  const accessKey = Cookies.get('Access_key');
  if (accessKey) {
    return true;
  } else {
    return false;
  }
};

const notLoginRouting = navigate => {
  if (checkingLogin()) {
    return;
  } else {
    alert('로그인 이후 사용 가능합니다.');
    navigate('/user/login');
    return;
  }
};

export { checkingLogin, notLoginRouting };
