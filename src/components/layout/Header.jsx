import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { PATH_URL } from '../../shared/constants';

// 클라이언트 데터 관리
import { useRecoilValue } from 'recoil';
import { noticeState } from '../../atoms';

// 이미지 import
import { ReactComponent as Logo } from '../../assets/header/logo.svg';
import { ReactComponent as Bell } from '../../assets/header/bellicon.svg';
import { ReactComponent as NewAlarm } from '../../assets/header/alarm-new.svg';

export const Header = () => {
  const navigate = useNavigate();

  // 종 테스트
  const NoticeData = useRecoilValue(noticeState);
  console.log('NoticeData ::', NoticeData);

  // 알림 페이지로 이동
  const bellbuttonHandler = () => {
    navigate(`${PATH_URL.NOTICE}`);
  };

  return (
    <>
      <Background>
        <Contents>
          <Link to="/">
            <Logo />
          </Link>
          {NoticeData.length < 1 ? (
            <Bell
              style={{
                cursor: 'pointer',
              }}
              onClick={() => {
                bellbuttonHandler();
              }}
            />
          ) : (
            <NewAlarm
              style={{
                cursor: 'pointer',
              }}
              onClick={() => {
                bellbuttonHandler();
              }}
            />
          )}
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
