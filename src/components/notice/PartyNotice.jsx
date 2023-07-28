import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { noticeState } from '../../atoms';

// 이미지 import
import { ReactComponent as LeftBack } from '../assets/chating/leftBack.svg';
import { ReactComponent as Alarm } from '../assets/notice/alarm.svg';
import { ReactComponent as Close } from '../assets/notice/close.svg';
import { ReactComponent as NullAlram } from '../assets/notice/nullalram.svg';
import { ReactComponent as Email } from '../assets/notice/email.svg';
import { deleteAPI, getAPI, postAPI } from '../../api/api';

export const PartyNotice = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const [isExitModalOpen, setIsExitModalOpen] = useState(false);

  const setNotice = useSetRecoilState(noticeState);
  const NoticeData = useRecoilValue(noticeState);

  const [noticeNumber, setNoticeNumber] = useState();

  // 알림 읽음
  const AlramRead = useMutation(noticeId => postAPI(`/sse/read/${noticeId}`), {});

  // 알림 삭제
  const AlramDelete = useMutation(noticeId => deleteAPI(`/sse/notice/${noticeNumber}`), {
    onSuccess: response => {
      queryClient.invalidateQueries('requests');
      alert(response.data.msg);
    },
    onError: error => {
      alert(error.data.msg);
    },
  });

  const { data, isLoading, error } = useQuery('requests', () => getAPI('/sse/notice'));

  useEffect(() => {
    if (data) {
      setNotice(data?.data?.data?.absenceNoticeDtoList);
    }
  }, [data]);

  if (isLoading) {
    return <div>로딩중입니다.</div>;
  }

  if (error) {
    return <div>Error : {error.message}</div>;
  }

  const DeleteButtonHandler = (event, noticeId) => {
    event.stopPropagation();
    setIsExitModalOpen(true);
    setNoticeNumber(noticeId);
  };

  const ExitcloseModal = () => {
    setIsExitModalOpen(false);
  };

  const DeleteAlram = noticeId => {
    AlramDelete.mutate(noticeId);
    setIsExitModalOpen(false);
  };

  const AlramReadHandler = noticeId => {
    AlramRead.mutate(noticeId);
  };

  return (
    <>
      <Background>
        <Contents>
          <Container>
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
              <TopbarName>알림</TopbarName>
            </Topbar>
            {NoticeData?.length > 0 ? (
              NoticeData?.map((notice, i) => {
                if (notice.noticeCode === 2 && notice.accepted) {
                  return (
                    <NoticeContainer
                      key={i}
                      onClick={() => {
                        AlramReadHandler(notice.noticeId);
                        navigate('/mypage/party/request');
                      }}
                    >
                      <ImgDiv>
                        <Alarm />
                      </ImgDiv>
                      <NoticeContents>
                        <NoticeName>
                          <NoticeOverName>{notice.partyTitle}</NoticeOverName> 모임이
                          <ApprovalStatus>승인</ApprovalStatus> 되었습니다.
                        </NoticeName>
                        <NoticeText>
                          승인 된 모임은 마이페이지 속 내가 신청한 모임 내에서 확인 가능합니다.
                        </NoticeText>
                        <NoticeTime>00시간 전</NoticeTime>
                      </NoticeContents>
                      <DeleteDiv>
                        <Close
                          style={{
                            cursor: 'pointer',
                          }}
                          onClick={event => {
                            DeleteButtonHandler(event, notice.noticeId);
                          }}
                        />
                      </DeleteDiv>
                    </NoticeContainer>
                  );
                }

                if (notice.noticeCode === 2 && !notice.accepted) {
                  return (
                    <NoticeContainer
                      key={i}
                      onClick={() => {
                        AlramReadHandler(notice.noticeId);
                        navigate('/mypage/party/request');
                      }}
                    >
                      <ImgDiv>
                        <Alarm />
                      </ImgDiv>
                      <NoticeContents>
                        <NoticeName>
                          <NoticeOverName>{notice.partyTitle}</NoticeOverName> 모임이
                          <RefusalStatus>거절</RefusalStatus> 되었습니다.
                        </NoticeName>
                        <NoticeText>
                          거절 된 모임은 마이페이지 속 내가 신청한 모임 내에서 확인 가능합니다.
                        </NoticeText>
                        <NoticeTime>00시간 전</NoticeTime>
                      </NoticeContents>
                      <DeleteDiv>
                        <Close
                          style={{
                            cursor: 'pointer',
                          }}
                          onClick={event => {
                            DeleteButtonHandler(event, notice.noticeId);
                          }}
                        />
                      </DeleteDiv>
                    </NoticeContainer>
                  );
                }

                if (notice.noticeCode === 1 && notice.participateIs) {
                  return (
                    <HostContainer
                      key={i}
                      style={{
                        cursor: 'pointer',
                      }}
                      onClick={() => {
                        AlramReadHandler(notice.noticeId);
                        navigate('/party/request/approve');
                      }}
                    >
                      <ImgDiv>
                        <Email />
                      </ImgDiv>
                      <HostContents>
                        <HostDiv>
                          <HostImgDiv>
                            <img
                              src={notice.imgUrl}
                              alt="memberimg"
                              style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: '8px',
                              }}
                            />
                          </HostImgDiv>
                          <HostText>
                            <BoldText>{notice.participantName}</BoldText>님이 '
                            <BoldPartyName>{notice.partyTitle}</BoldPartyName>' 모임에 참여하기를
                            원합니다
                          </HostText>
                        </HostDiv>
                        <HostTimeText>00분 전</HostTimeText>
                      </HostContents>
                      <DeleteDiv>
                        <Close
                          style={{
                            cursor: 'pointer',
                          }}
                          onClick={event => {
                            DeleteButtonHandler(event, notice.noticeId);
                          }}
                        />
                      </DeleteDiv>
                    </HostContainer>
                  );
                }

                if (notice.noticeCode === 1 && !notice.participateIs) {
                  return (
                    <HostContainer
                      key={i}
                      onClick={() => {
                        AlramReadHandler(notice.noticeId);
                      }}
                    >
                      <ImgDiv>
                        <Email />
                      </ImgDiv>
                      <HostContents>
                        <HostDiv>
                          <HostImgDiv>
                            <img
                              src={notice.imgUrl}
                              alt="memberimg"
                              style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: '8px',
                              }}
                            />
                          </HostImgDiv>
                          <HostText>
                            <BoldText>{notice.participantName}</BoldText>님이 '
                            <BoldPartyName>{notice.partyTitle}</BoldPartyName>' 모임에 참여를
                            취소했습니다
                          </HostText>
                        </HostDiv>
                        <HostTimeText>00분 전</HostTimeText>
                      </HostContents>
                      <DeleteDiv>
                        <Close
                          style={{
                            cursor: 'pointer',
                          }}
                          onClick={event => {
                            DeleteButtonHandler(event, notice.noticeId);
                          }}
                        />
                      </DeleteDiv>
                    </HostContainer>
                  );
                }
                return null;
              })
            ) : (
              <NoRequestContents>
                <NoRequestDiv>
                  <NullAlram
                    style={{
                      margin: '0 auto',
                      width: '48px',
                      height: '48px',
                    }}
                  />
                  <NoRequestText>들어온 승인요청이 없습니다.</NoRequestText>
                </NoRequestDiv>
              </NoRequestContents>
            )}
          </Container>
        </Contents>
      </Background>
      {isExitModalOpen && (
        <div
          style={{
            width: '100vw',
            height: '100vh',
            background: 'none',
            position: 'fixed',
            top: 0,
            zIndex: 13,
          }}
        >
          <Modals>
            <ExitContainer>
              <ExitModal>
                <ExitName>선택하신 알림을 삭제하시겠습니까?</ExitName>
                <ExitText>삭제한 알림은 목록에서 지워집니다.</ExitText>
                <ExitBtnDiv>
                  <ExitCancel
                    onClick={() => {
                      ExitcloseModal();
                    }}
                  >
                    취소
                  </ExitCancel>
                  <EixtBtn
                    onClick={() => {
                      DeleteAlram();
                    }}
                  >
                    삭제하기
                  </EixtBtn>
                </ExitBtnDiv>
              </ExitModal>
            </ExitContainer>
          </Modals>
        </div>
      )}
    </>
  );
};

