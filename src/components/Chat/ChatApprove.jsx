import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { getAPI, postAPI, deleteAPI } from '../../api/api';
import { PARTIES_URL } from '../../shared/constants';

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
      <div>
        {requestList?.data?.map((party, index) => (
          <div key={index}>
            <span>
              {party.memberName} // {party.partyParticipateId}
            </span>
            <button onClick={() => handleAccept(party.partyParticipateId)}>승인</button>
            <button onClick={() => handleReject(party.partyParticipateId)}>거절</button>
          </div>
        ))}
      </div>
    </>
  );
};
