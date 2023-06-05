import React, { useEffect, useRef, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { putUpdateAPI } from '../../api/api';
import { MEMBER_URL } from '../../shared/constants';
import { styled } from 'styled-components';

function UserUpdate({ memberName, profileImage, isModalOpen, introduce }) {
  const queryClient = useQueryClient();
  const [nameInput, setNameInput] = useState('');
  const [introduceInput, setIntroduceInput] = useState('');
  const [previewImage, setPreviewImage] = useState(null);
  const imgRef = useRef();

  const mutation = useMutation(formData => putUpdateAPI(`${MEMBER_URL.MYPAGE_PUT}`, formData), {
    onSuccess: response => {
      alert('수정 완료', response);
      queryClient.invalidateQueries('mypagelist');
      isModalOpen();
    },
    onError: error => {
      alert('마이페이지 post 요청실패 ', error);
    },
  });

  const memberNameHanlder = e => {
    setNameInput(e.target.value);
  };

  const introduceHanlder = e => {
    setIntroduceInput(e.target.value);
  };

  const onSubmitHandler = async e => {
    e.preventDefault();

    const img = imgRef.current.files[0];
    const formData = new FormData();
    const data = {
      memberName: nameInput || memberName,
      introduce: introduceInput || introduce,
    };

    formData.append('data', new Blob([JSON.stringify(data)], { type: 'application/json' }));
    img && formData.append('image', img);
    mutation.mutate(formData);
  };

  const handleFileChange = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    // 모달이 열릴 때 body에 스크롤 정지
    document.body.style.overflow = 'hidden';

    return () => {
      // 모달이 닫힐 때 스크롤 정지 스타일 제거
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <OutCon>
      <ModalCon>
        <CloseBtn onClick={() => isModalOpen()}>X</CloseBtn>
        <Container>
          <Contents onSubmit={onSubmitHandler}>
            <PartyDetailImg>
              <ProfileImageWrapper>
                <ProfileImage src={previewImage || profileImage} alt="ProfileImage" />
              </ProfileImageWrapper>
              <br />
              <FileInput
                type="file"
                accept="image/*"
                id="img"
                name="img"
                ref={imgRef}
                onChange={handleFileChange}
              />
              <br />
              <label>
                닉네임 :{' '}
                <input
                  style={{
                    width: '100px',
                    textAlign: 'center',
                  }}
                  value={nameInput}
                  onChange={memberNameHanlder}
                />
              </label>
              <br />
              <label>
                한줄소개 :{' '}
                <input
                  style={{
                    width: '100px',
                    textAlign: 'center',
                  }}
                  value={introduceInput}
                  onChange={introduceHanlder}
                />
              </label>
              <br />
              <button type="submit">수정완료</button>
            </PartyDetailImg>
          </Contents>
        </Container>
      </ModalCon>
    </OutCon>
  );
}

export default UserUpdate;

const OutCon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
`;

const ModalCon = styled.div`
  width: 60%;
  height: 50%;
  padding: 3% 5%;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
`;

const CloseBtn = styled.div`
  color: white;
  background-color: #000;
  height: 20px;
  width: 20px;
  border-radius: 5px;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 10px;
  right: 10px;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: #505050;
  margin: 0 auto;
  padding-top: 50px;
  padding-bottom: 20px;
`;

const Contents = styled.form`
  width: 90%;
  margin: 0 auto;
`;

const PartyDetailImg = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ProfileImageWrapper = styled.div`
  width: 100px; /* 원하는 가로 크기 설정 */
  height: 100px; /* 원하는 세로 크기 설정 */
  overflow: hidden;
  border-radius: 50%;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const FileInput = styled.input`
  position: relative;
  background-color: #ffffff;
  width: 150px;
  height: auto;
  cursor: pointer;
`;
