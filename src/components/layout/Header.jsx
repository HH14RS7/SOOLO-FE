import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
const Header = () => {
  const navigate = useNavigate();
  return (
    <>
      <Background>
        <Container>
          <FooterBtn onClick={() => navigate('/')}>메인</FooterBtn>
          <FooterBtn onClick={() => navigate('/user/login')}>로그인</FooterBtn>
          <FooterBtn onClick={() => navigate('/party/create')}>모임 생성</FooterBtn>
        </Container>
      </Background>
    </>
  );
};

export default Header;

const Background = styled.div`
  background: #dcdcdc;
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  width: 375px;
  height: 52px;
  background: #c3c3c3;
  margin: 0 auto;
  padding-top: 20px;
  padding-bottom: 20px;
`;

const FooterBtn = styled.button`
  color: black;
`;
