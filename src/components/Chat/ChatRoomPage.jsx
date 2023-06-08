// 기능 import
import { React, useEffect, useState, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { PATH_URL } from '../../shared/constants';
import * as StompJs from '@stomp/stompjs';
import styled from 'styled-components';
import SockJS from 'sockjs-client';
import Cookies from 'js-cookie';

// 이미지 import
import { ReactComponent as LeftBack } from '../../assets/chating/LeftBack.svg';
import { ReactComponent as RoomMenuIcon } from '../../assets/chating/chatroommenu.svg';
import { ReactComponent as ChatSendIcon } from '../../assets/chating/chatsend.svg';
import { ReactComponent as NavigateExitIcon } from '../../assets/chating/NavigateExit.svg';
import { ReactComponent as PartHostIcon } from '../../assets/chating/hosticon.svg';
import { formmatedDate } from '../../shared/formattedDate';

export const ChatRoomPage = () => {
  const Access_key = `Bearer ${Cookies.get('Access_key')}`;
  let client = useRef({});
  //메뉴 모달
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);
  const [backgroundPosition, setBackgroundPosition] = useState('static');

  const location = useLocation();
  const queryObj = queryString.parse(location.search); // 문자열의 쿼리스트링을 Object로 변환
  const { chatRoomUniqueId, chatRoomId } = queryObj;

  // 채팅방 입장시 안내 문구 기능
  const [showModal, setShowModal] = useState(false);

  //채팅목록 조회 후 셋팅 값
  const [chatMessageList, setChatMessageList] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  const [message, setMessage] = useState('');
  const [data, setData] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef(null);

  // 자동 스크롤
  const messageEndRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: '0px',
      threshold: 0.3,
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      console.log('페치');

      subscribe();
      publish();

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleIntersect = entries => {
    const target = entries[0];
    if (target.isIntersecting && !isLoading) {
      fetchData();
    }
  };

  useEffect(() => {
    setShowModal(true);
    connect();

    return () => {
      disconnect();
    };
  }, []);

  // 스크롤
  useEffect(() => {
    messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessageList]);

  //이 방에 참여한 사용자(나)의 정보를 가져와!!! 실시!!!

  const connect = () => {
    client.current = new StompJs.Client({
      webSocketFactory: () => new SockJS(`http://${process.env.REACT_APP_SOCKET_URL}`),
      connectHeaders: {
        Access_key,
      },
      onConnect: () => {
        console.log('success');
        subscribeSend();

        subscribe();
        publish();
      },
      // onDisconnect: () => {
      //   disconnect();
      // },
    });
    client.current.activate();
  };

  const subscribe = () => {
    client.current.subscribe(`/sub/chat/messageList/${localStorage.memberUniqueId}`, response => {
      const data = JSON.parse(response.body);
      console.log('data.data.chatMessageList :: ', data);
      setChatMessageList(data.data.chatMessageList.reverse());

      console.log('page 이전::', page);
      const prevPage = data.data.page;
      console.log('prevPage :: ', prevPage);
      setPage(prev => prev + 1);
      console.log('page 이후::', page);
      setTotalPage(data.data.totalpage);
    });
  };

  const publish = () => {
    if (!client.current.connected) return;

    client.current.publish({
      destination: `/pub/chat/messageList/${localStorage.memberUniqueId}`,
      body: JSON.stringify({
        chatRoomId,
        chatRoomUniqueId,
        page,
      }),
    });
  };

  // 채팅 보내기
  const sendMessage = message => {
    publishSend();
  };

  const subscribeSend = () => {
    client.current.subscribe(`/sub/chat/message/${chatRoomUniqueId}`, response => {
      console.log('response :: ', response);
      //사용자 유니크 ID, 이미지 URL 추가 필요
      const data = JSON.parse(response.body);

      setChatMessageList(chatList => [...chatList, data.data]);
    });

    client.current.publish({
      destination: `/pub/chat/message/${chatRoomUniqueId}`,
      body: JSON.stringify({
        readStatus: 'READ',
      }),
    });
  };

  const publishSend = () => {
    if (!client.current.connected) return;

    client.current.publish({
      destination: `/pub/chat/message/${chatRoomUniqueId}`,
      body: JSON.stringify({
        memberId: `${localStorage.memberId}`,
        memberName: `${localStorage.memberName}`,
        memberUniqueId: `${localStorage.memberUniqueId}`,
        memberProfileImage: `${localStorage.profileImage}`,
        chatRoomId: chatRoomId,
        chatRoomUniqueId: chatRoomUniqueId,
        message: message,
        readStatus: 'READ',
      }),
    });
    setMessage('');
  };

  const disconnect = () => {
    console.log('소켓 종료');
    client.current.deactivate();
  };

  //TODO 채팅방 나가기 누를 때 disconnect() 호출하게 추가

  // console.log('chatMessageList :: ', chatMessageList);

  const closeModal = () => {
    setIsModalOpen(false);
    setBackgroundPosition('static');
  };

  const openModal = () => {
    setIsModalOpen(true);
    setBackgroundPosition('fixed');
  };

  const handleBackdropClick = e => {
    console.log('e ::', e);
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
      <div
        style={{
          width: '100%',
          height: '100%',
          position: backgroundPosition,
        }}
      >
        <Background>
          <Topbar>
            <Link to={`${PATH_URL.PARTY_CHAT}/${localStorage.memberUniqueId}`}>
              <TopBackDiv>
                <LeftBack />
              </TopBackDiv>
            </Link>
            <TopbarName>모임이름</TopbarName>
            <ModalBtn
              onClick={() => {
                openModal();
              }}
            >
              <RoomMenuIcon />
            </ModalBtn>
          </Topbar>
          <Container>
            {/* <div ref={containerRef}>target</div> */}
            <Contents>
              <ParticipantDiv>ㅇㅇㅇ님이 참여했습니다.</ParticipantDiv>
              {chatMessageList?.map((data, index) => {
                if (data.memberId == localStorage.memberId) {
                  return (
                    <MyChatContainer key={index}>
                      <MyChatDiv>
                        <MyChatTime>{formmatedDate(data.createdAt, 'h:mm')}</MyChatTime>
                        <MyChatText>{data.message}</MyChatText>
                      </MyChatDiv>
                    </MyChatContainer>
                  );
                } else {
                  return (
                    <OtherDiv key={index}>
                      <div
                        style={{
                          position: 'relative',
                        }}
                      >
                        <OtherImg>
                          <OtherProfile>
                            <img
                              src={data.memberProfileImage}
                              alt="profile"
                              style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: '8px',
                              }}
                            />
                          </OtherProfile>
                          <OtherHostIcon>
                            <PartHostIcon />
                          </OtherHostIcon>
                        </OtherImg>
                        <OthertInfo>
                          <OtherName>{data.sender}</OtherName>
                          <OtherContents>
                            <OtherChatText>{data.message}</OtherChatText>
                            <OtherChatTime>{formmatedDate(data.createdAt, 'h:mm')}</OtherChatTime>
                          </OtherContents>
                        </OthertInfo>
                      </div>
                    </OtherDiv>
                  );
                }
              })}
              <div ref={messageEndRef}></div>
            </Contents>
          </Container>
          {showModal && (
            <NavigateModal>
              <NavigateDiv>
                <NavigateText>
                  가이드라인 어쩌구 지키지 않으면 죽여버릴거야..채팅할 때 조심하세요 안 그러면
                  찾아가요..
                </NavigateText>
                <NavigateExitDiv
                  onClick={() => {
                    setShowModal();
                  }}
                >
                  <NavigateExitIcon />
                </NavigateExitDiv>
              </NavigateDiv>
            </NavigateModal>
          )}
          <SendContents>
            <SendDiv>
              <input
                type={'text'}
                value={message}
                onChange={e => setMessage(e.target.value)}
                onKeyDown={e => {
                  if (e.keyCode === 13) {
                    sendMessage(message);
                  }
                }}
                placeholder="메시지를 입력하세요."
                style={{
                  width: '260px',
                  height: '20px',
                  border: 'none',
                  marginLeft: '16px',
                }}
              ></input>
              <ChatBtn onClick={() => sendMessage(message)}>
                <ChatSendIcon />
              </ChatBtn>
            </SendDiv>
          </SendContents>
        </Background>
      </div>
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
                <EixtBtn>나가기</EixtBtn>
              </ExitBtnDiv>
            </ExitModal>
          </ExitContainer>
        </div>
      )}
    </>
  );
};

