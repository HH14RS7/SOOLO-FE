import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { postAPI } from '../../api/api';
import { MEMBER_URL } from '../../shared/constants';

const SooloSignupComponent = () => {
  const navigate = useNavigate();

  const [emailInput, setEmailInput] = useState('');
  const [passWordInput, setPassWordInput] = useState('');
  const [ageInput, setAgeInput] = useState(0);
  const [genderInput, setGenderInput] = useState('');
  const [memberNameInput, setMemberNameInput] = useState('');

  const mutation = useMutation(data => postAPI(`${MEMBER_URL.SIGNUP}`, data), {
    onSuccess: response => {
      alert('회원가입 완료');
      navigate('/home');
    },
    onError: error => {
      alert('회원가입 실패 ', error);
    },
  });

  const emailHanlder = e => {
    setEmailInput(e.target.value);
  };
  const passWordHanlder = e => {
    setPassWordInput(e.target.value);
  };
  const ageHanlder = e => {
    setAgeInput(e.target.value);
  };
  const genderHanlder = e => {
    setGenderInput(e.target.value);
  };
  const memberNameHanlder = e => {
    setMemberNameInput(e.target.value);
  };

  const onSubmitHandler = e => {
    e.preventDefault();

    const data = {
      memberEmailId: emailInput,
      password: passWordInput,
      age: ageInput,
      gender: genderInput,
      memberName: memberNameInput,
    };

    mutation.mutate(data);
  };

  return (
    <>
      <Modals>
        <ExitContainer onSubmit={onSubmitHandler}>
          <ExitModal>
            <ExitName>
              Email : <input value={emailInput} onChange={emailHanlder}></input>
            </ExitName>
            <ExitName>
              PassWord : <input value={passWordInput} onChange={passWordHanlder}></input>
            </ExitName>
            <ExitName>
              Age : <input value={ageInput} onChange={ageHanlder}></input>
            </ExitName>
            <ExitName>
              성별 : <input value={genderInput} onChange={genderHanlder}></input>
            </ExitName>
            <ExitName>
              닉네임 : <input value={memberNameInput} onChange={memberNameHanlder}></input>
            </ExitName>
            <ExitBtnDiv>
              <EixtBtn type="submit">회원가입</EixtBtn>
            </ExitBtnDiv>
          </ExitModal>
        </ExitContainer>
      </Modals>
    </>
  );
};

export default SooloSignupComponent;

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
