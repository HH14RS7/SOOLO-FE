import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { MEMBER_URL, PATH_URL } from '../../shared/constants';
import { getAPI } from '../../api/api';
import { styled } from 'styled-components';
import { ReactComponent as Backicon } from '../../assets/userprofile/back.svg';
import { ReactComponent as FrameIcon } from '../../assets/mypage/frame35.svg';
import { ReactComponent as Report } from '../../assets/userprofile/report.svg';
import { Link } from 'react-router-dom';
import Loading from '../Loading';

export const UserProfileInfo = () => {
  const { id: memberID } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery('memberInfo', async () => {
    const response = await getAPI(`${MEMBER_URL.TARGET_PAGE_GET}/${memberID}`);
    return response;
  });

  const user = data?.data?.data;

  if (isLoading) {
    return <Loading />;
  }

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
          프로필
          <IconCon />
        </Topbar>
        <BackGroundColor />
        <Frame4047>
          <ProfileImage src={user?.profileImage} alt="ProfileImage" />
          <MemberName>{user?.memberName}</MemberName>
          <Frame4010>
            <Info>{user?.gender === 'male' ? <div>남</div> : <div>여</div>}</Info>
            <FrameIcon fill="#1D2939" />
            <Info>{user?.age}대</Info>
          </Frame4010>
          <Frame4013>
            <Frame4014>
              <TextInfo>자기소개</TextInfo>
              <TextContent>{user?.introduce}</TextContent>
            </Frame4014>
            <ReportCon>
              <Link to={`${PATH_URL.USER_REPORT}/${memberID}`}>
                <Report />
              </Link>
            </ReportCon>
          </Frame4013>
        </Frame4047>
      </Background>
    </>
  );
};

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

const BackGroundColor = styled.div`
  position: absolute;
  width: 360px;
  height: 178px;
  background: #c01048;
  border-radius: 0px 0px 16px 16px;
`;

const Frame4047 = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 360px;
  height: 274px;
  margin-top: 128px;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 999px;
  margin-bottom: 16px;
  object-fit: cover;
`;

const MemberName = styled.div`
  width: auto;
  height: 20px;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 100%;
  display: flex;
  align-items: center;
  letter-spacing: -0.015em;
  color: #1d2939;
  margin-bottom: 8px;
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
  color: #1d2939;
`;

const Frame4013 = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 16px;
  padding: 32px;
  width: 328px;
  height: 100px;
  background: #f2f4f7;
  border: 1px solid #ffffff;
  border-radius: 16px;
`;

const Frame4014 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  gap: 8px;
  width: 264px;
  height: 36px;
`;

const TextInfo = styled.div`
  width: 44px;
  height: 12px;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 100%;
  display: flex;
  align-items: center;
  letter-spacing: -0.015em;
  color: #475467;
`;

const TextContent = styled.div`
  width: 237px;
  height: 16px;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  letter-spacing: -0.015em;
  color: #000000;
`;

const ReportCon = styled.div`
  margin-top: 114px;
`;

const StyledBackicon = styled(Backicon)`
  cursor: pointer;
`;
