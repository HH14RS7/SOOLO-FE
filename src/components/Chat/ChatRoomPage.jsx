import { React, useEffect, useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';

// 이미지 파일
import LeftVector from '../../assets/LeftVector.svg';
import menu from '../../assets/icon.png';
import ProfileImg from '../../assets/karina.webp';
import SendIcon from '../../assets/sendIcon.svg';
import PartyHost from '../../assets/partyhost.svg';

import { Link } from 'react-router-dom';
import { PATH_URL } from '../../shared/constants';

export const ChatRoomPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
    setBackgroundPosition('static');
  };

  const openModal = () => {
    setIsModalOpen(true);
    setBackgroundPosition('fixed');
  };
  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  // 모달 기능
  //메뉴 모달
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);
  const [backgroundPosition, setBackgroundPosition] = useState('static');

  const ExitopenModal = () => {
    setIsExitModalOpen(true);
  };

  const ExitcloseModal = () => {
    setIsExitModalOpen(false);
  };

  const ReportButtonHandler = () => {
    alert('곧 업데이트 예정입니다!');
  };

  // 채팅방 입장시 안내 문구 기능
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // 페이지에 진입했을 때 모달을 띄우기 위한 타이머 설정
    const openTimer = setTimeout(() => {
      setShowModal(true);
    }, 0); // 5초 후에 모달을 엽니다.

    // 모달을 닫기 위한 타이머 설정
    const closeTimer = setTimeout(() => {
      setShowModal(false);
    }, 5000); // 5초 후에 모달을 닫습니다. (총 10초)

    // 컴포넌트가 언마운트되거나 업데이트되기 전에 타이머를 정리합니다.
    return () => {
      clearTimeout(openTimer);
      clearTimeout(closeTimer);
    };
  }, []);

  return (
    <>
      <Background
        style={{
          position: backgroundPosition,
        }}
      >
        <Container>
          <div
            style={{
              height: '100%',
            }}
          >
            <Topbar>
              <Link to={`${PATH_URL.PARTY_CHAT}/${localStorage.memberUniqueId}`}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '28px',
                  }}
                >
                  <img
                    src={LeftVector}
                    alt="back"
                    style={{
                      width: '8px',
                      height: '15px',
                      marginLeft: '16px',
                    }}
                  />
                </div>
              </Link>
              <TopbarName>모임이름</TopbarName>
              <ModalBtn
                onClick={() => {
                  openModal();
                }}
              >
                <img
                  src={menu}
                  alt="menu"
                  style={{
                    width: '24px',
                    height: '24px',
                    marginRight: '16px',
                  }}
                />
              </ModalBtn>
            </Topbar>
            <Contents>
              <ParticipantDiv>ㅇㅇㅇ님이 참여했습니다.</ParticipantDiv>
              <OtherDiv>
                <div
                  style={{
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      height: '85px',
                      width: '42px',
                      position: 'absolute',
                      bottom: 0,
                    }}
                  >
                    <OtherProfile>
                      <img
                        src={ProfileImg}
                        alt="profile"
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '8px',
                        }}
                      />
                    </OtherProfile>
                    <div
                      style={{
                        width: '18px',
                        height: '18px',
                        background: '#F63D68',
                        borderRadius: '20px',
                        position: 'absolute',
                        bottom: '25px',
                        left: '29px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <img
                        src={PartyHost}
                        alt="host"
                        style={{
                          width: '10px',
                          height: '10px',
                        }}
                      ></img>
                    </div>
                  </div>
                  <OthertInfo>
                    <OtherName>김피클</OtherName>
                    <OtherContents>
                      <OtherChatText>
                        hello!!!!hello!!!!hello!!!!hello!!!!hello!!!!hello!!!!hello!!!!hello!!!!hello!!!!hello!!!!hello!!!!hello!!!!
                      </OtherChatText>
                      <OtherChatTime>12:19 pm</OtherChatTime>
                    </OtherContents>
                  </OthertInfo>
                </div>
              </OtherDiv>
              <div
                style={{
                  height: '57px',
                  marginRight: '16px',
                  marginTop: '18px',
                }}
              >
                <MyChatDiv>
                  <MyChatTime>12:19 pm</MyChatTime>
                  <MyChatText>
                    반가워요~!반가워요~!반가워요~!반가워요~!반가워요~!반가워요~!반가워요~!반가워요~!반가워요~!반가워요~!
                  </MyChatText>
                </MyChatDiv>
              </div>
              {showModal && (
                <div
                  style={{
                    display: 'flex',
                    width: '100%',
                    height: '100%',
                  }}
                >
                  <NavigateModal>
                    <NavigateDiv>
                      <div
                        style={{
                          height: '30px',
                          width: '80%',
                          margin: 'auto',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'flex-end',
                        }}
                      >
                        <NavigateText>가이드라인 어쩌구 지키지 않으면 죽여버릴거야..</NavigateText>
                        <NavigateText>채팅할 때 조심하세요 안 그러면 찾아가요..</NavigateText>
                      </div>
                    </NavigateDiv>
                  </NavigateModal>
                </div>
              )}
              <SendContents>
                <SendDiv>
                  <input
                    placeholder="메시지를 입력하세요."
                    style={{
                      width: '277px',
                      height: '20px',
                      border: 'none',
                      marginLeft: '16px',
                    }}
                  ></input>
                  <ChatBtn>
                    <img
                      src={SendIcon}
                      alt="sendBtn"
                      style={{
                        width: '12px',
                        height: '12px',
                      }}
                    />
                  </ChatBtn>
                </SendDiv>
              </SendContents>
            </Contents>
          </div>
        </Container>
      </Background>
      {isModalOpen && (
        <div>
          <Modals onClick={handleBackdropClick}>
            <ModalContent>
              <ModalMenuBar>
                <div
                  style={{
                    marginTop: '20px',
                    display: 'inline-block',
                  }}
                >
                  채팅방 설정
                </div>
              </ModalMenuBar>
              <ModalChatExit
                onClick={() => {
                  ExitopenModal();
                }}
              >
                채팅방 나가기
              </ModalChatExit>
              <ModalReport
                onClick={() => {
                  ReportButtonHandler();
                }}
              >
                신고하기 <ComingSoon>업데이트 예정</ComingSoon>
              </ModalReport>
            </ModalContent>
          </Modals>
        </div>
      )}
      {isExitModalOpen && (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
          }}
        >
          <ExitModal>
            <ExitName>채팅방을 나가시겠습니까?</ExitName>
            <ExitText>한번 나간 채팅방은 다시 들어올 수 없습니다.</ExitText>
            <ExitBtnDiv>
              <ExitCancel
                onClick={() => {
                  ExitcloseModal();
                }}
              >
                머무르기
              </ExitCancel>
              <EixtBtn>나가기</EixtBtn>
            </ExitBtnDiv>
          </ExitModal>
        </div>
      )}
    </>
  );
};

