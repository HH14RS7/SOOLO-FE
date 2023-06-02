import { React, useState } from 'react';
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
  };

  const openModal = () => {
    setIsModalOpen(true);
  };
  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <>
      <Background>
        <Container>
          <div>
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
                <OtherProfile>
                  <img
                    src={ProfileImg}
                    alt="profile"
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '8px',
                      marginTop: '14px',
                    }}
                  />
                </OtherProfile>
                <OthertInfo>
                  <OtherName>김피클</OtherName>
                  <OtherContents>
                    <OtherChatText>어서오세요!</OtherChatText>
                    <OtherChatTime>12:19 pm</OtherChatTime>
                  </OtherContents>
                </OthertInfo>
              </OtherDiv>
              <MyChatDiv>
                <MyChatTime>12:19 pm</MyChatTime>
                <MyChatText>반가워요~!</MyChatText>
              </MyChatDiv>
            </Contents>
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
              <ModalChatExit>채팅방 나가기</ModalChatExit>
              <ModalReport>신고하기</ModalReport>
            </ModalContent>
          </Modals>
        </div>
      )}
    </>
  );
};

const Background = styled.div`
  background: #c3c3c3;
  width: 100%;
  height: 100%;
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
  height: 100%;
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
  margin-left: 16px;
  display: flex;
  margin-top: 18px;
  margin-bottom: 20px;
`;

const OtherProfile = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
`;

const OthertInfo = styled.div`
  margin-left: 12px;
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
  padding: 10px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fe;
  overflow-x: auto;
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
  display: flex;
  float: right;
  margin-right: 16px;
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
  width: 105px;
  height: 40px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f63d68;
  color: #fff;
  border-radius: 20px 20px 0px 20px;
`;

// 채팅창
const SendContents = styled.div`
  display: flex;
  align-items: center;
  background: #e4e7ec;
  overflow: hidden;
  height: 76px;
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
  bottom: 52px;
`;

const ModalMenuBar = styled.div`
  height: 46px;
  font-size: 16px;
`;

const ModalChatExit = styled.button`
  text-align: left;
  font-size: 16px;
  width: 342px;
  height: 48px;
`;

const ModalReport = styled.button`
  text-align: left;
  font-size: 16px;
  width: 342px;
  height: 48px;
`;
