import styled from 'styled-components';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <Content>
        <Outlet />
      </Content>
      <Footer />
    </>
  );
};

const Content = styled.div`
  // padding-top: 51px;
  padding-bottom: 70px;
  height: 100vh;
`;

export default Layout;
