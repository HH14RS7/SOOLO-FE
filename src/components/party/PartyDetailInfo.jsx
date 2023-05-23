import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PARTIES_URL } from '../../shared/constants';
import { deleteAPI } from '../../api/api';

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

  // 모임 수정
  const partyModify = () => {
    navigate(PARTIES_URL.PARTIES_UPDATE);
  };

  // 모임 삭제
  const partyDelete = () => {
    deleteAPI(PARTIES_URL.PARTIES_DELETE)
      .then(() => {
        alert('삭제가 완료되었습니다.');
      })
      .catch(() => {
        alert('삭제를 실패했습니다.');
      });
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
            partyModify();
          }}
        >
          모임수정
        </button>
        <button
          onClick={() => {
            partyDelete();
          }}
        >
          모임삭제
        </button>
      </div>
    </>
  );
};