const Background = styled.div`
  background: #e4e7ec;
  width: 360px;
  height: 100%;
  margin: 0 auto;
`;

const Container = styled.div`
  padding-top: 47px;
  width: 360px;
  margin: 0 auto;
  background: #ffffff;
`;

// TopBar 스타일
const Topbar = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  margin-top: 51px;
  justify-content: space-between;
  align-items: center;
  width: 360px;
  height: 52px;
  border-bottom: 1px solid #f2f4f7;
  background: #fff;
  z-index: 10;
`;

const TopBackDiv = styled.div`
  display: flex;
  padding-left: 16px;
  width: 40px;
  height: 24px;
  cursor: pointer;
`;

const TopbarName = styled.div`
  color: #1d2939;
  font-size: 16px;
`;

const ModalBtn = styled.div`
  display: flex;
  width: 40px;
  height: 24px;
  cursor: pointer;
`;

const Contents = styled.div`
  width: 100%;
  height: 100%;
  background: #e4e7ec;
  display: inline-block;
  padding-bottom: 160px;
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
  margin-top: 10px;
`;

const OtherDiv = styled.div`
  margin-left: 16px;
  display: flex;
  margin-top: 18px;
  position: relative;
`;

const OtherImg = styled.div`
  width: 100%;
  width: 40px;
  position: absolute;
`;

const OtherProfile = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  margin-top: 14px;
`;

const OtherHostIcon = styled.div`
  width: 18px;
  height: 18px;
  background: #f63d68;
  border-radius: 20px;
  position: absolute;
  bottom: -4px;
  left: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
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
const MyChatContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 100%;
  margin-top: 18px;
  margin-right: 16px;
`;

const MyChatDiv = styled.div`
  display: flex;
  float: right;
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
  width: 360px;
  height: 80px;
  display: flex;
  position: fixed;
  align-items: center;
  background: #e4e7ec;
  bottom: 0;
  margin-bottom: 70px;
`;

const SendDiv = styled.div`
  display: flex;
  align-items: center;
  width: 328px;
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
  margin-left: 12px;
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
  height: 100%;
  z-index: 11;
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

const NavigateModal = styled.div`
  width: 360px;
  height: 72px;
  display: flex;
  position: fixed;
  bottom: 0;
  align-items: center;
  margin-bottom: 150px;
`;

const NavigateDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  width: 328px;
  height: 72px;
  padding-left: 16px;
  background: #f9fafb;
  border-radius: 16px;
`;

const NavigateText = styled.div`
  max-width: 190px;
  line-height: 14px;
  font-size: 10px;
  color: #344054;
  margin: auto 0;
`;

const NavigateExitDiv = styled.div`
  display: flex;
  padding-top: 8px;
  width: 32px;
  height: 32px;
`;
