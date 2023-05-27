import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PATH_URL, PARTIES_URL, MEMBER_URL } from '../../shared/constants';
import { deleteAPI, getAPI, postAPI } from '../../api/api';
import { useMutation } from 'react-query';
import { styled } from 'styled-components';
import SojuRoom from '../../assets/sojuroomimg.webp';
import { Link } from 'react-router-dom';

export const PartyDetailInfo = () => {
  const location = useLocation();
  const partyId = location.pathname.split('/')[3];

  const navigate = useNavigate();
  const [data, setData] = useState();
  const [buttonText, setButtonText] = useState('모임신청');

  // 모임 상세 조회
  useEffect(() => {
    getAPI(`${PARTIES_URL.DETAIL}/${partyId}`)
      .then(response => {
        // console.log('response :: ', response.data.data);
        if (response.status === 200) {
          setData(response.data.data);
        }
      })
      .catch(error => {
        console.log('API 요청 중 에러 발생', error);
      });
  }, [partyId]);

  // 모임 신청, 취소 버튼
  const handleButtonClick = () => {
    if (buttonText === '모임신청') {
      setButtonText('모임취소');
      postAPI(`${PARTIES_URL.PARTIES_APPLICATION}/${partyId}`)
        .then(data => {
          console.log('data :: ', data);
          alert('모임이 신청되었습니다.');
        })
        .catch(error => {
          console.log('API 요청 중 에러 : ', error);
        });
    } else {
      setButtonText('모임신청');
      postAPI(`${PARTIES_URL.PARTIES_APPLICATION}/${partyId}`)
        .then(data => {
          console.log('data :: ', data);
          alert('모임이 취소되었습니다.');
        })
        .catch(error => {
          console.log('API 요청 중 에러 : ', error);
        });
    }
  };

  // 모임 수정
  const updateParty = partyId => {
    navigate(`${PATH_URL.PARTY_CREATE}?partyId=${partyId}`, { state: data });
  };

  // 모임 삭제
  const deletePartyMutation = useMutation(
    () => deleteAPI(`${PARTIES_URL.PARTIES_STATUS_CHANGE}/${partyId}`),
    {
      onSuccess: response => {
        alert(response.data.msg);
        navigate(PATH_URL.MAIN);
      },
      onError: error => {
        alert(error.message);
      },
    },
  );

  const deleteParty = partyId => {
    deletePartyMutation.mutate(partyId);
  };

  //유저 멤버아이디
  const memberId = data?.memberInfo[0].memberId;

  console.log('data ::', data);

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
              <Link to={`${MEMBER_URL.TARGET_PAGE_GET}/${memberId}`}>
                <img
                  src={data?.memberInfo[0].profileImage}
                  alt="profile"
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '100%',
                  }}
                />
              </Link>
              <ProfileName>{data?.memberInfo[0].memberName}</ProfileName>
            </ProfileBox>
            <LineDiv></LineDiv>
            <PartyName>파티 제목 : {data?.title}</PartyName>
            <div>파티내용 : {data?.content}</div>
            <div>파티 모집 기간 (모이는 시간)</div>
            <div>현재 인원 : {data?.currentCount} </div>
            <div>최대 인원 : {data?.totalCount}</div>
            <div>모집중</div>
            <div>만든 날짜 : {data?.createdAt}</div>
            <div>수정 날짜 : {data?.modifiedAt}</div>
            <PartyInfo></PartyInfo>
            <button id="" onClick={handleButtonClick}>
              {buttonText}
            </button>
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
