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
import { ChatList } from '../pages/ChatList';
import { ChatRoom } from '../pages/ChatRoom';
import MyPage from '../pages/MyPage';
import { PartyListMap } from '../pages/PartyListMap';
import MyRequestParty from '../pages/MyRequestParty';
import MyCreateParty from '../pages/MyCreateParty';
import PartyMapCreate from '../pages/PartyMapCreate';
import PartyPlaceCreate from '../pages/PartyPlaceCreate';
import UserUpdatePage from '../pages/UserUpdatePage';

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path={PATH_URL.MAIN} element={<Main />} />
          <Route path={PATH_URL.LOGIN} element={<Login />} />
          <Route path={PATH_URL.DETAIL} element={<Detail />} />
          <Route path={PATH_URL.MYPAGE} element={<MyPage />} />
          <Route path={PATH_URL.MYPAGE_UPDATE} element={<UserUpdatePage />} />
          <Route path={`${MEMBER_URL.TARGET_PAGE_GET}/:id`} element={<UserProfilePage />} />
          <Route exact path={PATH_URL.KAKAO} element={<KakaoRedirection />} />
          <Route exact path={PATH_URL.NAVER} element={<NaverRedirection />} />
          <Route path={`${PATH_URL.PARTY_DETAIL}/:partyId`} element={<PartyDetail />} />
          <Route path={PATH_URL.PARTY_CREATE} element={<PartyCreate />} />
          <Route path={`${PATH_URL.PARTY_CHAT}/:id`} element={<ChatList />} />
          <Route path={PATH_URL.PARTY_CHATROOM} element={<ChatRoom />} />
          <Route path={PATH_URL.PARTY_LIST_MAP} element={<PartyListMap />} />
          <Route path={PATH_URL.MY_REQUEST_PARTY} element={<MyRequestParty />} />
          <Route path={PATH_URL.MY_CREATE_PARTY} element={<MyCreateParty />} />
          <Route path={PATH_URL.PARTY_PLACE_CREATE} element={<PartyPlaceCreate />} />
          <Route path={PATH_URL.PARTY_MAP_CREATE} element={<PartyMapCreate />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
