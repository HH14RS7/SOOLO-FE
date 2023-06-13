import React from 'react';
import { styled } from 'styled-components';
import { Outlet } from 'react-router-dom';

import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const MainLayout = () => {
  return (
    <>
      <Header />
      <Container>
        <Outlet />
      </Container>
      <Footer />
    </>
  );
};

const Container = styled.div`
  padding-top: 51px;
  padding-bottom: 70px;
  height: 100vh;
`;

export default MainLayout;
