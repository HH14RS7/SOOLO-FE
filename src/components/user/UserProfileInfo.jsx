import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { MEMBER_URL } from '../../shared/constants';
import { getAPI } from '../../api/api';
import { styled } from 'styled-components';

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
        <Container>
          <Contents>
            <PartyDetailImg>
              <ProfileImage src={user?.profileImage} alt="ProfileImage" />
              <MemberName>{user?.memberName}</MemberName>
              {user?.gender === 'male' ? <div>남</div> : <div>여</div>}
            </PartyDetailImg>
            <LineDiv></LineDiv>
          </Contents>
        </Container>
      </Background>
    </>
  );
};

// 기본 스타일
const Background = styled.div`
  background: #a4a4a4;
  width: 100vw;
  height: 100vh;
`;

const Container = styled.div`
  width: 390px;
  height: 100%;
  background: #505050;
  margin: 0 auto;
  padding-top: 20px;
  padding-bottom: 20px;
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
