import { styled } from 'styled-components';
import KakaoLoginComponent from '../components/user/KakaoLoginComponent';
import NaverLoginComponent from '../components/user/NaverLoginComponent';
const Login = () => {
  return (
    <>
      <Container>
        <TextBox1>술마시고 싶을 땐?</TextBox1>
        <TextBox2>나는 SOOLO</TextBox2>
        <KakaoLoginComponent />
        <br />
        <NaverLoginComponent />
      </Container>
    </>
  );
};

export default Login;

const Container = styled.div`
  position: relative;
  margin: 0 auto;
  width: 360px;
  height: 640px;
  background-image: url('/img/Rectangle3990.png');
  background-size: cover;
`;

const TextBox1 = styled.div`
  width: 84px;
  height: 16px;
  left: 137px;
  top: 140px;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 100%;
  display: flex;
  align-items: flex-end;
  text-align: center;
  letter-spacing: -0.015em;
  color: #ffffff;
`;

const TextBox2 = styled.div`
  width: 111px;
  height: 16px;
  left: 124px;
  top: 116px;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  display: flex;
  align-items: flex-end;
  letter-spacing: -0.015em;
  color: #ffffff;
`;
