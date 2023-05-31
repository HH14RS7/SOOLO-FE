import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from '../pages/Main';
import { PATH_URL, MEMBER_URL } from '../shared/constants';
import Login from '../pages/Login';
import Detail from '../pages/Detail';
import Layout from './Layout';
import { PartyDetail } from '../pages/PartyDetail';
import PartyCreate from '../pages/PartyCreate';
import KakaoRedirection from '../components/user/KakaoRedirection';
import NaverRedirection from '../components/user/NaverRedirection';
import { UserProfilePage } from '../pages/UserProfilePage';
import { Chatpage } from '../pages/Chatpage';
import { ChatRoom } from '../pages/ChatRoom';

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path={PATH_URL.MAIN} element={<Main />} />
          <Route path={PATH_URL.LOGIN} element={<Login />} />
          <Route path={PATH_URL.DETAIL} element={<Detail />} />
          <Route path={`${MEMBER_URL.TARGET_PAGE_GET}/:id`} element={<UserProfilePage />} />
          <Route exact path={PATH_URL.KAKAO} element={<KakaoRedirection />} />
          <Route exact path={PATH_URL.NAVER} element={<NaverRedirection />} />
          <Route path={`${PATH_URL.PARTY_DETAIL}/:partyId`} element={<PartyDetail />} />
          <Route path={PATH_URL.PARTY_CREATE} element={<PartyCreate />} />
          <Route path={PATH_URL.PARTY_CHAT} element={<Chatpage />} />
          <Route path={`${PATH_URL.PARTY_CHATROOM}/:id`} element={<ChatRoom />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
