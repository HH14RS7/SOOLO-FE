import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PATH_URL, PARTIES_URL } from '../../shared/constants';
import { deleteAPI } from '../../api/api';
import { useMutation } from 'react-query';
import { styled } from 'styled-components';
import SojuRoom from '../../assets/sojuroomimg.webp';

export const PartyDetailInfo = () => {
  const navigate = useNavigate();
  const [buttonText, setButtonText] = useState('모임신청');
  const { partyId } = useParams();

  console.log(partyId);
  // 모임 신청
  const handleButtonClick = () => {
    if (buttonText === '모임신청') {
      setButtonText('모임취소');
    } else {
      setButtonText('모임신청');
    }
  };

  // 모임 수정(임시)

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
      <Background>
        <Container>
          <Contents>
            <PartyDetailImg>
              <img
                src={SojuRoom}
                alt="partydetail"
                style={{
                  width: '100%',
                  height: '100%',
                }}
              />
            </PartyDetailImg>
            <ProfileBox>
              <img
                src={SojuRoom}
                alt="profile"
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '100%',
                }}
              />
              <ProfileName>하리뽀</ProfileName>
            </ProfileBox>
            <LineDiv></LineDiv>
            <PartyName>파티제목 : 아침까지 먹죽팟</PartyName>
            <div>파티내용 : 코딩 개같아서 못하겠다 술먹을 사람</div>
            <div>파티 모집 기간 (모이는 시간)</div>
            <div>현재 인원 수 / 최대 인원 수</div>
            <div>모집중</div>
            <div>만든 날짜 : 2023.05.24</div>
            <div>수정 날짜 : 2023.05.25</div>
            <PartyInfo></PartyInfo>
            {/* <h1>PartyDetail</h1>
          <div>partyid</div>
          <div>title</div>
          <div>content</div>
          <div>date</div>
          <div>totalCount</div>
          <div>currentCount</div>
          <div>processing</div>
          <div>profileimage</div>
          <div>memberName</div>
          <div>createdAt</div> */}
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
          </Contents>
        </Container>
      </Background>
    </>
  );
};

// 기본 스타일
const Background = styled.div`
  background: #a4a4a4;
  width: 100%;
  height: 100%;
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
`;

const LineDiv = styled.div`
  height: 1px;
  background-color: #b6b6b6;
  margin-top: 10px;
  margin-bottom: 10px;
`;

// 프로필 관련 스타일
const ProfileBox = styled.div`
  display: flex;
`;

const ProfileName = styled.div`
  font-size: 15px;
  font-weight: bold;
`;

// 파티 관련 스타일
const PartyInfo = styled.div``;

const PartyName = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

// 모임 관련 버튼 스타일
