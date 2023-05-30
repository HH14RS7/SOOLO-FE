import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { MEMBER_URL, PATH_URL } from '../../shared/constants';
import { getAPI } from '../../api/api';
import { styled } from 'styled-components';
import UserUpdate from './UserUpdate';
import { Link } from 'react-router-dom';

export const MyPageList = () => {
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data } = useQuery('mypagelist', async () => {
    const response = await getAPI(`${MEMBER_URL.MYPAGE_GET}`);
    setIsLoading(false); // 데이터 로드 완료 후 로딩 상태 변경
    return response;
  });

  if (isLoading) {
    return <div>Loading...</div>; // 로딩 상태에 따른 표시 추가
  }

  const modalOpenToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const user = data?.data?.data;
  console.log('mydata 확인 => ', data?.data?.data);

  return (
    <>
      {isModalOpen && (
        <UserUpdate
          memberName={user?.memberName}
          profileImage={user?.profileImage}
          isModalOpen={modalOpenToggle}
        ></UserUpdate>
      )}
      <Background>
        <Container>
          <Contents>
            <PartyDetailImg>
              <ProfileImage src={user?.profileImage} alt="ProfileImage" />
              <MemberName>{user?.memberName}</MemberName>
              {user?.gender === 'male' ? <div>남</div> : <div>여</div>}
              <br />
              <Button onClick={() => modalOpenToggle()}>프로필 변경</Button>
            </PartyDetailImg>
            <LineDiv></LineDiv>
            <ButtonCon>
              <Link to={`${PATH_URL.MY_REQUEST_PARTY}`}>
                <Button>내가 신청한 모임리스트</Button>
              </Link>
              <br />
              <Link to={`${PATH_URL.MY_CREATE_PARTY}`}>
                <Button>내가 개설한 모임리스트</Button>
              </Link>
            </ButtonCon>
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

const ButtonCon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  border: 1px solid;
  border-color: black;
  border-radius: 10px;
`;
