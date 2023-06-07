import React from 'react';
import { useQuery } from 'react-query';
import { MEMBER_URL, PATH_URL } from '../../shared/constants';
import { getAPI } from '../../api/api';
import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import { ReactComponent as UpdateIcon } from '../../assets/mypage/update.svg';
import { ReactComponent as FrameIcon } from '../../assets/mypage/frame35.svg';
import { ReactComponent as ListIcon } from '../../assets/mypage/listicon.svg';
import { ReactComponent as Profile } from '../../assets/mypage/profile.svg';

export const MyPageList = () => {
  const { data, isLoading } = useQuery('mypagelist', async () => {
    const response = await getAPI(`${MEMBER_URL.MYPAGE_GET}`);
    return response;
  });

  if (isLoading) {
    return <div>Loading...</div>; // 로딩 상태에 따른 표시 추가
  }

  const user = data?.data?.data;
  console.log('mydata 확인 => ', data?.data?.data);

  return (
    <>
      <Container>
        <PartyDetailImg>
          <Topbar360>
            <Frame3959>
              <Link to={`${PATH_URL.MYPAGE_UPDATE}`}>
                <UpdateIcon />
              </Link>
            </Frame3959>
          </Topbar360>
          <Frame4017>
            <Frame4016>
              <Frame4011>
                <Name>{user?.memberName}</Name>
                <Frame4010>
                  <Info>{user?.gender === 'male' ? <div>남</div> : <div>여</div>}</Info>
                  <FrameIcon />
                  <Info>{user?.age}대</Info>
                </Frame4010>
              </Frame4011>
              <ProfileImage src={user?.profileImage || <Profile />} alt="ProfileImage" />
            </Frame4016>
            <Frame4013>
              <Introduce>자기 소개</Introduce>
              <IntroduceContent>{user?.introduce}</IntroduceContent>
            </Frame4013>
          </Frame4017>
        </PartyDetailImg>
        <Rectangle3971 />
        <Frame4015>
          <Frame4008>
            <MypageTitle>마이페이지</MypageTitle>
          </Frame4008>
          <Link to={`${PATH_URL.MY_REQUEST_PARTY}`}>
            <Frame4005>
              <ListTitle>내가 신청한 모임</ListTitle>
              <ListIcon />
            </Frame4005>
          </Link>
          <br />
          <Link to={`${PATH_URL.MY_CREATE_PARTY}`}>
            <Frame4005>
              <ListTitle>내가 개설한 모임</ListTitle>
              <ListIcon />
            </Frame4005>
          </Link>
        </Frame4015>
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 360px;
  height: 100%;
  margin: 0 auto;
  padding-bottom: 20px;
`;

const PartyDetailImg = styled.div`
  width: 360px;
  height: 318px;
  left: 0px;
  top: 0px;
  background: #f63d68;
`;

const Rectangle3971 = styled.div`
  width: 360px;
  height: 8px;
  left: 0px;
  top: 318px;
  background: #f2f4f7;
`;

const ProfileImage = styled.img`
  width: 70px;
  height: 70px;
  background: url(.jpg), #d9d9d9;
  border-radius: 16px;
`;

const Topbar360 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 360px;
  height: 52px;
  left: 0px;
  top: 0px;
  margin-bottom: 48px;
`;

const Frame3959 = styled.div`
  padding: 0px 16px 0px 0px;
  width: 40px;
  height: 24px;
`;

const Frame4017 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  gap: 16px;
  width: 360px;
  height: 186px;
  left: 0px;
  top: 100px;
`;

const Frame4016 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 16px;
  gap: 202px;
  width: 360px;
  height: 70px;
  margin-bottom: 16px;
`;

const Frame4011 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;
  width: 56px;
  height: 42px;
`;

const Name = styled.div`
  width: 52px;
  height: 20px;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 100%;
  display: flex;
  align-items: center;
  letter-spacing: -0.015em;
  color: #000000;
`;

const Frame4010 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  width: 56px;
  height: 14px;
  white-space: nowrap;
`;

const Info = styled.div`
  width: 13px;
  height: 14px;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  display: flex;
  align-items: center;
  letter-spacing: -0.015em;
  color: #ffffff;
`;

const Frame4013 = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 32px;
  width: 328px;
  height: 100px;
  background: #f2f4f7;
  border: 1px solid #ffffff;
  box-shadow: 16px 4px 16px rgba(0, 0, 0, 0.15);
  border-radius: 16px;
`;

const Introduce = styled.div`
  width: 47px;
  height: 12px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 100%;
  display: flex;
  align-items: center;
  letter-spacing: -0.015em;
  color: #475467;
  margin-bottom: 8px;
`;

const IntroduceContent = styled.div`
  width: 237px;
  height: 16px;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  display: flex;
  align-items: center;
  letter-spacing: -0.015em;
  color: #000000;
`;

const Frame4015 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 32px 0px 56px;
  background: #ffffff;
  width: 360px;
  height: 388px;
  left: 0px;
  top: 327px;
`;

const Frame4008 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px 16px;
  gap: 10px;
  width: 360px;
  height: 20px;
`;

const MypageTitle = styled.div`
  width: 55px;
  height: 12px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 100%;
  display: flex;
  align-items: center;
  letter-spacing: -0.015em;
  color: #667085;
`;

const Frame4005 = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
  gap: 10px;
  width: 360px;
  height: 56px;
  border-bottom: 1px solid #e4e7ec;
  white-space: nowrap;
`;

const ListTitle = styled.div`
  width: 103px;
  height: 16px;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  display: flex;
  align-items: center;
  letter-spacing: -0.015em;
  color: #000000;
`;
