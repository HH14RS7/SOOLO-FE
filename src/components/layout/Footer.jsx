import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PATH_URL } from '../../shared/constants';
import { styled } from 'styled-components';
import { ReactComponent as Partyicon } from '../../assets/footer/party.svg';
import { ReactComponent as Mapicon } from '../../assets/footer/map.svg';
import { ReactComponent as Chaticon } from '../../assets/footer/chat.svg';
import { ReactComponent as Mypageicon } from '../../assets/footer/mypage.svg';
import AddButton from '../../assets/footer/Union.png';

const Footer = () => {
  const [activeTitle, setActiveTitle] = useState(0);

  const handleTitleClick = index => {
    setActiveTitle(index);
  };

  return (
    <TabBar>
      <Tabs>
        <TabBarItem index={0}>
          <Link to={`${PATH_URL.MAIN}`}>
            <Icon
              paddingleft="4.5px"
              paddingtop="3px"
              active={activeTitle === 0}
              onClick={() => handleTitleClick(0)}
            >
              <Partyicon
                width="15px"
                height="19.5px"
                fill={activeTitle === 0 ? '#F63D68' : '#000000'}
              />
            </Icon>
            <Title active={activeTitle === 0}>모임</Title>
          </Link>
        </TabBarItem>
        <TabBarItem index={1}>
          <Link to={`${PATH_URL.PARTY_LIST_MAP}`}>
            <Icon
              paddingleft="1.5px"
              paddingtop="1.5px"
              active={activeTitle === 1}
              onClick={() => handleTitleClick(1)}
            >
              <Mapicon
                width="21px"
                height="21px"
                fill={activeTitle === 1 ? '#F63D68' : '#000000'}
              />
            </Icon>
            <Title active={activeTitle === 1}>위치</Title>
          </Link>
        </TabBarItem>
        <TabBarItem index={2}>
          <Link to={`${PATH_URL.PARTY_CREATE}`}>
            <AddBtn active={activeTitle === 2}>
              <img src={AddButton} alt="Add" />
            </AddBtn>
          </Link>
        </TabBarItem>
        <TabBarItem index={3}>
          <Link to={`${PATH_URL.PARTY_CHAT}/${localStorage.memberUniqueId}`}>
            <Icon
              paddingleft="1.5px"
              paddingtop="3px"
              active={activeTitle === 3}
              onClick={() => handleTitleClick(3)}
            >
              <Chaticon
                width="21px"
                height="19.5px"
                fill={activeTitle === 3 ? '#F63D68' : '#000000'}
              />
            </Icon>
            <Title active={activeTitle === 3}>채팅</Title>
          </Link>
        </TabBarItem>
        <TabBarItem index={4}>
          <Link to={`${PATH_URL.MYPAGE}`}>
            <Icon
              paddingleft="4.5px"
              paddingtop="1.5px"
              active={activeTitle === 4}
              onClick={() => handleTitleClick(4)}
            >
              <Mypageicon
                width="15px"
                height="21px"
                fill={activeTitle === 4 ? '#F63D68' : '#000000'}
              />
            </Icon>
            <Title active={activeTitle === 4} left="calc(50% - 43px/2 + 0.5px)">
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
  height: 49px;
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
  width: 375px;
  height: 100%;
  margin: 0 auto;
  justify-content: space-between;
`;

/* Tab Bar Item */
const TabBarItem = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  width: 76px;
  height: 49px;
`;

/* icon */
const Icon = styled.div`
  padding-left: ${props => props.paddingleft};
  padding-top: ${props => props.paddingtop};
  margin-top: 5px;
  /* width: 24px; */
  /* height: 24px; */
  /* left: 26px; */
  /* top: 7px; */

  cursor: pointer;
  transition: color 0.3s ease-in-out;
  color: ${props => (props.active ? '#F63D68' : '#000000')};

  &:hover {
    color: #f63d68;
  }
`;

/* span */
const Title = styled.span`
  /* width: auto; */
  /* height: 10px; */
  /* left: ${props => props.left || 'calc(50% - 18px / 2)'};
  top: calc(50% - 10px / 2 + 15.37px); */

  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  /* line-height: 100%; */
  /* identical to box height, or 10px */

  /* text-align: center; */
  /* letter-spacing: -0.015em; */

  /* Gray/500 */
  color: ${props => (props.active ? '#F63D68' : '#667085')};
`;

const AddBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  background: #d9d9d9;
  border-radius: 8px;
  border: 1px solid #344054;
`;
