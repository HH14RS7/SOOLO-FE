import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const PartyDetail = () => {
  const navigate = useNavigate();
  const [buttonText, setButtonText] = useState('모임신청');

  const handleButtonClick = () => {
    if (buttonText === '모임신청') {
      setButtonText('모임취소');
    } else {
      setButtonText('모임신청');
    }
  };

  const partyModify = () => {
    navigate('/partyModify');
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
        <button onClick={partyModify}>모임수정</button>
        <button>모임삭제</button>
      </div>
    </>
  );
};

export default PartyDetail;
