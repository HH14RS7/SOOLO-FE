import { styled } from 'styled-components';
import KakaoLoginComponent from '../components/user/KakaoLoginComponent';
import NaverLoginComponent from '../components/user/NaverLoginComponent';
const Login = () => {
  return (
    <>
      <Container>
        <TextCon>
          <TextBox1>술마시고 싶을 땐?</TextBox1>
          <TextBox2>나는 SOOLO</TextBox2>
        </TextCon>
        <LoginCon>
          <KakaoLoginComponent />
          <NaverLoginComponent />
        </LoginCon>
      </Container>
    </>
  );
};

export default Login;

const Container = styled.div`
  position: relative;
  margin: 0 auto;
  width: 360px;
  height: 100%;
  background-image: url('/img/Rectangle3990.png');
  background-size: cover;
  display: flex;
  flex-direction: column;
`;

const TextCon = styled.div`
  padding: 116px 0px 0px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
`;

const TextBox1 = styled.div`
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
  white-space: nowrap;
`;

const TextBox2 = styled.div`
  width: 84px;
  height: 16px;
  left: 137px;
  top: 140px;
  margin-top: 8px;
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

const LoginCon = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding: 0px 16px 64px;
  gap: 12px;
  width: 360px;
  height: 172px;
  left: calc(50% - 360px / 2);
  bottom: 0px;
`;
