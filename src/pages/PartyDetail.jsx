import React from 'react';
import { PARTIES_URL } from '../shared/constants';
import { postAPI } from '../api/api';

export const PartyDetail = () => {
  const data = {
    title: 'aaa',
  };

  postAPI(PARTIES_URL.PARTIES_LIST, data);

  return <div>PartyDetail</div>;
};

export default PartyDetail;
