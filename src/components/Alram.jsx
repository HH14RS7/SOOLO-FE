import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { useEffect } from 'react';
import { PATH_URL } from '../shared/constants';
import Cookies from 'js-cookie';

// 클라이언트 데터 관리
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { sse } from '../atoms';

export const Alram = ({ newNotice, setnewNotice }) => {
  const navigate = useNavigate();

  const [show, setShow] = useState(null);

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
            Connection: 'Keep-Alive',
          },
          heartbeatTimeout: 3000000, //sse 연결 시간 (30분)
          withCredentials: true,
        },
      );

      // sse 최초 연결되었을 때
      eventSource.onopen = event => {
        if (event.status === 200) {
          localStorage.setItem('sse', 'connect');
          // setListening(true);
        }
      };

      // 서버에서 뭔가 날릴 때마다
      eventSource.onmessage = event => {
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
          // setListening(!listening);
          // setGotMessage(true);
          // 실시간 알림 데이터
          console.log('event ::', event.data);
          const obj = JSON.parse(event.data);
          console.log('obj ::', obj);
          const result = obj[1].data;
          const data = JSON.parse(result);
          console.log(data);
          setNewNotice(data);
        }
      };
      // sse 에러
      eventSource.onerror = error => {
        // localStorage.setItem('sse', null);
        // console.log('error ::', error);
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
  }, [isLogin]);

  // 3초
  useEffect(() => {
    // let timer;
    if (Notice.partyTitle !== undefined) {
      setTimeout(() => {
        setNewNotice({});
      }, 4000);
    }

    // if (Notice) {
    //   setTimeout(() => {
    //     setNewNotice(null);
    //   }, 3000);
    // }
    // console.log('Notice return ::', Notice);
    // console.log('Notice type', typeof Notice);
    // return () => clearTimeout(timer);
  }, [Notice]);

  // console.log('Notice ::', Notice);

  return (
    <>
      {Notice && (
        <SnackBar>
          <div>누가 알림보냄@@@@@@@@@@@@</div>
          <div>{Notice.noticeCode === 1 ? '호스트' : '게스트'}</div>
          <div>제목: {Notice.partyTitle}</div>
          <div>누가 신청함: {Notice.participantName}</div>
          <div>승인 or 거절: {Notice.participateIs ? '승인' : '거절'}</div>
        </SnackBar>
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
  width: 360px;
  height: 100px;
  margin: 0 auto;
  left: 0;
  right: 0;
  position: fixed;
  background: white;
  border: 1px solid #f04438;
  border-radius: 20px;
  margin-top: 100px;
  z-index: 5;
  opacity: 0;
  animation: ${fadeIn} 1s forwards, ${fadeOut} 1s 3s forwards;
`;
