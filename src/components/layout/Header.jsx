import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Alarmicon } from '../../assets/header/alarm.svg';

const Header = () => {
  const navigate = useNavigate();
  return (
    <>
      <Top>
        <TopBar>
          <Title>SOOLO</Title>
          <FooterBtn onClick={() => navigate('/user/login')}>로그인</FooterBtn>
          <Icon>
            <Alarmicon width="19.87px" height="19.44px" />
          </Icon>
        </TopBar>
      </Top>
    </>
  );
};

export default Header;

const Top = styled.div`
  width: 100vw;
  height: 52px;
  position: fixed;
  background: #ffffff;
`;

/* top-bar */
const TopBar = styled.div`
  display: flex;
  justify-content: center;
  width: 375px;
  height: 52px;
  left: 0px;
  top: 0px;
  padding: 13.5px 16px 14.5px 16px;
  margin: 0 auto;

  /* Gray/25 */

  background: #ffffff;
`;

/* SOOLO */
const Title = styled.span`
  width: 81px;
  height: 24px;

  /* title24 */

  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 100%;
  /* identical to box height, or 24px */

  letter-spacing: -0.015em;

  /* Text/black */

  color: #1d2939;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
`;

const FooterBtn = styled.button`
  color: black;
`;

const Icon = styled.div`
  margin-left: auto;
  height: 24px;
  width: 24px;
  left: 0px;
  top: 0px;
  border-radius: 0px;
`;
