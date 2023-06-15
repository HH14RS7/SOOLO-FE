// 기능 import
import { React, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PATH_URL } from '../shared/constants';
import { ChatApprove } from '../components/Chat/ChatApprove';
import { deleteAPI, postAPI } from '../api/api';
import * as StompJs from '@stomp/stompjs';
import styled from 'styled-components';
import SockJS from 'sockjs-client';
import Cookies from 'js-cookie';
import LoginModal from '../components/LoginModal';

// 이미지 import
import { ReactComponent as PeopleIcon } from '../assets/chating/membericon.svg';
import { ReactComponent as MenuIcon } from '../assets/chating/menuicons.svg';
import { ReactComponent as PartyDefaultImg } from '../assets/common/partydefaultimg.svg';
import { PARTIES_URL } from '../shared/constants';

export const ChatList = () => {
  const navigate = useNavigate();
  const [chatData, setChatData] = useState();
  const [activeTab, setActiveTab] = useState(true);
  const accesskey = Cookies.get('Access_key');
  const [zIndex, setZIndex] = useState(8);
  const [marzinLeft, setMarzinLeft] = useState(0);

  const [roomId, setRoomId] = useState();
  const [hostId, setHostId] = useState();

  const token = Cookies.get('Access_key');

  useEffect(() => {
    const client = new StompJs.Client({
      brokerURL: 'wss://im-soolo.shop/ws-stomp',
      connectHeaders: {
        Access_key: `Bearer ${accesskey}`,
      },
      debug: function (str) {
        console.log(str);
      },
      onConnect: () => {
        const subscription = client.subscribe(
          `/sub/chat/chatList/${localStorage.memberUniqueId}`,
          message => {
            console.log(`Received:: ${message.body}`);
            setChatData(JSON.parse(`${message.body}`));
          },
        );
        console.log('subscription :: ', subscription);
        client.publish({
          destination: `/pub/chat/chatList/${localStorage.memberUniqueId}`,
        });
      },
      // reconnectDelay: 5000, //자동 재 연결
      // heartbeatIncoming: 4000,
      // heartbeatOutgoing: 4000,
    });
    client.webSocketFactory = function () {
      return new SockJS('https://im-soolo.shop/ws-stomp');
    };

    client.activate();
    // connect(); // 웹소켓 연결 수행
    return () => {
      // disconnect(); // 컴포넌트 언마운트 시 웹소켓 연결 해제
    };
  }, []);
  console.log('chatData :: ', chatData);

  // 탭 UI
  const handleTabChange = tab => {
    setActiveTab(tab);
  };

  //메뉴 모달
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);
  const [backgroundPosition, setBackgroundPosition] = useState('static');

  const closeModal = () => {
    setIsModalOpen(false);
    setBackgroundPosition('static');
  };

  const openModal = (chatRoomId, host) => {
    setIsModalOpen(true);
    setBackgroundPosition('fixed');
    setRoomId(chatRoomId);
    setHostId(host);
  };

  console.log('roomId ::', roomId);
  console.log('hostId ::', hostId);
  console.log('localStorage.memberUniqueId ::', localStorage.memberUniqueId);

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const ExitopenModal = () => {
    setIsExitModalOpen(true);
  };

  const ExitcloseModal = () => {
    setIsExitModalOpen(false);
  };

  const ReportButtonHandler = () => {
    alert('곧 업데이트 예정입니다!');
  };

  // 나가기 버튼
  const ExitButtonHandler = () => {
    console.log('ExitButtonHandler - hostId :: ', hostId);
    console.log('ExitButtonHandler - roomId :: ', roomId);
    console.log('localStorage.memberUniqueId ::', localStorage.memberUniqueId);
    if (hostId === localStorage.memberUniqueId) {
      deleteAPI(`${PARTIES_URL.PARTIES_STATUS_CHANGE}/${roomId}`);
      alert('모임이 삭제되었습니다.');
      navigate(`${PATH_URL.MAIN}`);
    } else {
      postAPI(`${PARTIES_URL.PARTIES_APPLICATION}/${roomId}`);
      alert('모임이 취소되었습니다.');
      navigate(`${PATH_URL.MAIN}`);
    }
  };

  return (
    <>
      {!token ? (
        <LoginModal />
      ) : (
        <Background>
          <Container>
            <TapBar>
              <JoinTap
                onClick={() => {
                  handleTabChange(true);
                }}
              >
                참여중인 채팅방
              </JoinTap>
              <ApprovalTap
                onClick={() => {
                  handleTabChange(false);
                }}
              >
                들어온 승인요청
              </ApprovalTap>
            </TapBar>
            <ChatContainer>
              {activeTab === true ? (
                <>
                  {chatData?.data.map((data, index) => (
                    <ChatRoom key={index}>
                      <ChatRoomBox>
                        <ChatRoomImg>
                          {data?.imageUrl ? (
                            <img
                              src={data.imageUrl}
                              alt="chatprofile"
                              style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: '16px',
                              }}
                            />
                          ) : (
                            <PartyDefault />
                          )}
                        </ChatRoomImg>
                        <ChatRoomContainer>
                          <ChatRoomContents>
                            <Link
                              to={`${PATH_URL.PARTY_CHATROOM}?chatRoomUniqueId=${data.chatRoomUniqueId}&chatRoomId=${data.chatRoomId}&hostId=${data.host}`}
                            >
                              <ChatRoomInfo>
                                <ChatRoomName>{data.title}</ChatRoomName>
                                <ChatRoomContent>{data.lastMessage}</ChatRoomContent>
                              </ChatRoomInfo>
                            </Link>
                            <RoomMember>
                              <TotalMember>
                                <MemberIcon>
                                  <PeopleIcon />
                                </MemberIcon>
                                {data.currentCount}명 참여중
                              </TotalMember>
                              <MemberProfile>
                                {data.imageList.map((imgdata, index) => {
                                  const currentZIndex = zIndex - index;
                                  const marzinLefts = marzinLeft + index * 8;
                                  return (
                                    <img
                                      key={index}
                                      src={imgdata}
                                      alt="member1"
                                      style={{
                                        width: '18px',
                                        height: '18px',
                                        borderRadius: '15px',
                                        border: '1px solid #f63d68',
                                        borderradius: '100%',
                                        position: 'absolute',
                                        marginLeft: marzinLefts,
                                        zIndex: currentZIndex,
                                      }}
                                    />
                                  );
                                })}
                              </MemberProfile>
                            </RoomMember>
                          </ChatRoomContents>
                          <RightContents>
                            <ChatMessageNumber>
                              <MessageNumber>{data.readCount}</MessageNumber>
                            </ChatMessageNumber>
                            <ChatMenu
                              onClick={() => {
                                openModal(data.chatRoomId, data.host);
                              }}
                            >
                              <MenuIcon />
                            </ChatMenu>
                          </RightContents>
                        </ChatRoomContainer>
                      </ChatRoomBox>
                    </ChatRoom>
                  ))}
                </>
              ) : (
                <ChatApprove></ChatApprove>
              )}
            </ChatContainer>
          </Container>
        </Background>
      )}
      {isModalOpen && (
        <div>
          <Modals onClick={handleBackdropClick}>
            <ModalContent>
              <ModalMenuBar>채팅방 설정</ModalMenuBar>
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
        <ExitContainer>
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
              <EixtBtn
                onClick={() => {
                  ExitButtonHandler();
                }}
              >
                나가기
              </EixtBtn>
            </ExitBtnDiv>
          </ExitModal>
        </ExitContainer>
      )}
    </>
  );
};

