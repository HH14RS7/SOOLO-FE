import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SockJS from 'sockjs-client';
import SojuRoom from '../assets/sojuroomimg.webp';
import MemberImg from '../assets/Vector.png';
import MenuBar from '../assets/icon.png';
import * as StompJs from '@stomp/stompjs';
import { Link } from 'react-router-dom';
import { PATH_URL } from '../shared/constants';

export const Chatpage = () => {
  const [chatDate, setChatDate] = useState();
  const [activeTab, setActiveTab] = useState(true);

  useEffect(() => {
    const client = new StompJs.Client({
      brokerURL: 'ws://222.102.175.141:8081/ws-stomp',
      connectHeaders: {
        Access_key:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI5ZDI3MGI4Ny1lYjU0LTRmNmMtOTljZi02MjU3MTE3YWEyNzYiLCJpYXQiOjE2ODUzNTkyMDcsImV4cCI6MTY4NTg5OTIwN30.Lcdva5F-H6SPdb2lGjPUAG8VZmPEgu1gA5rNldelI7s',
      },
      debug: function (str) {
        console.log(str);
      },
      onConnect: () => {
        const subscription = client.subscribe(
          '/sub/chat/chatList/9d270b87-eb54-4f6c-99cf-6257117aa276',
          message => {
            console.log(`Received:: ${message.body}`);
            setChatDate(JSON.parse(`${message.body}`));
          },
        );
        console.log('subscription :: ', subscription);
        client.publish({
          destination: '/pub/chat/chatList/9d270b87-eb54-4f6c-99cf-6257117aa276',
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

  return (
    <Background>
      <Container>
        <TapBar defaultActiveKey={activeTab}>
          <button
            onClick={() => {
              handleTabChange(true);
            }}
            eventkey={true}
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
            eventkey={false}
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
            <ChatRoom>
              <Link
                style={{
                  marginLeft: '16px',
                }}
                to={`${PATH_URL.PARTY_CHATROOM}/${chatDate?.data[0].chatRoomUniqueId}`}
              >
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
                  <ChatRoomContents>
                    <ChatRoomInfo>
                      <ChatRoomName>모임 이름</ChatRoomName>
                      <ChatRoomContent>최신 대화 내용</ChatRoomContent>
                    </ChatRoomInfo>
                    <RoomMember>
                      <TotalMember>
                        <div
                          style={{
                            marginRight: '6px',
                          }}
                        >
                          <img
                            src={MemberImg}
                            alt="Member"
                            style={{
                              width: '8.75px',
                              height: '12.25px',
                            }}
                          />
                        </div>
                        5명 참여중
                      </TotalMember>
                      <MemberProfile>
                        <img
                          src={SojuRoom}
                          alt="chatprofile"
                          style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: '15px',
                          }}
                        />
                      </MemberProfile>
                    </RoomMember>
                  </ChatRoomContents>
                  <RightContents>
                    <ChatMessageNumber>
                      <MessageNumber>12</MessageNumber>
                    </ChatMessageNumber>
                    <ChatMenu>
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
              </Link>
            </ChatRoom>
          ) : (
            <div>승인요청임</div>
          )}
        </ChatContainer>
      </Container>
    </Background>
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

const TapBar = styled.div`
  width: 264px;
  height: 48px;
  margin-left: 16px;
  display: flex;
`;

const ChatContainer = styled.div``;

const ChatRoom = styled.div`
  display: flex;
  align-items: center;
  width: 375px;
  height: 98px;
  border-bottom: 1px solid #e4e7ec;
`;

const ChatRoomBox = styled.div`
  display: flex;
  align-items: center;
`;

const ChatRoomImg = styled.div`
  width: 74px;
  height: 74px;
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
  width: 20px;
  height: 20px;
  border: 1px solid #f63d68;
  border-radius: 100%;
`;

const RightContents = styled.div`
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
  margin-top: 20px;
  float: right;
  cursor: pointer;
`;
