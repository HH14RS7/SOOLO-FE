import React from 'react';
import { Link } from 'react-router-dom';
import { PATH_URL } from '../../shared/constants';

const Footer = () => {
  return (
    <>
      <span>모임 </span>
      <Link to={`${PATH_URL.PARTY_LIST_MAP}`}>
        <button>위치 </button>
      </Link>
      <span>+</span>
      <span>채팅 </span>
      <span>마이페이지 </span>
    </>
  );
};

export default Footer;