// Default 스타일
const Background = styled.div`
  background: #ffffff;
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  width: 360px;
  margin: 0 auto;
  background: #ffffff;
`;

const PartyDefault = styled(PartyDefaultImg)`
  width: 100%;
  height: 100%;
  border-radius: 16px;
`;

// TopBar 스타일
const TapBar = styled.div`
  width: 360px;
  height: 52px;
  display: flex;
`;

const JoinTap = styled.button`
  width: 132px;
  height: 52px;
  margin-left: 16px;
`;

const ApprovalTap = styled.button`
  width: 132px;
  height: 52px;
`;

// Chat List 스타일
const ChatContainer = styled.div`
  width: 100%;
  height: 100%;
  padding-bottom: 70px;
`;

const ChatRoom = styled.div`
  display: flex;
  align-items: center;
  width: 360px;
  height: 94px;
  border-bottom: 1px solid #e4e7ec;
`;

const ChatRoomBox = styled.div`
  display: flex;
  align-items: center;
  width: 328px;
  gap: 16px;
  margin: 0 auto;
`;

const ChatRoomImg = styled.div`
  width: 70px;
  height: 70px;
`;

const ChatRoomContainer = styled.div`
  display: flex;
  width: 242px;
  height: 60px;
  justify-content: space-between;
`;

const ChatRoomContents = styled.div``;

const ChatRoomInfo = styled.div`
  margin-bottom: 10px;
`;

const ChatRoomName = styled.div`
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 4px;
`;

const ChatRoomContent = styled.div`
  font-size: 10px;
  font-weight: 400;
  color: #667085;
`;

const RoomMember = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;
`;

const TotalMember = styled.div`
  display: flex;
  align-items: center;
  font-size: 10px;
  margin-right: 10px;
`;

const MemberIcon = styled.div`
  margin-right: 4px;
`;

const MemberProfile = styled.div`
  display: flex;
  align-items: center;
`;

const MemberImgDiv = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 15px;
  border: 1px solid #f63d68;
  position: absolute;
`;

const RightContents = styled.div`
  width: 38px;
  height: 60px;
`;

const ChatMessageNumber = styled.div`
  display: flex;
  justify-content: center;
  padding: 4px 12px;
  width: 38px;
  height: 20px;
  background: #f63d68;
  border-radius: 20px;
`;

const MessageNumber = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 12px;
  margin-top: 1px;
  font-size: 12px;
  font-weight: 700;
  color: #fff;
`;

const ChatMenu = styled.div`
  width: 18px;
  height: 18px;
  margin-top: 22px;
  float: right;
  cursor: pointer;
`;

// 모달
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
  width: 360px;
  height: 196px;
  border-radius: 16px 16px 0px 0px;
  margin: 0 auto;
  bottom: 70px;
`;

const ModalMenuBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 52px;
  font-size: 16px;
  font-weight: 400;
`;

const ModalChatExit = styled.button`
  display: flex;
  align-items: center;
  padding: 16px;
  font-size: 16px;
  width: 330px;
  height: 48px;
`;

const ModalReport = styled.button`
  display: flex;
  align-items: center;
  text-align: left;
  font-size: 16px;
  width: 330px;
  height: 48px;
  padding: 16px;
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

// Exit Modal 스타일
const ExitContainer = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  position: fixed;
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
