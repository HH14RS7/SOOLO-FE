import PartyList from '../components/party/PartyList';
import MyPartyList from '../components/party/MyPartyList';
import { Link } from 'react-router-dom';
import { PATH_URL } from '../shared/constants';
import { styled } from 'styled-components';

const Main = () => {
  return (
    <Background>
      <Container>
        <MyPartyList />
        <PartyList />
        <Link to={`${PATH_URL.PARTY_CREATE}`}>
          <CreateButton>모임 만들기</CreateButton>
        </Link>
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
  padding-top: 20px;
  padding-bottom: 20px;
`;

const CreateButton = styled.button`
  position: fixed;
  bottom: 80px;
  right: 250px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #f63d68;
  color: white;
  border: none;
  outline: none;
`;

export default Main;
