import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH_URL, PARTIES_URL } from '../../shared/constants';
import { deleteAPI } from '../../api/api';
import { useMutation } from 'react-query';

export const PartyDetailInfo = () => {
  const navigate = useNavigate();
  const [buttonText, setButtonText] = useState('모임신청');

  // 모임 신청
  const handleButtonClick = () => {
    if (buttonText === '모임신청') {
      setButtonText('모임취소');
    } else {
      setButtonText('모임신청');
    }
  };

  // 모임 수정(임시)
  const partyId = 3;
  const updateParty = partyId => {
    navigate(`${PATH_URL.PARTY_CREATE}?partyId=${partyId}`);
    // navigate(`${PATH_URL.PARTY_CREATE}?partyID=${partyId}`,{state: party }); // party 값도 넘겨줘야함
  };

  // 모임 삭제
  const deletePartyMutation = useMutation(() => deleteAPI(`${PARTIES_URL.PARTY}/${partyId}`), {
    onSuccess: () => {
      alert('모임이 삭제되었습니다!'); // 매시지 받아서 처리
    },
    onError: error => {
      alert(error.message);
    },
  });

  const deleteParty = partyId => {
    deletePartyMutation.mutate(partyId);
  };

  return (
    <>
      <div>
        <h1>PartyDetail</h1>
        <div>partyid</div>
        <div>title</div>
        <div>content</div>
        <div>date</div>
        <div>totalCount</div>
        <div>currentCount</div>
        <div>processing</div>
        <div>profileimage</div>
        <div>memberName</div>
        <div>createdAt</div>
        <button onClick={handleButtonClick}>{buttonText}</button>
        <button
          onClick={() => {
            updateParty(partyId);
          }}
        >
          모임수정
        </button>
        <button
          onClick={() => {
            deleteParty(partyId);
          }}
        >
          모임삭제
        </button>
      </div>
    </>
  );
};
