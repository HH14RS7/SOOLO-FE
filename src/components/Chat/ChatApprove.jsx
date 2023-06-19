import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useMutation, useQuery, QueryClient } from 'react-query';
import { getAPI, postAPI, deleteAPI } from '../../api/api';
import { MEMBER_URL, PARTIES_URL } from '../../shared/constants';
import { Link, useNavigate } from 'react-router-dom';
import { PATH_URL } from '../../shared/constants';

export const ChatApprove = () => {
  const queryClient = new QueryClient();
  const navigate = useNavigate();

  const [requestList, setRequestList] = useState([]);

  // 모임 승인
  const acceptRequest = useMutation(
    participateId => postAPI(`${PARTIES_URL.ACCEPT}/${participateId}`),
    {
      onSuccess: response => {
        alert(response.data.msg);
        navigate(`${PATH_URL.PARTY_CHAT}/${localStorage.memberUniqueId}`);
      },
      onError: error => {
        alert(error.data.msg);
        navigate(`${PATH_URL.PARTY_CHAT}/${localStorage.memberUniqueId}`);
      },
    },
  );

  // 모임 거절
  const rejectRequest = useMutation(
    participateId => deleteAPI(`${PARTIES_URL.ACCEPT}/${participateId}`),
    {
      onSuccess: response => {
        alert(response.data.msg);
        navigate(`${PATH_URL.PARTY_CHAT}/${localStorage.memberUniqueId}`);
      },
      onError: error => {
        alert(error.data.msg);
        navigate(`${PATH_URL.PARTY_CHAT}/${localStorage.memberUniqueId}`);
      },
    },
  );

  const { data, isLoading, error } = useQuery('requests', () =>
    getAPI(`${PARTIES_URL.MY_APPROVE_LIST}`),
  );

  // useEffect(() => {
  //   if (data) {
  //     setRequestList(data.data);
  //   }
  // }, [queryClient]);

  useEffect(() => {
    queryClient.invalidateQueries('requests');
  }, [queryClient]);

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
          height: '1px',
        }}
      ></div>
      {data?.data?.data?.length > 0
        ? data?.data?.data?.map((user, index) => (
            <RequestContainer key={index}>
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
                  <Link to={`${PARTIES_URL.PARTIES_DETAIL}/${user.partyId}`}>
                    <div
                      style={{
                        fontSize: '12px',
                        marginBottom: '8px',
                      }}
                    >
                      모임 : {user.title}
                    </div>
                  </Link>
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
                <ApproveBtn onClick={() => handleReject(user.partyParticipateId)}>거절</ApproveBtn>
                <RejecBtn onClick={() => handleAccept(user.partyParticipateId)}>승인</RejecBtn>
              </RequestDiv>
            </RequestContainer>
          ))
        : ''}
    </>
  );
};

// 기본 Default 스타일
const Background = styled.div`
  width: 100%;
`;

const Container = styled.div`
  width: 360px;
  height: 100%;
  background: #f2f4f7;
  margin: 0 auto;
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
