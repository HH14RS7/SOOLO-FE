import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from '../pages/Main';
import { PATH_URL } from '../shared/constants';
import Login from '../pages/Login';
import Detail from '../pages/Detail';
import Layout from './Layout';
import { PartyDetail } from '../pages/PartyDetail';
import PartyCreate from '../pages/PartyCreate';
import KakaoRedirection from '../components/user/KakaoRedirection';
import NaverRedirection from '../components/user/NaverRedirection';

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path={PATH_URL.MAIN} element={<Main />} />
          <Route path={PATH_URL.LOGIN} element={<Login />} />
          <Route path={PATH_URL.DETAIL} element={<Detail />} />
          <Route exact path={PATH_URL.KAKAO} element={<KakaoRedirection />} />
          <Route exact path={PATH_URL.NAVER} element={<NaverRedirection />} />
          <Route path={PATH_URL.PARTY_DETAIL} element={<PartyDetail />} />
          <Route path={PATH_URL.PARTY_CREATE} element={<PartyCreate />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
