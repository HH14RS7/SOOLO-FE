import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PATH_URL } from '../../shared/constants';
import { styled } from 'styled-components';
import { ReactComponent as Partyicon } from '../../assets/footer/party.svg';
import { ReactComponent as Mapicon } from '../../assets/footer/map.svg';
import { ReactComponent as Chaticon } from '../../assets/footer/chat.svg';
import { ReactComponent as Mypageicon } from '../../assets/footer/mypage.svg';
import { ReactComponent as Addbtn } from '../../assets/footer/addbtn.svg';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { footerActiveState } from '../../atoms';

const Footer = () => {
  const footerActive = useRecoilValue(footerActiveState);
  const setFooterActive = useSetRecoilState(footerActiveState);

  const handleTitleClick = index => {
    setFooterActive(index);
  };

  return (
    <TabBar>
      <Tabs>
        <TabBarItem index={0}>
          <Link to={`${PATH_URL.MAIN}`}>
            <Icon
              active={footerActive === 0 ? 'true' : 'false'}
              onClick={() => handleTitleClick(0)}
            >
              <Partyicon fill={footerActive === 0 ? '#F63D68' : '#000000'} />
            </Icon>
            <Title active={footerActive === 0 ? 'true' : 'false'}>홈</Title>
          </Link>
        </TabBarItem>
        <TabBarItem index={1}>
          <Link to={`${PATH_URL.PARTY_LIST_MAP}`}>
            <Icon
              active={footerActive === 1 ? 'true' : 'false'}
              onClick={() => handleTitleClick(1)}
            >
              <Mapicon fill={footerActive === 1 ? '#F63D68' : '#000000'} />
            </Icon>
            <Title active={footerActive === 1 ? 'true' : 'false'}>위치</Title>
          </Link>
        </TabBarItem>
        <TabBarItem index={2}>
          <Link to={`${PATH_URL.PARTY_PLACE_CREATE}`}>
            <PartyAdd
              active={footerActive === 2 ? 'true' : 'false'}
              onClick={() => handleTitleClick(2)}
            >
              <Addbtn />
            </PartyAdd>
          </Link>
        </TabBarItem>
        <TabBarItem index={3}>
          <Link to={`${PATH_URL.PARTY_CHAT}/${localStorage.memberUniqueId}`}>
            <Icon
              active={footerActive === 3 ? 'true' : 'false'}
              onClick={() => handleTitleClick(3)}
            >
              <Chaticon fill={footerActive === 3 ? '#F63D68' : '#000000'} />
            </Icon>
            <Title active={footerActive === 3 ? 'true' : 'false'}>채팅</Title>
          </Link>
        </TabBarItem>
        <TabBarItem index={4}>
          <Link to={`${PATH_URL.MYPAGE}`}>
            <Icon
              active={footerActive === 4 ? 'true' : 'false'}
              onClick={() => handleTitleClick(4)}
            >
              <Mypageicon fill={footerActive === 4 ? '#F63D68' : '#000000'} />
            </Icon>
            <Title active={footerActive === 4 ? 'true' : 'false'} left="calc(50% - 43px/2 + 0.5px)">
              마이페이지
            </Title>
          </Link>
        </TabBarItem>
      </Tabs>
    </TabBar>
  );
};

export default Footer;

/* Tab Bar */
const TabBar = styled.div`
  height: 70px;
  position: fixed;
  bottom: 0;
  width: 100%;
  background: rgba(249, 249, 249, 0.94);
  box-shadow: 0px -0.5px 0px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  z-index: 30;
`;

/* Tabs */
const Tabs = styled.div`
  display: flex;
  width: 360px;
  height: 100%;
  margin: 0 auto;
  justify-content: space-between;
`;

/* Tab Bar Item */
const TabBarItem = styled.div`
  width: 76px;
  height: 49px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

/* icon */
const Icon = styled.div`
  /* margin-left: 26px; */
  margin-top: 7px;
  cursor: pointer;
  transition: color 0.3s ease-in-out;
  color: ${props => (props.active === 'true' ? '#F63D68' : '#667085')};
  &:hover {
    color: #f63d68;
  }
`;

/* span */
const Title = styled.span`
  margin-top: ${props => props.marginTop};
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  color: #667085;
  /* color: ${props => (props.active ? '#F63D68' : '#667085')}; */
`;

const PartyAdd = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  background: #f63d68;
  border-radius: 8px;
  border: 1px solid #fff;
`;
