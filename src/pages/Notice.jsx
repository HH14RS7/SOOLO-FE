import React from 'react';
import { PartyNotice } from '../components/notice/PartyNotice';
import Cookies from 'js-cookie';
import LoginModal from '../components/common/LoginModal';

export const Notice = () => {
  const token = Cookies.get('Access_key');

  return <>{!token ? <LoginModal /> : <PartyNotice />}</>;
};
