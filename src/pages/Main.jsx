import PartyList from '../components/party/PartyList';
import MyPartyList from '../components/party/MyPartyList';

import { styled } from 'styled-components';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

const Main = () => {
  const [isLogin, setIsLogin] = useState(false);
  const token = Cookies.get('Access_key');

  useEffect(() => {
    if (token) {
      setIsLogin(true);
    }
  }, [token]);

  return (
    <Background>
      <Container>
        {isLogin && <MyPartyList />}
        <PartyList />
      </Container>
    </Background>
  );
};

const Background = styled.div`
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  width: 390px;
  height: 100%;
  margin: 0 auto;
`;

export default Main;
