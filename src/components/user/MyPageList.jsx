import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { MEMBER_URL, PATH_URL } from '../../shared/constants';
import { deleteAPI, getAPI } from '../../api/api';
import { styled } from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as UpdateIcon } from '../../assets/mypage/update.svg';
import { ReactComponent as FrameIcon } from '../../assets/mypage/frame35.svg';
import { ReactComponent as ListIcon } from '../../assets/mypage/listicon.svg';
import { ReactComponent as Profile } from '../../assets/mypage/profile.svg';
import Cookies from 'js-cookie';

export const MyPageList = () => {
  const [logoutModalOpen, setlogoutModalOpen] = useState(false);
  const navigate = useNavigate();

  const mutation = useMutation(() => deleteAPI(`${MEMBER_URL.LOGOUT}`), {
    onSuccess: response => {
      Cookies.remove('Access_key');
      Cookies.remove('Refresh_key');
      navigate('/user/login');
    },
    onError: error => {
      alert('로그아웃 요청실패 ', error);
    },
  });

  const { data } = useQuery('mypagelist', async () => {
    const response = await getAPI(`${MEMBER_URL.MYPAGE_GET}`);
    return response;
  });

  const user = data?.data?.data;
  console.log('mydata 확인 => ', data?.data?.data);

  const logoutHandler = () => {
    mutation.mutate();
  };

  const openModal = () => {
    setlogoutModalOpen(true);
  };

  const closeModal = () => {
    setlogoutModalOpen(false);
  };

  return (
    <>
      <Container>
        <PartyDetailImg>
          <Topbar360>
            <Frame3959>
              <Link to={`${PATH_URL.MYPAGE_UPDATE}`}>
                <UpdateIcon />
              </Link>
            </Frame3959>
          </Topbar360>
          <Frame4017>
            <Frame4016>
              <Frame4011>
                <Name>{user?.memberName}</Name>
                <Frame4010>
                  <Info>{user?.gender === 'male' ? <div>남</div> : <div>여</div>}</Info>
                  <FrameIcon />
                  <Info>{user?.age}대</Info>
                </Frame4010>
              </Frame4011>
              <ProfileImage src={user?.profileImage || <Profile />} alt="ProfileImage" />
            </Frame4016>
            <Frame4013>
              <Introduce>자기 소개</Introduce>
              <IntroduceContent>{user?.introduce}</IntroduceContent>
            </Frame4013>
          </Frame4017>
        </PartyDetailImg>
        <Rectangle3971 />
        <Frame4015>
          <Frame4008>
            <MypageTitle>마이페이지</MypageTitle>
          </Frame4008>
          <Link to={`${PATH_URL.MY_REQUEST_PARTY}`}>
            <Frame4005>
              <ListTitle>내가 신청한 모임</ListTitle>
              <ListIcon />
            </Frame4005>
          </Link>
          <Link to={`${PATH_URL.MY_CREATE_PARTY}`}>
            <Frame4005>
              <ListTitle>내가 개설한 모임</ListTitle>
              <ListIcon />
            </Frame4005>
          </Link>
          <Frame4005 onClick={() => openModal()}>
            <ListTitle>로그아웃</ListTitle>
            <ListIcon />
          </Frame4005>
        </Frame4015>
      </Container>
      {logoutModalOpen && (
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
          <Modals>
            <ExitContainer>
              <ExitModal>
                <ExitName>로그아웃 하시겠습니까?</ExitName>
                <ExitText>로그아웃시 모임에 참여할 수 없습니다.</ExitText>
                <ExitBtnDiv>
                  <ExitCancel
                    onClick={() => {
                      closeModal();
                    }}
                  >
                    머무르기
                  </ExitCancel>
                  <EixtBtn
                    onClick={() => {
                      logoutHandler();
                    }}
                  >
                    로그아웃
                  </EixtBtn>
                </ExitBtnDiv>
              </ExitModal>
            </ExitContainer>
          </Modals>
        </div>
      )}
    </>
  );
};

const Container = styled.div`
  width: 360px;
  height: 100%;
  margin: 0 auto;
  padding-bottom: 20px;
`;

const PartyDetailImg = styled.div`
  width: 360px;
  height: 318px;
  left: 0px;
  top: 0px;
  background: #f63d68;
`;

const Rectangle3971 = styled.div`
  width: 360px;
  height: 8px;
  left: 0px;
  top: 318px;
  background: #f2f4f7;
`;

const ProfileImage = styled.img`
  width: 70px;
  height: 70px;
  background: url(.jpg), #d9d9d9;
  border-radius: 16px;
`;

const Topbar360 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 360px;
  height: 52px;
  left: 0px;
  top: 0px;
  margin-bottom: 48px;
`;

const Frame3959 = styled.div`
  padding: 0px 16px 0px 0px;
  width: 40px;
  height: 24px;
`;

const Frame4017 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  gap: 16px;
  width: 360px;
  height: 186px;
  left: 0px;
  top: 100px;
`;

const Frame4016 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 16px;
  gap: 202px;
  width: 360px;
  height: 70px;
  margin-bottom: 16px;
`;

const Frame4011 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;
  width: 56px;
  height: 42px;
`;

const Name = styled.div`
  width: 52px;
  height: 20px;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 100%;
  display: flex;
  align-items: center;
  letter-spacing: -0.015em;
  color: #000000;
  white-space: nowrap;
`;

const Frame4010 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  width: 56px;
  height: 14px;
  white-space: nowrap;
`;

const Info = styled.div`
  width: 13px;
  height: 14px;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  display: flex;
  align-items: center;
  letter-spacing: -0.015em;
  color: #ffffff;
`;

const Frame4013 = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 32px;
  width: 328px;
  height: 100px;
  background: #f2f4f7;
  border: 1px solid #ffffff;
  box-shadow: 16px 4px 16px rgba(0, 0, 0, 0.15);
  border-radius: 16px;
`;

const Introduce = styled.div`
  width: 47px;
  height: 12px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 100%;
  display: flex;
  align-items: center;
  letter-spacing: -0.015em;
  color: #475467;
  margin-bottom: 8px;
`;

const IntroduceContent = styled.div`
  width: 237px;
  height: 16px;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  display: flex;
  align-items: center;
  letter-spacing: -0.015em;
  color: #000000;
`;

const Frame4015 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 32px 0px 56px;
  background: #ffffff;
  width: 360px;
  height: 388px;
  left: 0px;
  top: 327px;
`;

const Frame4008 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px 16px;
  gap: 10px;
  width: 360px;
  height: 20px;
`;

const MypageTitle = styled.div`
  width: 55px;
  height: 12px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 100%;
  display: flex;
  align-items: center;
  letter-spacing: -0.015em;
  color: #667085;
`;

const Frame4005 = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
  gap: 10px;
  width: 360px;
  height: 56px;
  border-bottom: 1px solid #e4e7ec;
  white-space: nowrap;
  cursor: pointer;
`;

const ListTitle = styled.div`
  width: 103px;
  height: 16px;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  display: flex;
  align-items: center;
  letter-spacing: -0.015em;
  color: #000000;
`;

//모달

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
