import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PATH_URL, PARTIES_URL, MEMBER_URL } from '../../shared/constants';
import { partyStatus } from '../../shared/partyStatus';
import { deleteAPI, getAPI, postAPI } from '../../api/api';
import { useMutation } from 'react-query';
import { styled } from 'styled-components';
import SojuRoom from '../../assets/sojuroomimg.webp';
import { Link } from 'react-router-dom';
import { formmatedDate } from '../../shared/formattedDate';

export const PartyDetailInfo = () => {
  const location = useLocation();
  const partyId = location.pathname.split('/')[3];
  const navigate = useNavigate();
  const [data, setData] = useState();

  // 모임 상세 조회
  useEffect(() => {
    getAPI(`${PARTIES_URL.DETAIL}/${partyId}`)
      .then(response => {
        if (response.status === 200) {
          setData(response.data.data);
        }
      })
      .catch(error => {
        console.log('API 요청 중 에러 발생', error);
      });
  }, [partyId]);

  // 모임 신청 / 취소
  const ApplicationButtonHandler = () => {
    postAPI(`${PARTIES_URL.PARTIES_APPLICATION}/${partyId}`).then(response => {
      window.location.replace(`/party/detail/${partyId}`);
      alert(response.data.msg);
    });
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

  // 모임 신청 , 수정 , 삭제 조건부 버튼 렌더링
  // toString 을 쓰지 않을 경우에 조건부 핸들에 에러가 생김
  const memberIdData = data?.memberInfo[0].memberId.toString();
  const userIdData = localStorage?.memberId.toString();

  console.log('data ::', data);

  return (
    <>
      <Background>
        <Container>
          <Contents>
            <PartyDetailImg>
              <img
                src={data?.imageUrl || SojuRoom}
                alt="partydetail"
                style={{
                  width: '100%',
                  height: '100%',
                }}
              />
            </PartyDetailImg>
            <ProfileBox>
              <Link to={`${MEMBER_URL.TARGET_PAGE_GET}/${memberIdData}`}>
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
              <MemberImgDiv>
                {data?.memberInfo.slice(1).map((member, i) => (
                  <div key={i}>
                    <img
                      src={member.profileImage}
                      alt="profile"
                      style={{
                        width: '30px',
                        height: '30px',
                        borderRadius: '100%',
                        marginLeft: '5px',
                      }}
                    />
                  </div>
                ))}
              </MemberImgDiv>
            </ProfileBox>
            <LineDiv></LineDiv>
            <PartyName>파티 제목 : {data?.title}</PartyName>
            <div>파티내용 : {data?.content}</div>
            <div>현재 인원 : {data?.currentCount} </div>
            <div>최대 인원 : {data?.totalCount}</div>
            <div>
              {data?.state === partyStatus.신청전
                ? ''
                : `승인 상태 : ${
                    data?.state === partyStatus.승인
                      ? '참여한 모임'
                      : data?.state === partyStatus.승인대기
                      ? '승인대기중인 모임'
                      : '거절된 모임'
                  }`}
            </div>
            <div>모집 상태 : {data?.recruitmentStatus === true ? '모집중' : '모집마감'}</div>
            <div>만든 날짜: {formmatedDate(data?.createdAt, 'MM.DD · a h:mm')}</div>
            <div>모임 시간: {formmatedDate(data?.partyDate, 'MM.DD · a h:mm')}</div>
            {(memberIdData === userIdData) === true ? (
              <>
                {memberIdData === userIdData && data?.recruitmentStatus === false ? (
                  ''
                ) : (
                  <button
                    onClick={() => {
                      updateParty(partyId);
                    }}
                  >
                    모임수정
                  </button>
                )}
                <button
                  onClick={() => {
                    deleteParty(partyId);
                  }}
                >
                  모임삭제
                </button>
              </>
            ) : data?.state === partyStatus.승인거절 || data?.recruitmentStatus === false ? (
              ''
            ) : (
              <button
                id="saveBtn"
                onClick={() => {
                  ApplicationButtonHandler();
                }}
              >
                {data?.state === partyStatus.신청전
                  ? '모임 신청'
                  : data?.state === partyStatus.승인 || data?.state === partyStatus.승인대기
                  ? '신청 취소'
                  : ''}
              </button>
            )}
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

const MemberImgDiv = styled.div`
  display: flex;
  align-items: center;
  width: 100px;
  height: 40px;
  border: 1px solid black;
  margin: auto;
`;

// 파티 관련 스타일

const PartyName = styled.div`
  font-size: 20px;
  font-weight: bold;
`;
