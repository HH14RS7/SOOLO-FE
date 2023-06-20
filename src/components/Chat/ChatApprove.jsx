import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getAPI, postAPI, deleteAPI } from '../../api/api';
import { MEMBER_URL, PARTIES_URL } from '../../shared/constants';
import { Link, useNavigate } from 'react-router-dom';
import { PATH_URL } from '../../shared/constants';

// 이미지 import
import { ReactComponent as Location } from '../../assets/map/location-line.svg';
import { ReactComponent as LoadingIcon } from '../../assets/chating/noapprove.svg';
import { ReactComponent as LeftBack } from '../../assets/chating/LeftBack.svg';

export const ChatApprove = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // 모임 승인
  const acceptRequest = useMutation(
    participateId => postAPI(`${PARTIES_URL.ACCEPT}/${participateId}`),
    {
      onSuccess: response => {
        queryClient.invalidateQueries('requests');
        alert(response.data.msg);
      },
      onError: error => {
        alert(error.data.msg);
      },
    },
  );

  // 모임 거절
  const rejectRequest = useMutation(
    participateId => deleteAPI(`${PARTIES_URL.ACCEPT}/${participateId}`),
    {
      onSuccess: response => {
        queryClient.invalidateQueries('requests');
        alert(response.data.msg);
      },
      onError: error => {
        alert(error.data.msg);
      },
    },
  );

  const { data, isLoading, error } = useQuery('requests', () =>
    getAPI(`${PARTIES_URL.MY_APPROVE_LIST}`),
  );

  if (isLoading) {
    return <div>로딩중입니다.</div>;
  }

  if (error) {
    return <div>Error : {error.message}</div>;
  }

  const handleAccept = participateId => {
    acceptRequest.mutate(participateId);
  };

  const handleReject = participateId => {
    rejectRequest.mutate(participateId);
  };

  console.log('data ::', data);

  return (
    <>
      <div
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <div
          style={{
            height: '100%',
            width: '360px',
            margin: '0 auto',
            background: '#f9fafb',
            paddingBottom: '70px',
          }}
        >
          <Topbar>
            <TopBackDiv
              style={{
                position: 'absolute',
              }}
            >
              <Link to={'/home'}>
                <LeftBack />
              </Link>
            </TopBackDiv>
            <TopbarName>들어온 승인 요청</TopbarName>
          </Topbar>
          {data?.data?.data?.length > 0 ? (
            data?.data?.data?.map((user, index) => (
              <RequestContainer key={index}>
                <Link to={`${PARTIES_URL.PARTIES_DETAIL}/${user.partyId}`}>
                  <PartyName>
                    <div
                      style={{
                        width: '16px',
                        height: '16px',
                      }}
                    >
                      <Location
                        style={{
                          width: '100%',
                          height: '100%',
                        }}
                      />
                    </div>
                    {user.title}
                  </PartyName>
                </Link>
                <RequestContents>
                  <RequestImgDiv>
                    <Link to={`${MEMBER_URL.TARGET_PAGE_GET}/${user.memberId}`}>
                      <img
                        src={user.memberProfileImage}
                        alt="memberimg"
                        style={{
                          width: '100%',
                          height: '100%',
                          borderRadius: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    </Link>
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
                    <RequestUserAlcohol>{user.amountAlcohol || '미입력'}</RequestUserAlcohol>
                    <div
                      style={{
                        fontSize: '10px',
                        color: '#667085',
                        marginBottom: '8px',
                      }}
                    >
                      신청한 이유
                    </div>
                    <RequestUserReason>{user.reason || '미입력'}</RequestUserReason>
                  </RequestInfo>
                </RequestContents>
                <RequestDiv>
                  <ApproveBtn onClick={() => handleReject(user.partyParticipateId)}>
                    거절
                  </ApproveBtn>
                  <RejecBtn onClick={() => handleAccept(user.partyParticipateId)}>승인</RejecBtn>
                </RequestDiv>
              </RequestContainer>
            ))
          ) : (
            <div
              style={{
                width: '360px',
                height: '87vh',
                background: '#f2f4f7',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <LoadingDiv>
                <LoadingIcon
                  style={{
                    margin: '0 auto',
                    width: '48px',
                    height: '48px',
                  }}
                />
                <LoadingText>들어온 승인요청이 없습니다.</LoadingText>
              </LoadingDiv>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

// TopBar 스타일
const Topbar = styled.div`
  display: flex;
  top: 0;
  // margin-top: 51px;
  align-items: center;
  justify-content: space-between;
  width: 360px;
  height: 52px;
  border-bottom: 1px solid #f2f4f7;
  background: #fff;
  z-index: 10;
  margin: 0 auto;
`;

const TopBackDiv = styled.div`
  display: flex;
  align-items: center;
  padding-left: 16px;
  width: 40px;
  height: 24px;
  cursor: pointer;
`;

const TopbarName = styled.div`
  color: #1d2939;
  font-size: 16px;
  text-align: center;
  flex-grow: 1;
`;

// 모임 참여자 div 스타일
const RequestContainer = styled.div`
  margin: 0 auto;
  width: 328px;
  height: 276px;
  background: #fff;
  border: 1px solid #e4e7ec;
  border-radius: 16px;
  margin-top: 8px;
  margin-bottom: 8px;
`;

const PartyName = styled.div`
  display: flex;
  align-items: center;
  width: 296px;
  height: 36px;
  background: #f9fafb;
  border: 1px solid #e4e7ec;
  border-radius: 8px;
  margin: auto;
  margin-top: 16px;
  gap: 10px;
  padding: 10px;
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
  max-width: 210px;
  word-wrap: break-word;
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

// 로딩 스타일
const LoadingDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-content: center;
  text-align: center;
  width: 360px;
  height: 70px;
`;

const LoadingText = styled.div`
  width: 360px;
  margin-top: 8px;
`;
