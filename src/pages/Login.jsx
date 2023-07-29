import { styled } from 'styled-components';
import KakaoLoginComponent from '../components/user/KakaoLoginComponent';
import NaverLoginComponent from '../components/user/NaverLoginComponent';
import SooloLoginComponent from '../components/user/SooloLoginComponent';
import { ReactComponent as Sooloicon } from '../assets/loginpage/soolo-icon.svg';
import { ReactComponent as Mainicon } from '../assets/loginpage/main-icon.svg';
import { ReactComponent as Announcement } from '../assets/loginpage/announcement.svg';

const Login = () => {
  return (
    <>
      <Container>
        <TextCon>
          <TextBox1>술마시고 싶을 땐?</TextBox1>
          <TextBox2>
            <TextCon1>나는</TextCon1>
            <TextCon2>
              <Sooloicon />
            </TextCon2>
          </TextBox2>
        </TextCon>
        <IconCon>
          <Mainicon />
        </IconCon>
        <IconCon2>
          <Announcement />
        </IconCon2>
        <LoginCon>
          <KakaoLoginComponent />
          <NaverLoginComponent />
          <SooloLoginComponent />
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
  height: 100vh;
  background: #f63d68;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TextCon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 86px;
  gap: 8px;
  width: 118.35px;
  height: 48px;
  left: 116px;
  top: 86px;
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
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;
  width: 118.35px;
  height: 24px;
`;

const TextCon1 = styled.div`
  width: 42px;
  height: 24px;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 100%;
  display: flex;
  align-items: flex-end;
  text-align: center;
  letter-spacing: -0.015em;
  color: #ffffff;
`;

const TextCon2 = styled.div``;

const IconCon = styled.div`
  margin-top: 52px;
`;

const IconCon2 = styled.div`
  margin-bottom: 22px;
`;

const LoginCon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding: 0px 16px 48px;
  gap: 8px;
  width: 360px;
  height: auto;
  left: calc(50% - 360px / 2);
  bottom: 0px;
`;
