import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from '../pages/Main';
import { PATH_URL } from '../shared/constants';
import Login from '../pages/Login';
import Detail from '../pages/Detail';
import Layout from './Layout';
import Redirection from '../components/user/Redirection';
import PartyDetail from '../pages/PartyDetail';

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path={PATH_URL.MAIN} element={<Main />} />
          <Route path={PATH_URL.LOGIN} element={<Login />} />
          <Route path={PATH_URL.DETAIL} element={<Detail />} />
          <Route exact path={PATH_URL.KAKAO} element={<Redirection />} />
          <Route path={PATH_URL.PARTY_DETAIL} element={<PartyDetail />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
