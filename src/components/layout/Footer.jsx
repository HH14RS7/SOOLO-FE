import React from 'react';
import { Link } from 'react-router-dom';
import { PATH_URL } from '../../shared/constants';
import { styled } from 'styled-components';

const Footer = () => {
  return (
    <TabBar>
      <Link to={`${PATH_URL.MAIN}`}>
        <span>모임 </span>
      </Link>
      <Link to={`${PATH_URL.PARTY_LIST_MAP}`}>
        <button>위치 </button>
      </Link>
      <span>+</span>
      <span>채팅 </span>
      <Link to={`${PATH_URL.MYPAGE}`}>
        <span>마이페이지 </span>
      </Link>
    </TabBar>
  );
};

export default Footer;

/* Tab Bar */
const TabBar = styled.div`
  position: relative;
  width: 375px;
  height: 83px;
  background: rgba(249, 249, 249, 0.94);
  box-shadow: 0px -0.5px 0px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
`;