// 기본 스타일
const Background = styled.div`
  width: 100%;
  height: 100%;
`;

const Contents = styled.div`
  height: 100%;
  width: 360px;
  margin: 0 auto;
  background: #f9fafb;
`;

const Container = styled.div`
  width: 360px;
  padding-bottom: 70px;
`;

// TopBar 스타일
const Topbar = styled.div`
  display: flex;
  top: 0;
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

// 알림 박스 스타일
const NoticeContainer = styled.div`
  display: flex;
  position: relative;
  width: 360px;
  height: 116px;
  padding: 16px;
  gap: 8px;
  background: #fff;
  border-bottom: 1px solid #e4e7ec;
  cursor: pointer;
`;

const ImgDiv = styled.div`
  width: 16px;
  height: 16px;
`;

const NoticeContents = styled.div`
  max-width: 304px;
  height: 84px;
`;

const NoticeName = styled.div`
  display: flex;
  max-width: 300px;
  font-size: 14px;
  align-items: center;
  gap: 2px;
  margin-bottom: 8px;
`;

const NoticeOverName = styled.div`
  font-weight: 700;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: break-all;
`;

const ApprovalStatus = styled.div`
  width: 37px;
  height: 16px;
  padding: 2px 8px;
  background: #12b76a;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  color: #fff;
