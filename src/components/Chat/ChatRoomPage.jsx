// 기능 import
import { React, useEffect, useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { PARTIES_URL, PATH_URL, CHATING_URL, MEMBER_URL } from '../../shared/constants';
import { formmatedDate } from '../../shared/formattedDate';
import { deleteAPI, getWebAPI, postAPI } from '../../api/api';
import { useQuery } from 'react-query';
import queryString from 'query-string';
import * as StompJs from '@stomp/stompjs';
import styled from 'styled-components';
import SockJS from 'sockjs-client';
import Cookies from 'js-cookie';

// 무한 스크롤
import { useInView } from 'react-intersection-observer';

// 이미지 import
import { ReactComponent as LeftBack } from '../../assets/chating/left-back.svg';
import { ReactComponent as RoomMenuIcon } from '../../assets/chating/chat-room-menu.svg';
import { ReactComponent as ChatSendIcon } from '../../assets/chating/chat-send.svg';
import { ReactComponent as NavigateExitIcon } from '../../assets/chating/navigate-exit.svg';
import { ReactComponent as PartHostIcon } from '../../assets/chating/host-icon.svg';
import { ReactComponent as ProfileDefaultImg } from '../../assets/common/profile-default-img.svg';

export const ChatRoomPage = () => {
  const navigate = useNavigate();

  const Access_key = `Bearer ${Cookies.get('Access_key')}`;

  // clinet가 변경되더라도 컴포넌트가 리렌더링이 되지 않고 유지하게 하는 변수
  let client = useRef({});

  //메뉴 모달
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);
  const [backgroundPosition, setBackgroundPosition] = useState('static');

  // URL 파라미터 전달받기
  const location = useLocation();
  const queryObj = queryString.parse(location.search); // 문자열의 쿼리스트링을 Object로 변환
  const { chatRoomUniqueId, chatRoomId, hostId } = queryObj;

  // 채팅방 입장시 경고 문구
  const [showModal, setShowModal] = useState(false);

  //채팅목록 조회 후 셋팅 값
  const [chatMessageList, setChatMessageList] = useState([]);

  // 채팅창에 입력한 메시지
  const [message, setMessage] = useState('');

  // 자동 스크롤
  const [count, setCount] = useState(0);
  const messageEndRef = useRef();

  // 무한 스크롤
  const [page, setPage] = useState(1);
  const [ref, inView] = useInView();

  // 이전 채팅 조회
  const { data, loading, error } = useQuery('requests', () =>
    getWebAPI(
      `${CHATING_URL.MESSAGE_LIST_GET}/${
        localStorage.memberUniqueId
      }?chatRoomId=${chatRoomId}&chatRoomUniqueId=${chatRoomUniqueId}&page=${0}`,
    ),
  );

  useEffect(() => {
    if (data) {
      setChatMessageList(data?.data?.data?.chatMessageList);
    }
  }, [data]);

  // 채팅방 입장시 경고 문구 + 소켓 연결
  useEffect(() => {
    setShowModal(true);
    connect();

    return () => {
      disconnect();
    };
  }, []);

  // 채팅방 입장시 밑으로 자동스크롤
  useEffect(() => {
    setCount(count => count + 1);
  }, []);

  // 채팅치면 가장 하단으로 자동 스크롤
  useEffect(() => {
    if (messageEndRef) {
      messageEndRef.current.scrollIntoView({
        false: false,
        inline: 'nearest',
      });
    }
  }, [count]);

  // 소켓 연결
  const connect = () => {
    client.current = new StompJs.Client({
      webSocketFactory: () => new SockJS(`${process.env.REACT_APP_ROOM_SOCKET_URL}`),
      connectHeaders: {
        Access_key,
      },
      onConnect: () => {
        subscribeSend();
      },
      onDisconnect: () => {
        disconnect();
      },
    });
    client.current.activate();
  };

  // 채팅 보내기
  const sendMessage = message => {
    publishSend();
  };

  const subscribeSend = () => {
    client.current.subscribe(`/sub/chat/message/${chatRoomUniqueId}`, response => {
      const data = JSON.parse(response.body);
      setChatMessageList(chatList => [...chatList, data.data]);
      setCount(count => count + 1);
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
      }),
    });
    setMessage('');
  };

  // 무한 스크롤
  const productFetch = () => {
    getWebAPI(
      `${CHATING_URL.MESSAGE_LIST_GET}/${localStorage.memberUniqueId}?chatRoomId=${chatRoomId}&chatRoomUniqueId=${chatRoomUniqueId}&page=${page}`,
    ).then(res => {
      setChatMessageList([...res?.data?.data?.chatMessageList, ...chatMessageList]);
      setPage(page => page + 1);
    });
  };

  useEffect(() => {
    if (inView) {
      productFetch();
    }
  }, [inView]);

  // 최상단으로 이동
  // const onTop = () => {
  //   if (!window.scrollY) return;
  //   window.scrollTo({
  //     top: 0,
  //     behavior: 'smooth',
  //   });
  // };

  // 소켓 종료
  const disconnect = () => {
    client.current.deactivate();
  };

  // 나가기 모달에서 머무르기 버튼
  const closeModal = () => {
    setIsModalOpen(false);
    setBackgroundPosition('static');
  };

  // 메뉴 모달 버튼
  const openModal = () => {
    setIsModalOpen(true);
    setBackgroundPosition('fixed');
  };

  // 모달 밖의 영역 클릭 시 모달 닫치는 기능
  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  // 나가기 모달 띄우는 버튼
  const ExitopenModal = () => {
    setIsExitModalOpen(true);
  };

  // 채팅방 설정에서 머무르기 버튼
  const ExitcloseModal = () => {
    setIsExitModalOpen(false);
  };

  // 신고하기 버튼
  const ReportButtonHandler = () => {
    alert('곧 업데이트 예정입니다!');
  };

  // 채팅방 나가기 기능 (모임 삭제 / 모임 취소)
  const ExitButtonHandler = () => {
    if (hostId === localStorage.memberUniqueId) {
      deleteAPI(`${PARTIES_URL.PARTIES_STATUS_CHANGE}/${chatRoomId}`);
      alert('모임이 삭제되었습니다.');
      navigate(`${PATH_URL.PARTY_CHAT}/${localStorage.memberUniqueId}`);
    } else {
      postAPI(`${PARTIES_URL.PARTIES_APPLICATION}/${chatRoomId}`);
      alert('모임이 취소되었습니다.');
      navigate(`${PATH_URL.PARTY_CHAT}/${localStorage.memberUniqueId}`);
    }
  };

  // if (Loading) {
  //   return <div>로딩중입니다.</div>;
  // }

  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // }

  return (
    <>
      <BackgroundDiv backgroundposition={backgroundPosition}>
        <Background>
          {/* <button
            style={{
              width: '100px',
              height: '50px',
              Background: 'yellow',
              position: 'fixed',
              right: '30px',
              bottom: '150px',
              cursor: 'pointer',
            }}
            onClick={onTop}
          >
            상단으로 이동
          </button> */}
          <Topbar>
            <Link to={`${PATH_URL.PARTY_CHAT}/${localStorage.memberUniqueId}`}>
              <TopBackDiv>
                <LeftBack />
              </TopBackDiv>
            </Link>
            <TopbarName>채팅룸</TopbarName>
            <ModalBtn
              onClick={() => {
                openModal();
              }}
            >
              <RoomMenuIcon />
            </ModalBtn>
          </Topbar>
          <Container>
            <Contents>
              <div ref={ref}></div>
              <ParticipantDiv>즐거운 만남을 하시기 바랍니다!</ParticipantDiv>
              {chatMessageList?.map((data, index) => {
                if (data.memberUniqueId === localStorage.memberUniqueId) {
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
                            {data?.memberProfileImage ? (
                              <Link to={`${MEMBER_URL.TARGET_PAGE_GET}/${data.memberId}`}>
                                <img
                                  src={data?.memberProfileImage}
                                  alt="profile"
                                  style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '8px',
                                    objectFit: 'cover',
                                  }}
                                />
                              </Link>
                            ) : (
                              <ProfileDefault />
                            )}
                          </OtherProfile>
                          {data.memberUniqueId === hostId ? (
                            <OtherHostIcon>
                              <PartHostIcon />
                            </OtherHostIcon>
                          ) : null}
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
            </Contents>
          </Container>
          {showModal && (
            <NavigateModal>
              <NavigateDiv>
                <NavigateText>
                  욕설, 불법, 폭력적인 내용 등 다수에게 불쾌함을 주는 내용 작성 시 이용 정지의
                  사유가 되며 제제 대상이 될 수 있습니다.
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
                  if (e.keyCode === 13 && message.trim() !== '') {
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
              <ChatBtn
                onClick={() => {
                  if (message.trim() !== '') {
                    sendMessage(message);
                  }
                }}
              >
                <ChatSendIcon />
              </ChatBtn>
            </SendDiv>
          </SendContents>
          <div ref={messageEndRef}></div>
        </Background>
      </BackgroundDiv>
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
        <ExitModalBackground>
          <ExitContainer>
            <ExitModal>
              <ExitName>채팅방을 나가시겠습니까?</ExitName>
              {hostId === localStorage.memberUniqueId ? (
                <ExitText>채팅방을 나가면 모임이 삭제됩니다.</ExitText>
              ) : (
                <ExitText>채팅방을 나가면 모임이 나가집니다.</ExitText>
              )}
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
        </ExitModalBackground>
      )}
    </>
  );
};

// 기본 배경 스타일
const BackgroundDiv = styled.div`
  width: 100%;
  height: 100%;
  position: ${props => props.backgroundposition};
`;

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

const ProfileDefault = styled(ProfileDefaultImg)`
  width: 100%;
  height: 100%;
  border-radius: 8px;
`;

// TopBar 스타일
const Topbar = styled.div`
  display: flex;
  position: fixed;
  top: 0;
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
  padding: 3px;
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
  max-width: 219px;
  line-height: 1.2;
  padding: 10px;
  font-size: 14px;
  background: #f8f9fe;
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

// 나가기 모달
const ExitModalBackground = styled.div`
  width: 100vw;
  height: 100vh;
  background: none;
  position: fixed;
  top: 0;
  z-index: 13;
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

const ExitHostGuest = styled.div`
  font-size: 14px;
  font-weight: 400;
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
  max-width: 260px;
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
  cursor: pointer;
`;
