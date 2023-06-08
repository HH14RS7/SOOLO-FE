import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { MEMBER_URL } from '../../shared/constants';
import { getAPI } from '../../api/api';
import { styled } from 'styled-components';
import { ReactComponent as Backicon } from '../../assets/userprofile/back.svg';

export const UserProfileInfo = () => {
  const { id: memberID } = useParams();
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

  const { data } = useQuery('memberInfo', async () => {
    const response = await getAPI(`${MEMBER_URL.TARGET_PAGE_GET}/${memberID}`);
    setIsLoading(false); // 데이터 로드 완료 후 로딩 상태 변경
    return response;
  });

  const user = data?.data?.data;

  if (isLoading) {
    return <div>Loading...</div>; // 로딩 상태에 따른 표시 추가
  }

  return (
    <>
      <Background>
        <Topbar>
          <IconCon>
            <Backicon />
          </IconCon>
          프로필
          <IconCon />
        </Topbar>
        <ProfileImage src={user?.profileImage} alt="ProfileImage" />
        <MemberName>{user?.memberName}</MemberName>
        {user?.gender === 'male' ? <div>남</div> : <div>여</div>}
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
  justify-content: space-between; /* Title과 Frame3959를 좌우로 정렬 */
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

const Contents = styled.div`
  width: 90%;
  margin: 0 auto;
`;

const PartyDetailImg = styled.div`
  width: 100%;
  height: 350px;
  margin-bottom: 10px;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 50%;
  height: 50%;
  border-radius: 100%;
`;

const MemberName = styled.div`
  margin-top: 10px;
  font-size: 20px;
  font-weight: bold;
`;

const LineDiv = styled.div`
  height: 1px;
  background-color: #b6b6b6;
  margin-top: 10px;
  margin-bottom: 10px;
`;
