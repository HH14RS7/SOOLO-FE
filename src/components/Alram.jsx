import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

// 클라이언트 데터 관리
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { sse } from '../atoms';

// 이미지 import
import { ReactComponent as WhiteAlarm } from '../assets/notice/whitebell.svg';

export const Alram = () => {
  const navigate = useNavigate();

  const accesskey = Cookies.get('Access_key');

  // sse handle
  // const [newNotice, setNewNotice] = useRecoilState(sse);
  // sse연결 여부
  const [listening, setListening] = useState(false);
  // 리스폰 담을 스테이스
  const [gotMessage, setGotMessage] = useState(false);

  // Notice 불러오기
  const setNewNotice = useSetRecoilState(sse);
  const Notice = useRecoilValue(sse);

  // 로그인 여부
  const isLogin = Cookies.get('Access_key');
  // let eventSource = undefined;

  // sse 연결 여부
  const isSSE = localStorage.getItem('sse') === 'connect' ? true : false;

  useEffect(() => {
    if (!isSSE && isLogin !== null) {
      // SSE 연결
      const eventSource = new EventSourcePolyfill(
        `${process.env.REACT_APP_SERVER_URL}/sse/stream`,
        {
          headers: {
            Access_key: `Bearer ${accesskey}`,
            'Content-Type': 'text/event-stream',
          },
          withCredentials: true, //무조건 넣어야 함
          heartbeatTimeout: 3000000, //sse 연결 시간 (30분)
        },
      );

      // sse 최초 연결되었을 때
      eventSource.onopen = event => {
        console.log('SSE 연결완료');
        if (event.status === 200) {
          localStorage.setItem('sse', 'connect');
        }
      };

      // 서버에서 뭔가 날릴 때마다
      eventSource.onmessage = event => {
        console.log('서버가 뭘줌', event);
        // 받은 데이터 Json타입으로 형변환 가능여부fn
        // console.log('여기 알림이요~~', event);
        const isJson = str => {
          try {
            const json = JSON.parse(str);
            // console.log('jsonType', typeof json);
            // console.log('json ::::::::', json);
            // console.log('json[1].data :::::::: ', json[1].data);
            const message = json[1].data;
            if (!message.includes('connection is open')) {
              return json && typeof json === 'object';
            }
          } catch (e) {
            return false;
          }
        };
        if (isJson(event.data)) {
          // 알림 리스트 (재요청하는 파트)
          const obj = JSON.parse(event.data);
          const result = obj[1].data;
          const data = JSON.parse(result);
          console.log(data);
          setNewNotice(data);
        }
      };
      // sse 에러
      eventSource.onerror = error => {
        console.log('에러났음 ::', error);
        if (eventSource !== undefined) {
          eventSource.close();
          localStorage.setItem('sse', null);
        }
      };
    }

    // 로그인 상태가 아니고, 이벤트 소스에서 데이터를 정삭적으로 수신할 때,
    // return () => {
    //   if (!isLogin && eventSource !== undefined) {
    //     eventSource.close();
    //     setListening(false);
    //   }
    // };
  }, []);

  // 3초
  useEffect(() => {
    if (Notice) {
      setTimeout(() => {
        setNewNotice(null);
      }, 3000);
    }
  }, [Notice]);

  // console.log('Notice ::', Notice);

  return (
    <>
      {Notice && (
        <Background>
          <SnackBar
            onClick={() => {
              navigate('/notice');
            }}
          >
            <WhiteAlarm />
            <AlarmText>새로운 알림이 있습니다.</AlarmText>
          </SnackBar>
        </Background>
      )}
    </>
  );
};

// 기본 스타일
const Background = styled.div`
  width: 100%;
  height: 100%;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

// 스낵바 스타일
const SnackBar = styled.div`
  display: flex;
  align-items: center;
  width: 328px;
  height: 54px;
  margin: 0 auto;
  left: 0;
  right: 0;
  position: fixed;
  padding: 18px 24px;
  background: #1d2939;
  color: #fff;
  border-radius: 8px;
  margin-top: 50px;
  z-index: 5;
  opacity: 0;
  animation: ${fadeIn} 1s forwards, ${fadeOut} 1s 3s forwards;
  cursor: pointer;
`;

const AlarmText = styled.div`
  margin-left: 16px;
  font-size: 16px;
`;
