import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { useEffect } from 'react';
import { PATH_URL } from '../../shared/constants';
import Cookies from 'js-cookie';

// 클라이언트 데터 관리
import { useRecoilState } from 'recoil';
import { sse } from '../../atoms';

// 이미지 import
import { ReactComponent as Logo } from '../../assets/header/logo.svg';
import { ReactComponent as Bell } from '../../assets/header/bellicon.svg';
import { ReactComponent as NewAlarm } from '../../assets/header/alarm-new.svg';

export const Header = () => {
  const navigate = useNavigate();

  const accesskey = Cookies.get('Access_key');

  // sse handle
  const [newNotice, setNewNotice] = useRecoilState(sse);
  // sse연결 여부
  const [listening, setListening] = useState(false);
  // 리스폰 담을 스테이스
  const [gotMessage, setGotMessage] = useState(false);

  // 로그인 여부
  const isLogin = Cookies.get('Access_key');
  let eventSource = undefined;

  const isSSE = localStorage.getItem('sse') === 'connect' ? true : false;

  useEffect(() => {
    if (!isSSE && isLogin !== null) {
      // SSE 연결
      eventSource = new EventSourcePolyfill(`${process.env.REACT_APP_SERVER_URL}/sse/stream`, {
        headers: {
          Access_key: `Bearer ${accesskey}`,
        },
        heartbeatTimeout: 3000000, //sse 연결 시간 (30분)
        withCredentials: true,
      });

      // sse 최초 연결되었을 때
      eventSource.onopen = event => {
        setListening(true);
      };

      // 서버에서 뭔가 날릴 때마다
      eventSource.onmessage = event => {
        // 받은 데이터 Json타입으로 형변환 가능여부fn
        // const isJson = str => {
        //   try {
        //     const json = JSON.parse(str);
        //     return json && typeof json === 'object';
        //   } catch (e) {
        //     return false;
        //   }
        // };
        // if (isJson(event.data)) {
        //   // 알림 리스트 (재요청하는 파트)
        //   setListening(!listening);
        //   setGotMessage(true);
        // 실시간 알림 데이터
        // console.log('event ::', event.data);
        // const obj = JSON.parse(event.data);
        // console.log('obj ::', obj);
        // const result = obj[1].data;
        // console.log('result ::', result);
        // const Error = JSON.parse(result);
        // console.log(Error);
        // setNewNotice(result);
        // }
      };
      // sse 에러
      eventSource.onerror = event => {};
    }
    // 로그인 상태가 아니고, 이벤트 소스에서 데이터를 정삭적으로 수신할 때,
    return () => {
      if (!isLogin && eventSource !== undefined) {
        eventSource.close();
        setListening(false);
      }
    };
  }, [isLogin]);

  // 알림 페이지로 이동
  const bellbuttonHandler = () => {
    navigate(`${PATH_URL.NOTICE}`);
  };

  console.log('newNotice ::', newNotice.data);

  return (
    <>
      <Background>
        <Contents>
          <Link to="/">
            <Logo />
          </Link>
          <Bell
            style={{
              cursor: 'pointer',
            }}
            onClick={() => {
              bellbuttonHandler();
            }}
          />
        </Contents>
      </Background>
    </>
  );
};

const Background = styled.div`
  display: flex;
  background: #ffffff;
  width: 100%;
  height: 52px;
  position: fixed;
  top: 0;
  border-bottom: 0.5px solid gray;
  z-index: 30;
`;

const Contents = styled.div`
  width: 343px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
