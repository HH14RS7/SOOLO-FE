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
import MyAccountDetail from '../pages/MyAccountDetail';
import ScrollToTop from '../shared/ScrollToTop';
import { PartyApprove } from '../pages/PartyApprove';
import MainLayout from './MainLayout';
import FullLayout from './FullLayout';
import UserReportPage from '../pages/UserReportPage';
import WalkThroughPage from '../pages/WalkThroughPage';
import { PartyRequestApprove } from '../pages/PartyRequestApprove';
import { NotFoundPage } from '../pages/NotFoundPage';
import { Notice } from '../pages/Notice';
import { Alram } from '../components/Alram';

const Router = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Alram />
      <Routes>
        {/* MainHeader,Footer 컴포넌트 */}
        <Route element={<MainLayout />}>
          <Route path={PATH_URL.MAIN} element={<Main />} />
        </Route>
        {/* SubHeader 컴포넌트  - 추후 분리 필요 */}
        <Route element={<FullLayout />}>
          <Route path={PATH_URL.LOGIN} element={<Login />} />
          <Route exact path={PATH_URL.KAKAO} element={<KakaoRedirection />} />
          <Route exact path={PATH_URL.NAVER} element={<NaverRedirection />} />
          <Route path={PATH_URL.PARTY_PLACE_CREATE} element={<PartyPlaceCreate />} />
          <Route path={`${PATH_URL.PARTY_DETAIL}/:partyId`} element={<PartyDetail />} />
          <Route path={PATH_URL.PARTY_CREATE} element={<PartyCreate />} />
          <Route path={`${MEMBER_URL.TARGET_PAGE_GET}/:id`} element={<UserProfilePage />} />
          <Route path={PATH_URL.PARTY_MAP_CREATE} element={<PartyMapCreate />} />
          <Route path={`${PATH_URL.USER_REPORT}/:id`} element={<UserReportPage />} />
        </Route>
        {/* SubHeader, Footer 컴포넌트 */}
        <Route element={<Layout />}>
          <Route path={PATH_URL.MYPAGE} element={<MyPage />} />
          <Route path={PATH_URL.DETAIL} element={<Detail />} />
          <Route path={PATH_URL.MY_ACCOUNT_DETAILS} element={<MyAccountDetail />} />
          <Route path={PATH_URL.MYPAGE_UPDATE} element={<UserUpdatePage />} />
          <Route path={`${PATH_URL.PARTY_CHAT}/:id`} element={<ChatList />} />
          <Route path={PATH_URL.PARTY_CHATROOM} element={<ChatRoom />} />
          <Route path={PATH_URL.PARTY_LIST_MAP} element={<PartyListMap />} />
          <Route path={PATH_URL.MY_REQUEST_PARTY} element={<MyRequestParty />} />
          <Route path={PATH_URL.MY_CREATE_PARTY} element={<MyCreateParty />} />
          <Route path={PATH_URL.PARTY_APPROVE} element={<PartyApprove />} />
          <Route path={PATH_URL.PARTY_REQUEST_APPROVE} element={<PartyRequestApprove />} />
          <Route path={PATH_URL.NOTICE} element={<Notice />} />
        </Route>
        {/* header, footer 모두 없음 */}
        <Route path={PATH_URL.WALK_THROUGH} element={<WalkThroughPage />} />
        <Route path={PATH_URL.NOT_FOUND} element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
