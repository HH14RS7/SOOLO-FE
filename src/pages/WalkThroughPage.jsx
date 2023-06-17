import React, { useEffect, useState } from 'react';
import Splash from '../components/common/Splash';
import Walkthrough from '../components/common/Walkthrough';
import { styled } from 'styled-components';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { PATH_URL } from '../shared/constants';

const WalkThroughPage = () => {
  const [showComponent, setShowComponent] = useState(true);
  const navigate = useNavigate();

  const token = Cookies.get('Access_key');

  useEffect(() => {
    if (token) {
      navigate(PATH_URL.MAIN);
    } else {
      const timer = setTimeout(() => {
        setShowComponent(false);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      <Container>{showComponent ? <Splash /> : <Walkthrough />}</Container>
    </>
  );
};

const Container = styled.div``;

export default WalkThroughPage;
