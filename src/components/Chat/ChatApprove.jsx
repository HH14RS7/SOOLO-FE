import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useMutation, useQuery } from 'react-query';
import { getAPI, postAPI, deleteAPI } from '../../api/api';
import { PARTIES_URL } from '../../shared/constants';

import Karina from '../../assets/karina.webp';

export const ChatApprove = () => {
  const [requestList, setRequestList] = useState([]);

  const acceptRequest = useMutation(
    participateId => postAPI(`${PARTIES_URL.ACCEPT}/${participateId}`),
    {
      onSuccess: response => {
        // alert('성공');
      },
      onError: error => {
        // alert('실패');
      },
    },
  );

  const rejectRequest = useMutation(
    participateId => deleteAPI(`${PARTIES_URL.ACCEPT}/${participateId}`),
    {
      onSuccess: response => {
        alert('성공');
      },
      onError: error => {
        alert('실패');
      },
    },
  );

  const { data, isLoading, error } = useQuery('requests', () =>
    getAPI(`${PARTIES_URL.MY_APPROVE_LIST}`),
  );

  useEffect(() => {
    if (data) {
      setRequestList(data.data);
    }
  }, [data]);

  if (isLoading) {
    return <div>로딩중입니다.</div>;
  }

  if (error) {
    return <div>Error : {error.message}</div>;
  }

  const handleAccept = participateId => {
    console.log('participateId :: ', participateId);
    acceptRequest.mutate(participateId);
  };

  const handleReject = participateId => {
    rejectRequest.mutate(participateId);
  };

  console.log('requestList ::', requestList);

  return (
    <>
      <Background>
        <Container>
          <div
            style={{
              height: '1px',
            }}
          ></div>
          {requestList?.data?.map((user, index) => (
            <RequestContainer key={index}>
              <RequestContents>
                <RequestImgDiv>
                  <img
                    src={user.memberProfileImage}
                    alt="memberimg"
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '100%',
                    }}
                  />
                </RequestImgDiv>
                <RequestInfo>
                  <RequestUserName>{user.memberName}</RequestUserName>
                  <div
                    style={{
                      fontSize: '10px',
                      color: '#667085',
                      marginBottom: '8px',
                    }}
                  >
                    주량
                  </div>
                  <RequestUserAlcohol>소주 99병</RequestUserAlcohol>
                  <div
                    style={{
                      fontSize: '10px',
                      color: '#667085',
                      marginBottom: '8px',
                    }}
                  >
                    신청한 이유
                  </div>
                  <RequestUserReason>술 먹고 싶어서 신청했다는데 불만있냐? 씨</RequestUserReason>
                </RequestInfo>
              </RequestContents>
              <RequestDiv>
                <ApproveBtn onClick={() => handleReject(user.partyParticipateId)}>거절</ApproveBtn>
                <RejecBtn onClick={() => handleAccept(user.partyParticipateId)}>승인</RejecBtn>
              </RequestDiv>
            </RequestContainer>
          ))}
        </Container>
      </Background>
    </>
  );
};

// 기본 Default 스타일
const Background = styled.div`
  background: #f9fafb;
  width: 100%;
  height: 89vh;
`;

const Container = styled.div`
  width: 360px;
  height: 100%;
  margin: 0 auto;
  background: #f9fafb;
`;

// 모임 참여자 div 스타일
const RequestContainer = styled.div`
  margin: 0 auto;
  width: 328px;
  height: 224px;
  background: #fff;
  border: 1px solid #e4e7ec;
  border-radius: 16px;
  margin-top: 8px;
  margin-bottom: 8px;
`;

const RequestContents = styled.div`
  display: flex;
`;

const RequestImgDiv = styled.div`
  margin-left: 16px;
  margin-right: 16px;
  margin-top: 16px;
  width: 62px;
  height: 62px;
`;

const RequestInfo = styled.div`
  width: 218px;
  height: 128px;
  margin-top: 16px;
`;

const RequestUserName = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #1d2939;
  margin-bottom: 16px;
`;

const RequestUserAlcohol = styled.div`
  font-size: 14px;
  color: #1d2939;
  margin-bottom: 12px;
`;

const RequestUserReason = styled.div`
  font-size: 14px;
  color: #1d2939;
`;

// 승인 버튼
const RequestDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 328px;
  height: 56px;
  margin-top: 24px;
`;

const ApproveBtn = styled.div`
  width: 140px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #f63d68;
  color: #f63d68;
  border-radius: 12px;
  cursor: pointer;
`;

const RejecBtn = styled.div`
  width: 140px;
  height: 40px;
  display: flex;
  justify-content: center;
  background: #f63d68;
  color: #fff;
  align-items: center;
  border: 2px solid #f63d68;
  border-radius: 12px;
  cursor: pointer;
`;