const Background = styled.div`
  background: #ffffff;
  width: 100%;
  height: 95vh;
  padding-top: 50px;
`;

const Container = styled.div`
  width: 375px;
  height: 100%;
  background: #ffffff;
  margin: 0 auto;
`;

const Topbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 375px;
  height: 52px;
`;

const TopbarName = styled.div`
  color: #1d2939;
  font-size: 16px;
`;

const ModalBtn = styled.button`
  display: flex;
  align-items: center;
  width: 40px;
  height: 28px;
`;

const Contents = styled.div`
  width: 100%;
  height: 80vh;
  background: #e4e7ec;
  display: inline-block;
`;

const ParticipantDiv = styled.div`
  display: flex;
  width: 141px;
  height: 30px;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  background: #d0d5dd;
  border-radius: 20px;
  font-size: 10px;
  margin-top: 12px;
`;

const OtherDiv = styled.div`
  /* height: 57px; */
  margin-left: 16px;
  display: flex;
  margin-top: 18px;

  /* margin-bottom: 20px; */
  position: relative;
`;

const OtherProfile = styled.div`
  width: 40px;
  /* height: 40px; */
  display: flex;
  margin-top: 14px;
`;

const OthertInfo = styled.div`
  margin-left: 56px;
`;

const OtherName = styled.div`
  color: #667085;
  font-size: 10px;
  margin-bottom: 4px;
`;

const OtherContents = styled.div`
  display: flex;