`;

const RefusalStatus = styled.div`
  width: 37px;
  height: 16px;
  padding: 2px 8px;
  background: #f04438;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  color: #fff;
`;

const NoticeText = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #1d2939;
  max-width: 258px;
  line-height: 18px;
`;

const NoticeTime = styled.div`
  font-size: 10px;
  font-weight: 400;
  margin-top: 16px;
  color: #667085;
`;

// 시간 알림 스타일
const TimeContainer = styled.div`
  display: flex;
  width: 360px;
  height: 94px;
  padding: 16px;
  gap: 8px;
  background: #fff;
  border-bottom: 1px solid #e4e7ec;
`;

const RemainingTime = styled.div`
  color: #f63d68;
  font-weight: 700;
`;

const TimeContents = styled.div`
  width: 300px;
  height: 62px;
  gap: 16px;
`;

// 호스트 알림 스타일
const HostContainer = styled.div`
  display: flex;
  position: relative;
  width: 360px;
  height: 100px;
  padding: 16px;
  /* gap: 8px; */
  background: #fff;
  border-bottom: 1px solid #e4e7ec;
`;

const HostContents = styled.div`
  width: 304px;
  height: 68px;
  margin-left: 8px;
`;

const HostDiv = styled.div`
  /* width: 305px; */
  height: 42px;
  display: flex;
  gap: 16px;
`;

const HostImgDiv = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 8px;
`;

const HostText = styled.div`
  /* display: flex; */
  max-width: 200px;
  font-size: 14px;
  gap: 2px;
  line-height: 18px;
`;

const HostTimeText = styled.div`
  font-size: 10px;
  font-weight: 400;
  margin-top: 16px;
  color: #667085;
`;

const HostTexts = styled.div`
  position: absolute;
  margin-top: 25px;
  margin-left: 59px;
  font-size: 14px;
`;

const BoldPartyName = styled.span`
  font-weight: bold;
  margin-left: 2px;
  margin-right: 2px;
`;

const BoldText = styled.span`
  font-weight: bold;
  margin-right: 2px;
`;

const DeleteDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  position: absolute;
  right: 0px;
  top: 0px;
`;

//모달

const Modals = styled.div`
  position: fixed;
  overflow: hidden;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: rgba(29, 41, 57, 0.5);
  height: 100%;
  z-index: 11;
`;

const ExitContainer = styled.div`
  width: 100%;
  /* height: 100%; */
  top: 32vh;
  /* display: inline-flex; */
  display: flex;
  position: absolute;
`;

const ExitModal = styled.div`
  text-align: center;
  margin: auto;
  z-index: 100;
  width: 327px;
  height: 198px;
  border-radius: 16px;
  background: #fff;
`;

const ExitName = styled.div`
  font-size: 16px;
  font-weight: 700;
  margin-top: 60px;
`;

const ExitText = styled.div`
  font-size: 14px;
  margin-top: 8px;
`;

const ExitBtnDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 36px;
`;

const ExitCancel = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  color: #667085;
  font-size: 12px;
  font-weight: 600;
  width: 140px;
  height: 48px;
  background: #fff;
  border: 1.5px solid #667085;
  border-radius: 12px;
  cursor: pointer;
`;

const EixtBtn = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  color: #fff;
  font-weight: 600;
  font-size: 12px;
  width: 140px;
  height: 48px;
  background: #f63d68;
  border-radius: 12px;
  cursor: pointer;
`;

// 승인 요청 없을 때 Div
const NoRequestContents = styled.div`
  width: 360px;
  height: 87vh;
  background: #f2f4f7;
  display: flex;
  align-items: center;
`;

const NoRequestDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-content: center;
  text-align: center;
  width: 360px;
  height: 70px;
`;

const NoRequestText = styled.div`
  width: 360px;
  margin-top: 8px;
`;
