import React, { useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getAPI, putUpdateAPI } from '../../api/api';
import { MEMBER_URL } from '../../shared/constants';
import { styled } from 'styled-components';
import { ReactComponent as Profile } from '../../assets/mypage/profile.svg';
import { ReactComponent as Frame3959icon } from '../../assets/mypage/frame3959.svg';
import { ReactComponent as Imgupdate } from '../../assets/mypage/imgupdate.svg';
import { useNavigate } from 'react-router-dom';

function UserUpdate() {
  const queryClient = useQueryClient();
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [introduceInput, setIntroduceInput] = useState('');
  const [previewImage, setPreviewImage] = useState(null);
  const imgRef = useRef();
  const navigate = useNavigate();

  const mutation = useMutation(formData => putUpdateAPI(`${MEMBER_URL.MYPAGE_PUT}`, formData), {
    onSuccess: response => {
      queryClient.invalidateQueries('mypagelist');
      navigate('/mypage');
    },
    onError: error => {
      alert('마이페이지 수정 실패 ', error);
    },
  });

  const { data, isLoading } = useQuery('mypagelist', async () => {
    const response = await getAPI(`${MEMBER_URL.MYPAGE_GET}`);
    localStorage.setItem('memberName', response.data.data.memberName);
    localStorage.setItem('profileImage', response.data.data.profileImage);
    return response;
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const user = data?.data?.data;

  const memberNameHanlder = e => {
    setNameInput(e.target.value);
  };

  const introduceHanlder = e => {
    setIntroduceInput(e.target.value);
  };

  const onSubmitHandler = async e => {
    e.preventDefault();
    if (nameInput.length === 0) {
      alert('닉네임을 입력해주세요.');
      return;
    } else if (nameInput.length > 10) {
      alert('닉네임은 최대 10자 입니다.');
      return;
    } else if (introduceInput.length === 0) {
      alert('자기소개를 입력해주세요.');
      return;
    }

    const img = imgRef.current.files[0];
    const formData = new FormData();
    const data = {
      memberName: nameInput,
      introduce: introduceInput,
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

  const ExitopenModal = () => {
    setIsExitModalOpen(true);
  };

  const ExitcloseModal = () => {
    setIsExitModalOpen(false);
  };

  return (
    <>
      <OutCon onSubmit={onSubmitHandler}>
        <Topbar>
          <Frame3959 />
          <Title>프로필 수정하기</Title>
          <Frame3959>
            <Frame3959icon
              onClick={() => {
                ExitopenModal();
              }}
            />
          </Frame3959>
        </Topbar>
        <Frame4041>
          <Frame4040>
            <Titleprofile>프로필 이미지</Titleprofile>
            <ProfileImageWrapper>
              <ProfileImage
                src={previewImage || user?.profileImage || <Profile />}
                alt="ProfileImage"
              ></ProfileImage>
              <ImgUpdateCon>
                <Imgupdate />
                <FileInput
                  type="file"
                  accept="image/*"
                  id="img"
                  name="img"
                  ref={imgRef}
                  onChange={handleFileChange}
                />
              </ImgUpdateCon>
            </ProfileImageWrapper>
          </Frame4040>
          <TextArea>
            <Titleprofile>이름</Titleprofile>
            <Frame4094>
              <Field height={40}>
                <Content1
                  maxLength="9"
                  value={nameInput}
                  placeholder={user?.memberName}
                  onChange={memberNameHanlder}
                />
              </Field>
              <Frame4031>
                {nameInput.length > 9 ? (
                  <SupportText color={'red'}>
                    닉네임은 최대 10자 입니다. {nameInput.length} / 10
                  </SupportText>
                ) : (
                  <SupportText color={'#98a2b3'}>{nameInput.length} / 10</SupportText>
                )}
              </Frame4031>
            </Frame4094>
          </TextArea>
          <TextArea>
            <Titleprofile>자기소개</Titleprofile>
            <Frame4094>
              <Field height={100}>
                <Content2
                  maxLength="49"
                  value={introduceInput}
                  placeholder={user?.introduce}
                  onChange={introduceHanlder}
                />
              </Field>
              <Frame4031>
                {introduceInput.length > 49 ? (
                  <SupportText color={'red'}>
                    자기소개는 최대 40자 입니다. {introduceInput.length} / 50
                  </SupportText>
                ) : (
                  <SupportText color={'#98a2b3'}>{introduceInput.length} / 50</SupportText>
                )}
              </Frame4031>
            </Frame4094>
          </TextArea>
        </Frame4041>
        <UpdateButton type="submit">
          <ButtonPrimary>
            <ButtonTitle>수정하기</ButtonTitle>
          </ButtonPrimary>
        </UpdateButton>
      </OutCon>
      {isExitModalOpen && (
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
                <ExitName>수정을 취소하시겠습니까?</ExitName>
                <ExitText>나가면 수정사항이 저장되지 않습니다.</ExitText>
                <ExitBtnDiv>
                  <ExitCancel
                    onClick={() => {
                      ExitcloseModal();
                    }}
                  >
                    머무르기
                  </ExitCancel>
                  <EixtBtn
                    onClick={() => {
                      navigate('/mypage');
                    }}
                  >
                    나가기
                  </EixtBtn>
                </ExitBtnDiv>
              </ExitModal>
            </ExitContainer>
          </Modals>
        </div>
      )}
    </>
  );
}

export default UserUpdate;

const OutCon = styled.form`
  width: 360px;
  height: 100%;
  margin: 0 auto;
  background: #ffffff;
`;

const Topbar = styled.div`
  width: 360px;
  height: 52px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f2f4f7;
`;

const Title = styled.div`
  width: 100px;
  height: 16px;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  text-align: center;
  letter-spacing: -0.015em;
  color: #1d2939;
`;

const Frame3959 = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 0px 16px 0px 0px;
  width: 40px;
  height: 24px;
`;

const Frame4041 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px 0px 0px;
  width: 328px;
  height: 352px;
  margin: 0 auto;
`;

const Frame4040 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px 0px 24px;
  gap: 8px;
  width: 328px;
  height: 114px;
`;

const Titleprofile = styled.div`
  width: 328px;
  height: 12px;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 100%;
  letter-spacing: -0.015em;
  color: #2f3036;
`;

const ProfileImageWrapper = styled.div`
  position: relative;
  width: 70px;
  height: 70px;
  object-fit: cover;
`;

const ImgUpdateCon = styled.label`
  position: absolute;
  bottom: 6%;
  right: 7%;
  border-radius: 8px;
  cursor: pointer;
  input[type='file'] {
    display: none;
  }
`;

const TextArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px 0px 24px;
  gap: 8px;
  width: 328px;
  height: 102px;
`;

const Frame4094 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 0px;
  gap: 8px;
  width: 328px;
`;

const Field = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 12px 16px;
  gap: 8px;
  width: 328px;
  height: ${props => props.height}px;
  border: 1px solid #c5c6cc;
  border-radius: 12px;
`;

const Content1 = styled.textarea`
  padding: 0px;
  width: 296px;
  height: 14px;
  border: none;
  outline: none;
`;

const Content2 = styled.textarea`
  padding: 0px;
  width: 296px;
  border: none;
  outline: none;
  white-space: pre-wrap;
`;

const Frame4031 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 0px;
  gap: 2px;
  width: 32px;
  height: 10px;
`;

const SupportText = styled.div`
  width: auto;
  height: 10px;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 100%;
  display: flex;
  align-items: center;
  letter-spacing: 0.015em;
  color: ${props => props.color};
  white-space: nowrap;
`;

const ProfileImage = styled.img`
  width: 70px;
  height: 70px;
  left: 0px;
  top: 0px;
  border-radius: 16px;
  object-fit: cover;
`;

const FileInput = styled.input`
  position: relative;
  background-color: #ffffff;
  width: 150px;
  height: auto;
  cursor: pointer;
`;

const UpdateButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  width: 328px;
  height: 48px;
  bottom: 24px;
  margin: 12% auto;
`;

const ButtonPrimary = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 16px;
  gap: 8px;
  width: 328px;
  height: 48px;
  background: #f63d68;
  border: 1px solid #f63d68;
  border-radius: 12px;
`;

const ButtonTitle = styled.div`
  width: 45px;
  height: 15px;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  color: #ffffff;
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