`;

const OtherChatText = styled.div`
  /* width: 105px; */
  /* height: 40px; */
  max-width: 219px;
  line-height: 1.2;
  padding: 10px;
  font-size: 14px;
  /* display: flex; */
  /* align-items: center; */
  /* justify-content: center; */
  background: #f8f9fe;
  /* overflow-x: auto; */
  word-break: break-all;
  border-radius: 20px 20px 20px 0px;
`;

const OtherChatTime = styled.div`
  display: flex;
  justify-content: flex-end; /* 맨 아래로 정렬하도록 설정합니다 */
  margin-left: 4px;
  font-size: 10px;
  color: #667085;
  align-self: flex-end;
`;

// 내 채팅 스타일
const MyChatDiv = styled.div`
  /* width: 100%; */
  display: flex;
  float: right;
  /* float: right; */
  /* margin-right: 16px; */
`;

const MyChatTime = styled.div`
  display: flex;
  justify-content: flex-end; /* 맨 아래로 정렬하도록 설정합니다 */
  margin-left: 4px;
  font-size: 10px;
  color: #667085;
  align-self: flex-end;
  margin-right: 4px;
`;

const MyChatText = styled.div`
  max-width: 219px;
  font-size: 14px;
  line-height: 1.2;
  padding: 10px;
  align-items: center;
  justify-content: center;
  background: #f63d68;
  color: #fff;
  border-radius: 20px 20px 0px 20px;
`;

// 채팅창
const SendContents = styled.div`
  width: 375px;
  display: flex;
  background: #e4e7ec;
  overflow: hidden;
  position: fixed;
  bottom: 0;
  padding-bottom: 60px;
`;

const SendDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 343px;
  height: 48px;
  margin: 0 auto;
  border-radius: 20px;
  background-color: #fff;
`;

const ChatBtn = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 20px;
  background: #f63d68;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 6px;
`;

// 모달
const Modals = styled.div`
  position: fixed;
  overflow: hidden;
  /* top: 4.3vh; */
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: rgba(29, 41, 57, 0.5);
  /* margin: 0 auto; */
  /* width: 375px; */
  height: 100%;
`;

const ModalContent = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  text-align: center;
  background-color: white;
  width: 375px;
  height: 150px;
  border-radius: 16px 16px 0px 0px;
  margin: 0 auto;
  bottom: 49px;
`;

const ModalMenuBar = styled.div`
  height: 46px;
  font-size: 16px;
`;

const ModalChatExit = styled.button`
  display: flex;
  align-items: center;
  margin-left: 16px;
  font-size: 16px;
  width: 342px;
  height: 48px;
`;

const ModalReport = styled.button`
  display: flex;
  align-items: center;
  text-align: left;
  font-size: 16px;
  width: 342px;
  height: 48px;
  margin-left: 16px;
`;

const ComingSoon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-left: 10px;
  width: 79px;
  height: 22px;
  font-size: 10px;
  border-radius: 10px;
  background: #f2f4f7;
  color: #344054;
`;

const ExitModal = styled.div`
  text-align: center;
  margin: auto;
  z-index: 100;
  width: 343px;
  height: 206px;
  border-radius: 16px;
  background: white;
`;

const ExitName = styled.div`
  font-size: 16px;
  font-weight: 700;
  margin-top: 56px;
`;

const ExitText = styled.div`
  font-size: 14px;
  margin-top: 16px;
`;

const ExitBtnDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 32px;
`;

const ExitCancel = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  color: #667085;
  font-size: 12px;
  font-weight: 600;
  width: 144px;
  height: 48px;
  background: #fff;
  border: 1.5px solid #667085;
  border-radius: 12px;
`;

const EixtBtn = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  color: #fff;
  font-weight: 600;
  font-size: 12px;
  width: 144px;
  height: 48px;
  background: #f63d68;
  border-radius: 12px;
`;

const NavigateModal = styled.div`
  width: 343px;
  height: 70vh;
  display: flex;
  padding-bottom: 280px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const NavigateDiv = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 343px;
  height: 61px;
  background: #f9fafb;
  border-radius: 16px;
`;

const NavigateText = styled.div`
  font-size: 12px;
  color: #344054;
  margin-bottom: 5px;
`;
