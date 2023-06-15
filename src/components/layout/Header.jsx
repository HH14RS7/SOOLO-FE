import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// 이미지 import
import { ReactComponent as Logo } from '../../assets/header/logo.svg';
import { ReactComponent as Bell } from '../../assets/header/bellicon.svg';

export const Header = () => {
  const bellbuttonHandler = () => {
    alert('아직 준비중입니다.');
  };

  return (
    <>
      <Background>
        <Contents>
          <Link to="/">
            <Logo />
          </Link>
          <Bell
            style={{
              cursor: 'pointer',
            }}
            onClick={() => {
              bellbuttonHandler();
            }}
          />
        </Contents>
      </Background>
    </>
  );
};

const Background = styled.div`
  display: flex;
  background: #ffffff;
  width: 100%;
  height: 52px;
  position: fixed;
  top: 0;
  border-bottom: 0.5px solid gray;
  z-index: 30;
`;

const Contents = styled.div`
  width: 343px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
