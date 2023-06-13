import React from 'react';
import { Outlet } from 'react-router-dom';
import SubHeader from '../components/layout/SubHeader';

const FullLayout = () => {
  return (
    <>
      {/* <SubHeader /> */}
      <Outlet />
    </>
  );
};

export default FullLayout;
