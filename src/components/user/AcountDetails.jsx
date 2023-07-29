import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { MEMBER_URL } from '../../shared/constants';
import { getAPI } from '../../api/api';
import { styled } from 'styled-components';
import { ReactComponent as Backicon } from '../../assets/userprofile/back.svg';
import { ReactComponent as Kakaoicon } from '../../assets/mypage/kakao-icon.svg';

const AcountDetails = () => {
  const navigate = useNavigate();

  const { data } = useQuery('mypagelist', async () => {
    const response = await getAPI(`${MEMBER_URL.MYPAGE_GET}`);
    return response;
  });

  const user = data?.data?.data;

  return (
    <>
      <Background>
        <Topbar>
          <IconCon>
            <StyledBackicon
              onClick={() => {
                navigate(-1);
              }}
            />
          </IconCon>
          계정정보
          <IconCon />
        </Topbar>
        <Frame4046>
          <TextCon>가입한 계정</TextCon>
          <EmailCon>
            <Icon>
              <Kakaoicon />
            </Icon>
            <EmailText>{user?.memberEmailId}</EmailText>
            <Icon />
          </EmailCon>
        </Frame4046>
      </Background>
    </>
  );
};

export default AcountDetails;

// 기본 스타일
const Background = styled.div`
  position: relative;
  width: 360px;
  height: 100%;
  margin: 0 auto;
  background: #ffffff;
`;

const Topbar = styled.div`
  box-sizing: border-box;
  width: 360px;
  height: 52px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  border-bottom: 1px solid #f2f4f7;
`;

const IconCon = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px 0px 0px 16px;
  width: 40px;
  height: 24px;
  left: 0px;
  top: calc(50% - 24px / 2);
`;

const Frame4046 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 auto;
  padding-top: 26px;
  gap: 8px;
  width: 328px;
  height: 94px;
  left: 16px;
  top: 78px;
`;

const TextCon = styled.div`
  width: 54px;
  height: 12px;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 100%;
  letter-spacing: -0.015em;
  color: #000000;
`;

const EmailCon = styled.div`
  width: 328px;
  height: 48px;
  background: #f2f4f7;
  border-radius: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const EmailText = styled.div`
  width: auto;
  height: 12px;
  left: calc(50% - 106px / 2);
  top: calc(50% - 12px / 2);
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 100%;
  letter-spacing: -0.015em;
  color: rgba(0, 0, 0, 0.85);
`;

const Icon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0px 0px 0px 16px;
  gap: 10px;
  width: 30px;
  height: 49px;
`;

const StyledBackicon = styled(Backicon)`
  cursor: pointer;
`;
