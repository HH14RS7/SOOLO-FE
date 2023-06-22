import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useRecoilState } from 'recoil';
import { noticeState } from '../atoms';

// 이미지 import
import { ReactComponent as LeftBack } from '../assets/chating/LeftBack.svg';
import { ReactComponent as Alarm } from '../assets/notice/alarm.svg';
import { ReactComponent as ComingAlarm } from '../assets/notice/coming up alarm.svg';
import { ReactComponent as Email } from '../assets/notice/email.svg';
import { postAPI } from '../api/api';

export const PartyNotice = () => {
  const [notice, setNotice] = useRecoilState(noticeState);

  const { data, isLoading, error } = useQuery('requests', () => postAPI('/sse/notice'));

  useEffect(() => {
    if (data) {
      setNotice(data?.data?.data?.absenceNoticeDtoList);
    }
  }, [data, setNotice]);

  if (isLoading) {
    return <div>로딩중입니다.</div>;
  }

  if (error) {
    return <div>Error : {error.message}</div>;
  }

  console.log('가져온 데이터 ::', data);
  console.log('이건가? ::', data.data.data.absenceNoticeDtoList);
  console.log('부재중 알림 ::', notice);

  return (
    <>
      <Background>
        <Contents>
          <Topbar>
            <TopBackDiv
              style={{
                position: 'absolute',
              }}
            >
              <Link to={'/home'}>
                <LeftBack />
              </Link>
            </TopBackDiv>
            <TopbarName>알림</TopbarName>
          </Topbar>
          <NoticeContainer>
            <ImgDiv>
              <Alarm />
            </ImgDiv>
            <NoticeContents>
              <NoticeName>
                <NoticeOverName>강남에서 술마실 사람</NoticeOverName> 모임이
                <ApprovalStatus>승인</ApprovalStatus> 되었습니다.
              </NoticeName>
              <NoticeText>
                승인 된 모임은 마이페이지 속 내가 신청한 모임 내에서 확인 가능합니다.
              </NoticeText>
              <NoticeTime>00시간 전</NoticeTime>
            </NoticeContents>
          </NoticeContainer>
          <NoticeContainer>
            <ImgDiv>
              <Alarm />
            </ImgDiv>
            <NoticeContents>
              <NoticeName>
                <NoticeOverName>합정에서 와인파티</NoticeOverName> 모임이
                <RefusalStatus>거절</RefusalStatus> 되었습니다.
              </NoticeName>
              <NoticeText>
                거절 된 모임은 마이페이지 속 내가 신청한 모임 내에서 확인 가능합니다.
              </NoticeText>
              <NoticeTime>00시간 전</NoticeTime>
            </NoticeContents>
          </NoticeContainer>
          <TimeContainer>
            <ImgDiv>
              <ComingAlarm />
            </ImgDiv>
            <TimeContents>
              <NoticeName>
                <NoticeOverName>합정에서 와인파티</NoticeOverName> 모임 시작까지
                <RemainingTime>3시간</RemainingTime> 남았습니다.
              </NoticeName>
              <NoticeText>매너있는 즐거운 모임 되세요!</NoticeText>
              <NoticeTime>00시간 전</NoticeTime>
            </TimeContents>
          </TimeContainer>
          <HostContainer>
            <ImgDiv>
              <Email />
            </ImgDiv>
            <HostContents>
              <HostDiv>
                <HostImgDiv></HostImgDiv>
                <HostText>
                  <NoticeOverName>홍길동님</NoticeOverName>이
                  <NoticeOverName>'홍대에서 밤새 술 마실 사람'</NoticeOverName>모임
                </HostText>
                <HostTexts>에 참여하기를 원합니다</HostTexts>
              </HostDiv>
              <HostTimeText>00분 전</HostTimeText>
            </HostContents>
          </HostContainer>
        </Contents>
      </Background>
    </>
  );
};

// 기본 스타일
const Background = styled.div`
  width: 100%;
  height: 100%;
`;

const Contents = styled.div`
  height: 100%;
  width: 360px;
  margin: 0 auto;
  background: #f9fafb;
  padding-bottom: 70px;
`;

// TopBar 스타일
const Topbar = styled.div`
  display: flex;
  top: 0;
  align-items: center;
  justify-content: space-between;
  width: 360px;
  height: 52px;
  border-bottom: 1px solid #f2f4f7;
  background: #fff;
  z-index: 10;
  margin: 0 auto;
`;

const TopBackDiv = styled.div`
  display: flex;
  align-items: center;
  padding-left: 16px;
  width: 40px;
  height: 24px;
  cursor: pointer;
`;

const TopbarName = styled.div`
  color: #1d2939;
  font-size: 16px;
  text-align: center;
  flex-grow: 1;
`;

// 알림 박스 스타일
const NoticeContainer = styled.div`
  display: flex;
  width: 360px;
  height: 116px;
  padding: 16px;
  gap: 8px;
  background: #fff;
  border-bottom: 1px solid #e4e7ec;
`;

const ImgDiv = styled.div`
  width: 16px;
  height: 16px;
`;

const NoticeContents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 304px;
  height: 84px;
`;

const NoticeName = styled.div`
  display: flex;
  font-size: 14px;
  gap: 2px;
  margin-bottom: 8px;
`;

const NoticeOverName = styled.div`
  font-weight: 700;
`;

const ApprovalStatus = styled.div`
  width: 37px;
  height: 16px;
  padding: 2px 8px;
  background: #12b76a;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  color: #fff;
`;

const RefusalStatus = styled.div`
  width: 37px;
  height: 16px;
  padding: 2px 8px;
  background: #f04438;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  color: #fff;
`;

const NoticeText = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #1d2939;
  max-width: 295px;
  line-height: 18px;
`;

const NoticeTime = styled.div`
  font-size: 10px;
  font-weight: 400;
  margin-top: 16px;
  color: #667085;
`;

// 시간 알림 스타일
const TimeContainer = styled.div`
  display: flex;
  width: 360px;
  height: 94px;
  padding: 16px;
  gap: 8px;
  background: #fff;
  border-bottom: 1px solid #e4e7ec;
`;

const RemainingTime = styled.div`
  color: #f63d68;
  font-weight: 700;
`;

const TimeContents = styled.div`
  width: 300px;
  height: 62px;
  gap: 16px;
`;

// 호스트 알림 스타일
const HostContainer = styled.div`
  display: flex;
  width: 360px;
  height: 100px;
  padding: 16px;
  gap: 8px;
  background: #fff;
  border-bottom: 1px solid #e4e7ec;
`;

const HostContents = styled.div`
  width: 304px;
  height: 68px;
`;

const HostDiv = styled.div`
  width: 305px;
  height: 42px;
  display: flex;
  gap: 16px;
`;

const HostImgDiv = styled.div`
  width: 42px;
  height: 42px;
  background: gray;
  border-radius: 8px;
`;

const HostText = styled.div`
  display: flex;
  max-width: 245px;
  font-size: 14px;
  gap: 2px;
  line-height: 18px;
`;

const HostTimeText = styled.div`
  font-size: 10px;
  font-weight: 400;
  margin-top: 16px;
  color: #667085;
`;

const HostTexts = styled.div`
  position: absolute;
  margin-top: 25px;
  margin-left: 59px;
  font-size: 14px;
`;
