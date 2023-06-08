import { MyPageList } from '../components/user/MyPageList';
import Cookies from 'js-cookie';
import LoginModal from '../components/LoginModal';

const MyPage = () => {
  const token = Cookies.get('Access_key');
  return (
    <>
      {/* {showLoginModal && <LoginModal />} */}
      {!token ? <LoginModal /> : <MyPageList />}
    </>
  );
};

export default MyPage;
