import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SockJS from 'sockjs-client';
import SojuRoom from '../assets/sojuroomimg.webp';
import Preperty from '../assets/chating/Property.png';
import MenuBar from '../assets/icon.png';
import Profile from '../assets/karina.webp';
import * as StompJs from '@stomp/stompjs';
import { Link } from 'react-router-dom';
import { PATH_URL } from '../shared/constants';
import Cookies from 'js-cookie';

export const ChatList = () => {
  const [chatDate, setChatDate] = useState();
  const [activeTab, setActiveTab] = useState(true);

  const accesskey = Cookies.get('Access_key');

  useEffect(() => {
    const client = new StompJs.Client({
      brokerURL: 'ws://222.102.175.141:8081/ws-stomp',
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
            setChatDate(JSON.parse(`${message.body}`));
          },
        );
        console.log('subscription :: ', subscription);
        client.publish({
          destination: `/pub/chat/chatList/${localStorage.memberUniqueId}`,
          body: 'First Message',
        });
      },
      // reconnectDelay: 5000, //자동 재 연결
      // heartbeatIncoming: 4000,
      // heartbeatOutgoing: 4000,
    });
    client.webSocketFactory = function () {
      return new SockJS('http://222.102.175.141:8081/ws-stomp');
    };
    // client.onConnect = function (frame) {};
    // client.onStompError = function (frame) {
    //   console.log('Broker reported error: ' + frame.headers['message']);
    //   console.log('Additional details: ' + frame.body);
    // };
    client.activate();
    // connect(); // 웹소켓 연결 수행
    return () => {
      // disconnect(); // 컴포넌트 언마운트 시 웹소켓 연결 해제
    };
  }, []);
  console.log('chatDate :: ', chatDate);

  // 다 오류뜸 이상
  // const [messageInput, setMessageInput] = useState('');
  // const handleSendMessage = () => {
  //   sendMessage(messageInput); // 메시지 전송
  //   setMessageInput(''); // 입력 필드 초기화
  // };
  // const handleInputChange = e => {
  //   setMessageInput(e.target.value);
  // };
  // useEffect(() => {
  //   const handleReceivedMessage = message => {
  //     console.log('Received message:', message);
  //     // 수신한 메시지 처리
  //   };
  //   subscribe(handleReceivedMessage); // 메시지 수신
  // }, []);

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

  const openModal = () => {
    setIsModalOpen(true);
    setBackgroundPosition('fixed');
  };
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

  return (
    <>
      <Background
        style={{
          position: backgroundPosition,
        }}
      >
        <Container>
          <TapBar>
            <button
              onClick={() => {
                handleTabChange(true);
              }}
              style={{
                width: '132px',
                height: '48px',
                borderBottom: activeTab === true ? '1px solid #F63D68' : 'none',
              }}
            >
              참여중인 채팅방
            </button>
            <button
              onClick={() => {
                handleTabChange(false);
              }}
              style={{
                width: '132px',
                height: '48px',
                borderBottom: activeTab === false ? '1px solid #F63D68' : 'none',
              }}
            >
              들어온 승인요청
            </button>
          </TapBar>
          <ChatContainer>
            {activeTab === true ? (
              <>
                <ChatRoom>
                  <ChatRoomBox>
                    <ChatRoomImg>
                      <img
                        src={SojuRoom}
                        alt="chatprofile"
                        style={{
                          width: '100%',
                          height: '100%',
                          borderRadius: '16px',
                        }}
                      />
                    </ChatRoomImg>
                    <div
                      style={{
                        display: 'flex',
                        width: '230px',
                        height: '60px',
                      }}
                    >
                      <ChatRoomContents>
                        <Link to={`${PATH_URL.PARTY_CHATROOM}/${localStorage.memberUniqueId}`}>
                          <ChatRoomInfo>
                            <ChatRoomName>모임 이름</ChatRoomName>
                            <ChatRoomContent>최신 대화 내용</ChatRoomContent>
                          </ChatRoomInfo>
                        </Link>
                        <RoomMember>
                          <TotalMember>
                            <div
                              style={{
                                marginRight: '6px',
                              }}
                            >
                              <img
                                src={Preperty}
                                alt="profiles"
                                style={{
                                  width: '14px',
                                  height: '14px',
                                }}
                              />
                            </div>
                            5명 참여중
                          </TotalMember>
                          <MemberProfile>
                            <img
                              src={Profile}
                              alt="chatprofile"
                              style={{
                                width: '18px',
                                height: '18px',
                                borderRadius: '15px',
                                border: '1px solid #f63d68',
                                borderradius: '100%',
                                position: 'absolute',
                                // zIndex: 2,
                              }}
                            />
                            <img
                              src={Profile}
                              alt="chatprofile"
                              style={{
                                width: '18px',
                                height: '18px',
                                borderRadius: '15px',
                                border: '1px solid #f63d68',
                                borderradius: '100%',
                                position: 'absolute',
                                marginLeft: '8px',
                                // zIndex: 1,
                              }}
                            />
                            <img
                              src={Profile}
                              alt="chatprofile"
                              style={{
                                width: '18px',
                                height: '18px',
                                borderRadius: '15px',
                                border: '1px solid #f63d68',
                                borderradius: '100%',
                                position: 'absolute',
                                marginLeft: '16px',
                                // zIndex: 0,
                              }}
                            />
                          </MemberProfile>
                        </RoomMember>
                      </ChatRoomContents>
                    </div>
                    <RightContents>
                      <ChatMessageNumber>
                        <MessageNumber>12</MessageNumber>
                      </ChatMessageNumber>
                      <ChatMenu
                        onClick={() => {
                          openModal();
                        }}
                      >
                        <img
                          src={MenuBar}
                          alt="menu"
                          style={{
                            width: '100%',
                            height: '100%',
                          }}
                        />
                      </ChatMenu>
                    </RightContents>
                  </ChatRoomBox>
                </ChatRoom>
                <ChatRoom>
                  <ChatRoomBox>
                    <ChatRoomImg>
                      <img
                        src={SojuRoom}
                        alt="chatprofile"
                        style={{
                          width: '100%',
                          height: '100%',
                          borderRadius: '16px',
                        }}
                      />
                    </ChatRoomImg>
                    <div
                      style={{
                        display: 'flex',
                        width: '230px',
                        height: '60px',
                      }}
                    >
                      <ChatRoomContents>
                        <Link to={`${PATH_URL.PARTY_CHATROOM}/${localStorage.memberUniqueId}`}>
                          <ChatRoomInfo>
                            <ChatRoomName>모임 이름</ChatRoomName>
                            <ChatRoomContent>최신 대화 내용</ChatRoomContent>
                          </ChatRoomInfo>
                        </Link>
                        <RoomMember>
                          <TotalMember>
                            <div
                              style={{
                                marginRight: '6px',
                              }}
                            >
                              <img
                                src={Preperty}
                                alt="profiles"
                                style={{
                                  width: '14px',
                                  height: '14px',
                                }}
                              />
                            </div>
                            5명 참여중
                          </TotalMember>
                          <MemberProfile>
                            <img
                              src={Profile}
                              alt="chatprofile"
                              style={{
                                width: '18px',
                                height: '18px',
                                borderRadius: '15px',
                                border: '1px solid #f63d68',
                                borderradius: '100%',
                                position: 'absolute',
                                // zIndex: 2,
                              }}
                            />
                            <img
                              src={Profile}
                              alt="chatprofile"
                              style={{
                                width: '18px',
                                height: '18px',
                                borderRadius: '15px',
                                border: '1px solid #f63d68',
                                borderradius: '100%',
                                position: 'absolute',
                                marginLeft: '8px',
                                // zIndex: 1,
                              }}
                            />
                            <img
                              src={Profile}
                              alt="chatprofile"
                              style={{
                                width: '18px',
                                height: '18px',
                                borderRadius: '15px',
                                border: '1px solid #f63d68',
                                borderradius: '100%',
                                position: 'absolute',
                                marginLeft: '16px',
                                // zIndex: 0,
                              }}
                            />
                          </MemberProfile>
                        </RoomMember>
                      </ChatRoomContents>
                    </div>
                    <RightContents>
                      <ChatMessageNumber>
                        <MessageNumber>12</MessageNumber>
                      </ChatMessageNumber>
                      <ChatMenu
                        onClick={() => {
                          openModal();
                        }}
                      >
                        <img
                          src={MenuBar}
                          alt="menu"
                          style={{
                            width: '100%',
                            height: '100%',
                          }}
                        />
                      </ChatMenu>
                    </RightContents>
                  </ChatRoomBox>
                </ChatRoom>
                <ChatRoom>
                  <ChatRoomBox>
                    <ChatRoomImg>
                      <img
                        src={SojuRoom}
                        alt="chatprofile"
                        style={{
                          width: '100%',
                          height: '100%',
                          borderRadius: '16px',
                        }}
                      />
                    </ChatRoomImg>
                    <div
                      style={{
                        display: 'flex',
                        width: '230px',
                        height: '60px',
                      }}
                    >
                      <ChatRoomContents>
                        <Link to={`${PATH_URL.PARTY_CHATROOM}/${localStorage.memberUniqueId}`}>
                          <ChatRoomInfo>
                            <ChatRoomName>모임 이름</ChatRoomName>
                            <ChatRoomContent>최신 대화 내용</ChatRoomContent>
                          </ChatRoomInfo>
                        </Link>
                        <RoomMember>
                          <TotalMember>
                            <div
                              style={{
                                marginRight: '6px',
                              }}
                            >
                              <img
                                src={Preperty}
                                alt="profiles"
                                style={{
                                  width: '14px',
                                  height: '14px',
                                }}
                              />
                            </div>
                            5명 참여중
                          </TotalMember>
                          <MemberProfile>
                            <img
                              src={Profile}
                              alt="chatprofile"
                              style={{
                                width: '18px',
                                height: '18px',
                                borderRadius: '15px',
                                border: '1px solid #f63d68',
                                borderradius: '100%',
                                position: 'absolute',
                                // zIndex: 2,
                              }}
                            />
                            <img
                              src={Profile}
                              alt="chatprofile"
                              style={{
                                width: '18px',
                                height: '18px',
                                borderRadius: '15px',
                                border: '1px solid #f63d68',
                                borderradius: '100%',
                                position: 'absolute',
                                marginLeft: '8px',
                                // zIndex: 1,
                              }}
                            />
                            <img
                              src={Profile}
                              alt="chatprofile"
                              style={{
                                width: '18px',
                                height: '18px',
                                borderRadius: '15px',
                                border: '1px solid #f63d68',
                                borderradius: '100%',
                                position: 'absolute',
                                marginLeft: '16px',
                                // zIndex: 0,
                              }}
                            />
                          </MemberProfile>
                        </RoomMember>
                      </ChatRoomContents>
                    </div>
                    <RightContents>
                      <ChatMessageNumber>
                        <MessageNumber>12</MessageNumber>
                      </ChatMessageNumber>
                      <ChatMenu
                        onClick={() => {
                          openModal();
                        }}
                      >
                        <img
                          src={MenuBar}
                          alt="menu"
                          style={{
                            width: '100%',
                            height: '100%',
                          }}
                        />
                      </ChatMenu>
                    </RightContents>
                  </ChatRoomBox>
                </ChatRoom>
                <ChatRoom>
                  <ChatRoomBox>
                    <ChatRoomImg>
                      <img
                        src={SojuRoom}
                        alt="chatprofile"
                        style={{
                          width: '100%',
                          height: '100%',
                          borderRadius: '16px',
                        }}
                      />
                    </ChatRoomImg>
                    <div
                      style={{
                        display: 'flex',
                        width: '230px',
                        height: '60px',
                      }}
                    >
                      <ChatRoomContents>
                        <Link to={`${PATH_URL.PARTY_CHATROOM}/${localStorage.memberUniqueId}`}>
                          <ChatRoomInfo>
                            <ChatRoomName>모임 이름</ChatRoomName>
                            <ChatRoomContent>최신 대화 내용</ChatRoomContent>
                          </ChatRoomInfo>
                        </Link>
                        <RoomMember>
                          <TotalMember>
                            <div
                              style={{
                                marginRight: '6px',
                              }}
                            >
                              <img
                                src={Preperty}
                                alt="profiles"
                                style={{
                                  width: '14px',
                                  height: '14px',
                                }}
                              />
                            </div>
                            5명 참여중
                          </TotalMember>
                          <MemberProfile>
                            <img
                              src={Profile}
                              alt="chatprofile"
                              style={{
                                width: '18px',
                                height: '18px',
                                borderRadius: '15px',
                                border: '1px solid #f63d68',
                                borderradius: '100%',
                                position: 'absolute',
                                // zIndex: 2,
                              }}
                            />
                            <img
                              src={Profile}
                              alt="chatprofile"
                              style={{
                                width: '18px',
                                height: '18px',
                                borderRadius: '15px',
                                border: '1px solid #f63d68',
                                borderradius: '100%',
                                position: 'absolute',
                                marginLeft: '8px',
                                // zIndex: 1,
                              }}
                            />
                            <img
                              src={Profile}
                              alt="chatprofile"
                              style={{
                                width: '18px',
                                height: '18px',
                                borderRadius: '15px',
                                border: '1px solid #f63d68',
                                borderradius: '100%',
                                position: 'absolute',
                                marginLeft: '16px',
                                // zIndex: 0,
                              }}
                            />
                          </MemberProfile>
                        </RoomMember>
                      </ChatRoomContents>
                    </div>
                    <RightContents>
                      <ChatMessageNumber>
                        <MessageNumber>12</MessageNumber>
                      </ChatMessageNumber>
                      <ChatMenu
                        onClick={() => {
                          openModal();
                        }}
                      >
                        <img
                          src={MenuBar}
                          alt="menu"
                          style={{
                            width: '100%',
                            height: '100%',
                          }}
                        />
                      </ChatMenu>
                    </RightContents>
                  </ChatRoomBox>
                </ChatRoom>
                <ChatRoom>
                  <ChatRoomBox>
                    <ChatRoomImg>
                      <img
                        src={SojuRoom}
                        alt="chatprofile"
                        style={{
                          width: '100%',
                          height: '100%',
                          borderRadius: '16px',
                        }}
                      />
                    </ChatRoomImg>
                    <div
                      style={{
                        display: 'flex',
                        width: '230px',
                        height: '60px',
                      }}
                    >
                      <ChatRoomContents>
                        <Link to={`${PATH_URL.PARTY_CHATROOM}/${localStorage.memberUniqueId}`}>
                          <ChatRoomInfo>
                            <ChatRoomName>모임 이름</ChatRoomName>
                            <ChatRoomContent>최신 대화 내용</ChatRoomContent>
                          </ChatRoomInfo>
                        </Link>
                        <RoomMember>
                          <TotalMember>
                            <div
                              style={{
                                marginRight: '6px',
                              }}
                            >
                              <img
                                src={Preperty}
                                alt="profiles"
                                style={{
                                  width: '14px',
                                  height: '14px',
                                }}
                              />
                            </div>
                            5명 참여중
                          </TotalMember>
                          <MemberProfile>
                            <img
                              src={Profile}
                              alt="chatprofile"
                              style={{
                                width: '18px',
                                height: '18px',
                                borderRadius: '15px',
                                border: '1px solid #f63d68',
                                borderradius: '100%',
                                position: 'absolute',
                                // zIndex: 2,
                              }}
                            />
                            <img
                              src={Profile}
                              alt="chatprofile"
                              style={{
                                width: '18px',
                                height: '18px',
                                borderRadius: '15px',
                                border: '1px solid #f63d68',
                                borderradius: '100%',
                                position: 'absolute',
                                marginLeft: '8px',
                                // zIndex: 1,
                              }}
                            />
                            <img
                              src={Profile}
                              alt="chatprofile"
                              style={{
                                width: '18px',
                                height: '18px',
                                borderRadius: '15px',
                                border: '1px solid #f63d68',
                                borderradius: '100%',
                                position: 'absolute',
                                marginLeft: '16px',
                                // zIndex: 0,
                              }}
                            />
                          </MemberProfile>
                        </RoomMember>
                      </ChatRoomContents>
                    </div>
                    <RightContents>
                      <ChatMessageNumber>
                        <MessageNumber>12</MessageNumber>
                      </ChatMessageNumber>
                      <ChatMenu
                        onClick={() => {
                          openModal();
                        }}
                      >
                        <img
                          src={MenuBar}
                          alt="menu"
                          style={{
                            width: '100%',
                            height: '100%',
                          }}
                        />
                      </ChatMenu>
                    </RightContents>
                  </ChatRoomBox>
                </ChatRoom>
                <ChatRoom>
                  <ChatRoomBox>
                    <ChatRoomImg>
                      <img
                        src={SojuRoom}
                        alt="chatprofile"
                        style={{
                          width: '100%',
                          height: '100%',
                          borderRadius: '16px',
                        }}
                      />
                    </ChatRoomImg>
                    <div
                      style={{
                        display: 'flex',
                        width: '230px',
                        height: '60px',
                      }}
                    >
                      <ChatRoomContents>
                        <Link to={`${PATH_URL.PARTY_CHATROOM}/${localStorage.memberUniqueId}`}>
                          <ChatRoomInfo>
                            <ChatRoomName>모임 이름</ChatRoomName>
                            <ChatRoomContent>최신 대화 내용</ChatRoomContent>
                          </ChatRoomInfo>
                        </Link>
                        <RoomMember>
                          <TotalMember>
                            <div
                              style={{
                                marginRight: '6px',
                              }}
                            >
                              <img
                                src={Preperty}
                                alt="profiles"
                                style={{
                                  width: '14px',
                                  height: '14px',
                                }}
                              />
                            </div>
                            5명 참여중
                          </TotalMember>
                          <MemberProfile>
                            <img
                              src={Profile}
                              alt="chatprofile"
                              style={{
                                width: '18px',
                                height: '18px',
                                borderRadius: '15px',
                                border: '1px solid #f63d68',
                                borderradius: '100%',
                                position: 'absolute',
                                // zIndex: 2,
                              }}
                            />
                            <img
                              src={Profile}
                              alt="chatprofile"
                              style={{
                                width: '18px',
                                height: '18px',
                                borderRadius: '15px',
                                border: '1px solid #f63d68',
                                borderradius: '100%',
                                position: 'absolute',
                                marginLeft: '8px',
                                // zIndex: 1,
                              }}
                            />
                            <img
                              src={Profile}
                              alt="chatprofile"
                              style={{
                                width: '18px',
                                height: '18px',
                                borderRadius: '15px',
                                border: '1px solid #f63d68',
                                borderradius: '100%',
                                position: 'absolute',
                                marginLeft: '16px',
                                // zIndex: 0,
                              }}
                            />
                          </MemberProfile>
                        </RoomMember>
                      </ChatRoomContents>
                    </div>
                    <RightContents>
                      <ChatMessageNumber>
                        <MessageNumber>12</MessageNumber>
                      </ChatMessageNumber>
                      <ChatMenu
                        onClick={() => {
                          openModal();
                        }}
                      >
                        <img
                          src={MenuBar}
                          alt="menu"
                          style={{
                            width: '100%',
                            height: '100%',
                          }}
                        />
                      </ChatMenu>
                    </RightContents>
                  </ChatRoomBox>
                </ChatRoom>
                <ChatRoom>
                  <ChatRoomBox>
                    <ChatRoomImg>
                      <img
                        src={SojuRoom}
                        alt="chatprofile"
                        style={{
                          width: '100%',
                          height: '100%',
                          borderRadius: '16px',
                        }}
                      />
                    </ChatRoomImg>
                    <div
                      style={{
                        display: 'flex',
                        width: '230px',
                        height: '60px',
                      }}
                    >
                      <ChatRoomContents>
                        <Link to={`${PATH_URL.PARTY_CHATROOM}/${localStorage.memberUniqueId}`}>
                          <ChatRoomInfo>
                            <ChatRoomName>모임 이름</ChatRoomName>
                            <ChatRoomContent>최신 대화 내용</ChatRoomContent>
                          </ChatRoomInfo>
                        </Link>
                        <RoomMember>
                          <TotalMember>
                            <div
                              style={{
                                marginRight: '6px',
                              }}
                            >
                              <img
                                src={Preperty}
                                alt="profiles"
                                style={{
                                  width: '14px',
                                  height: '14px',
                                }}
                              />
                            </div>
                            5명 참여중
                          </TotalMember>
                          <MemberProfile>
                            <img
                              src={Profile}
                              alt="chatprofile"
                              style={{
                                width: '18px',
                                height: '18px',
                                borderRadius: '15px',
                                border: '1px solid #f63d68',
                                borderradius: '100%',
                                position: 'absolute',
                                // zIndex: 2,
                              }}
                            />
                            <img
                              src={Profile}
                              alt="chatprofile"
                              style={{
                                width: '18px',
                                height: '18px',
                                borderRadius: '15px',
                                border: '1px solid #f63d68',
                                borderradius: '100%',
                                position: 'absolute',
                                marginLeft: '8px',
                                // zIndex: 1,
                              }}
                            />
                            <img
                              src={Profile}
                              alt="chatprofile"
                              style={{
                                width: '18px',
                                height: '18px',
                                borderRadius: '15px',
                                border: '1px solid #f63d68',
                                borderradius: '100%',
                                position: 'absolute',
                                marginLeft: '16px',
                                // zIndex: 0,
                              }}
                            />
                          </MemberProfile>
                        </RoomMember>
                      </ChatRoomContents>
                    </div>
                    <RightContents>
                      <ChatMessageNumber>
                        <MessageNumber>12</MessageNumber>
                      </ChatMessageNumber>
                      <ChatMenu
                        onClick={() => {
                          openModal();
                        }}
                      >
                        <img
                          src={MenuBar}
                          alt="menu"
                          style={{
                            width: '100%',
                            height: '100%',
                          }}
                        />
                      </ChatMenu>
                    </RightContents>
                  </ChatRoomBox>
                </ChatRoom>
              </>
            ) : (
              <div>승인요청임</div>
            )}
          </ChatContainer>
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
  height: 100%;
  padding-top: 50px;
`;

const Container = styled.div`
  width: 375px;
  height: 100%;
  margin: 0 auto;
  background: #ffffff;
`;

const TapBar = styled.div`
  height: 48px;
  margin-left: 16px;
  display: flex;
`;

const ChatContainer = styled.div``;

const ChatRoom = styled.div`
  display: flex;
  align-items: center;
  height: 98px;
  border-bottom: 1px solid #e4e7ec;
`;

const ChatRoomBox = styled.div`
  display: flex;
  align-items: center;
`;

const ChatRoomImg = styled.div`
  height: 74px;
  margin-left: 16px;
`;

const ChatRoomContents = styled.div`
  margin-left: 16px;
`;

const ChatRoomInfo = styled.div``;

const ChatRoomName = styled.div`
  font-size: 16px;
  margin-bottom: 3px;
`;

const ChatRoomContent = styled.div`
  font-size: 10px;
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

const MemberProfile = styled.div`
  display: flex;
  /* width: 20px; */
  /* height: 20px; */
  background: purple;
`;

const RightContents = styled.div`
  display: block;
  width: 38px;
  height: 60px;
`;

const ChatMessageNumber = styled.div`
  display: flex;
  width: 38px;
  height: 20px;
  background: #f63d68;
  border-radius: 20px;
  color: white;
`;

const MessageNumber = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  font-size: 12px;
  margin: auto;
  margin-top: 5px;
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
  bottom: 48px;
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