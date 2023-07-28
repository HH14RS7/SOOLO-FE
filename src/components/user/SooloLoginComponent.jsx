import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { postAPI } from '../../api/api';
import { MEMBER_URL } from '../../shared/constants';
import SooloSignupComponent from './SooloSignupComponent';
import Cookies from 'js-cookie';
import axios from 'axios';

const JWT_EXPIRY_TIME = 3 * 60 * 60 * 1000;

const SooloLoginComponent = () => {
  const navigate = useNavigate();
  const [loginModalOpen, setloginModalOpen] = useState(false);
  const [signupModalOpen, setSignupModalOpen] = useState(false);

  const [emailInput, setEmailInput] = useState('');
  const [passWordInput, setPassWordInput] = useState('');

  const mutation = useMutation(data =>
    postAPI(`${MEMBER_URL.LOGIN}`, data)
      .then(onLoginSuccess)
      .catch(error => {
        console.log(error);
      }),
  );

  const onSilentRefresh = async () => {
    const refreshkey = 'Bearer ' + Cookies.get('Refresh_key');
    try {
      await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/reissue`,
        { name: 'name' },
        {
          headers: {
            Access_key: null,
            Refresh_key: refreshkey,
          },
        },
      );
      onLoginRefresh();
    } catch (error) {
      console.log(error);
    }
  };

  const onLoginSuccess = response => {
    // data을 받아서 localStorage에 저장.
    console.log(response);
    localStorage.setItem('memberId', response.data.data.memberId);
    localStorage.setItem('memberUniqueId', response.data.data.memberUniqueId);
    localStorage.setItem('memberName', response.data.data.memberName);
    localStorage.setItem('profileImage', response.data.data.profileImage);
    localStorage.setItem('sse', null);

    // access_key설정
    const accessKey = response.headers.get('access_key').split(' ')[1];

    // refresh_key설정
    const refreshkey = response.headers.get('refresh_key').split(' ')[1];

    Cookies.set('Access_key', accessKey);
    Cookies.set('Refresh_key', refreshkey);

    // access_key설정
    // const accessKey = response.headers.get('access_key').split(' ')[1];
    // axios.defaults.headers.common['Access_key'] = `Bearer ${accessKey}`;

    // refresh_key설정
    // const refreshkey = response.headers.get('refresh_key').split(' ')[1];
    // Cookies.set('Refresh_key', refreshkey);

    // accessToken 만료하기 1분 전에 로그인 연장
    setTimeout(onSilentRefresh, JWT_EXPIRY_TIME - 60000);
    alert('홈으로가야지');
    navigate('/home');
  };

  const onLoginRefresh = response => {
    // access_key설정
    const accessKey = response.headers.get('access_key').split(' ')[1];

    // refresh_key설정
    const refreshkey = response.headers.get('refresh_key').split(' ')[1];

    Cookies.set('Access_key', accessKey);
    Cookies.set('Refresh_key', refreshkey);
    // access_key설정
    // const accessKey = response.headers.get('access_key').split(' ')[1];
    // axios.defaults.headers.common['Access_key'] = `Bearer ${accessKey}`;

    // refresh_key설정
    // const refreshkey = response.headers.get('refresh_key').split(' ')[1];
    // Cookies.set('Refresh_key', refreshkey);

    // accessToken 만료하기 1분 전에 로그인 연장
    setTimeout(onSilentRefresh, JWT_EXPIRY_TIME - 60000);
  };

  const onSubmitHandler = e => {
    e.preventDefault();

    const data = {
      memberEmailId: emailInput,
      password: passWordInput,
    };

    mutation.mutate(data);
  };

  const emailHanlder = e => {
    setEmailInput(e.target.value);
  };
  const passWordHanlder = e => {
    setPassWordInput(e.target.value);
  };

  const loginHandler = () => {
    setloginModalOpen(true);
  };
  const signupHandler = () => {
    setSignupModalOpen(true);
    setloginModalOpen(false);
  };

  return (
    <>
      <button type="button" onClick={loginHandler}>
        나는 Soolo 로그인하기
      </button>
      {loginModalOpen && (
        <div>
          <Modals>
            <ExitContainer onSubmit={onSubmitHandler}>
              <ExitModal>
                <ExitName>
                  Email : <input value={emailInput} onChange={emailHanlder}></input>
                </ExitName>
                <ExitName>
                  PassWord : <input value={passWordInput} onChange={passWordHanlder}></input>
                </ExitName>
                <ExitBtnDiv>
                  <EixtBtn type="submit">로그인</EixtBtn>
                  <EixtBtn onClick={signupHandler}>회원가입</EixtBtn>
                </ExitBtnDiv>
              </ExitModal>
            </ExitContainer>
          </Modals>
        </div>
      )}
      {signupModalOpen && <SooloSignupComponent />}
    </>
  );
};

export default SooloLoginComponent;

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

const ExitContainer = styled.form`
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
  height: 240px;
  border-radius: 16px;
  background: #fff;
`;

const ExitName = styled.div`
  font-size: 16px;
  font-weight: 700;
`;

const ExitBtnDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const EixtBtn = styled.button`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  color: #fff;
  font-weight: 600;
  font-size: 12px;
  width: 250px;
  height: 40px;
  background: #f63d68;
  border-radius: 12px;
  margin-top: 5px;
  cursor: pointer;
`;
