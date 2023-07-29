import React, { useState } from 'react';
import { ReactComponent as Close } from '../../assets/common/close.svg';
import { useNavigate, useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { useMutation, useQuery } from 'react-query';
import { getAPI, postAPI } from '../../api/api';
import { MEMBER_URL } from '../../shared/constants';
import Loading from '../common/Loading';
import { ReactComponent as ReportNotice2 } from '../../assets/userprofile/report-notice2.svg';
import { ReactComponent as ReportNotice1 } from '../../assets/userprofile/report-notice1.svg';
import { ReactComponent as ReportButton1 } from '../../assets/userprofile/report-button1.svg';
import { ReactComponent as ReportButton2 } from '../../assets/userprofile/report-button2.svg';
import { ReactComponent as Select } from '../../assets/userprofile/select.svg';

function UserReport() {
  const { id: memberId } = useParams();
  const navigate = useNavigate();
  const [reportContentInput, setReportContentInput] = useState('');
  const [reportTypeInput, setReportTypeInput] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const mutation = useMutation(data => postAPI(`${MEMBER_URL.USER_REPORT_POST}`, data), {
    onSuccess: response => {
      alert('신고 완료', response);
      navigate('/');
    },
    onError: error => {
      alert('신고하기 실패 ', error);
    },
  });

  const { data, isLoading } = useQuery('memberInfo', async () => {
    const response = await getAPI(`${MEMBER_URL.TARGET_PAGE_GET}/${memberId}`);
    return response;
  });

  if (isLoading) {
    return <Loading />;
  }

  const user = data?.data?.data;

  const reportContentHanlder = e => {
    setReportContentInput(e.target.value);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handleModalButtonClick = e => {
    setReportTypeInput(e);
    closeModal();
  };

  const reportValues = [
    '개인 연락처 또는 1:1 만남을 요구',
    '부적절한 내용의 프로필',
    '특정 종교의 권유, 포교, 전도 목적의심',
    '사기, 허위, 범죄 등 오해의 소지가 있는 내용',
    '성희롱 혹은 욕설',
    '모임 노쇼 혹은 계산 하지 않음',
    '기타',
  ];

  const onSubmitHandler = async e => {
    e.preventDefault();

    const data = {
      reportContent: reportContentInput,
      reportType: reportTypeInput,
      reportedId: memberId,
    };

    mutation.mutate(data);
  };

  return (
    <>
      <OutCon onSubmit={onSubmitHandler}>
        <Topbar>
          <Frame3959 />
          <Title>신고하기</Title>
          <Frame3959>
            <CloseIcon
              onClick={() => {
                navigate(-1);
              }}
            />
          </Frame3959>
        </Topbar>
        <UserInfoCon marginleft={'16px'} margintop={'19px'}>
          <TextCon>신고대상</TextCon>
          <ContentCon>
            <ProfileImage src={user?.profileImage} alt="ProfileImage" />
            <ContentText>{user?.memberName}</ContentText>
          </ContentCon>
        </UserInfoCon>
        <UserInfoCon marginleft={'16px'} margintop={'30px'}>
          <TextCon>신고유형</TextCon>
          <SelectCon onClick={openModal}>
            {reportTypeInput ? (
              <SelectBox color={'black'}>{reportTypeInput}</SelectBox>
            ) : (
              <SelectBox color={'#98a2b3'}>신고 유형을 선택해주세요.</SelectBox>
            )}
            <Select />
          </SelectCon>
        </UserInfoCon>
        <UserInfoCon marginleft={'16px'} margintop={'34px'}>
          <TextCon>신고내용 (선택)</TextCon>
          <NoticeCon>
            <ReportNotice2 />
          </NoticeCon>
          <Field>
            <Content
              maxLength="199"
              value={reportContentInput}
              placeholder={'신고 내용을 간략하게 입력해주세요.'}
              onChange={reportContentHanlder}
              rows={'5'}
            />
          </Field>
          <Frame4031>
            {reportContentInput.length > 199 ? (
              <SupportText color={'red'}>
                신고 내용은 최대 200자 입니다. {reportContentInput.length} / 200
              </SupportText>
            ) : (
              <SupportText color={'#98a2b3'}>{reportContentInput.length} / 200</SupportText>
            )}
          </Frame4031>
          <ReportNotice1 />
          <div style={{ marginTop: '16px' }}>
            {reportTypeInput ? (
              <button type="submit">
                <ReportButton2 />
              </button>
            ) : (
              <ReportButton1 />
            )}
          </div>
        </UserInfoCon>
      </OutCon>
      {isModalOpen && (
        <div>
          <Modals onClick={handleBackdropClick}>
            <ModalContent>
              <ModalMenuBar>신고 유형</ModalMenuBar>
              {reportValues.map(value => (
                <ModalValue key={value} onClick={() => handleModalButtonClick(value)}>
                  {value}
                </ModalValue>
              ))}
            </ModalContent>
          </Modals>
        </div>
      )}
    </>
  );
}

export default UserReport;

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

const CloseIcon = styled(Close)`
  fill: #1d2939;
  width: 24px;
  height: 24px;
`;

const UserInfoCon = styled.div`
  margin-left: ${props => props.marginleft};
  margin-right: ${props => props.marginleft};
  margin-top: ${props => props.margintop};
`;

const TextCon = styled.div`
  width: 44px;
  height: 12px;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 100%;
  display: flex;
  align-items: center;
  letter-spacing: -0.015em;
  color: #1d2939;
  white-space: nowrap;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  object-fit: cover;
`;

const ContentCon = styled.div`
  margin-top: 9px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ContentText = styled.div`
  width: auto;
  height: 14px;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  display: flex;
  align-items: center;
  letter-spacing: -0.015em;
  color: #475467;
`;

const SelectCon = styled.div`
  margin-top: 8px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 16px;
  width: 328px;
  height: 48px;
  border: 1px solid #98a2b3;
  border-radius: 12px;
  cursor: pointer;
`;

const SelectBox = styled.div`
  color: ${props => props.color};
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  display: flex;
  align-items: center;
  letter-spacing: -0.015em;
  padding: 0px;
  gap: 1px;
  width: 300px;
  height: auto;
  border: none;
  cursor: pointer;
`;

const NoticeCon = styled.div`
  margin-top: 8px;
`;

const Field = styled.div`
  padding: 12px 16px;
  width: 328px;
  height: 100px;
  border: 1px solid #c5c6cc;
  border-radius: 12px;
  margin-top: 8px;
`;

const Frame4031 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 32px;
  height: 10px;
  margin-left: auto;
  margin-top: 8px;
  margin-bottom: 58px;
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

const Content = styled.textarea`
  width: 296px;
  height: 76px;
  border: none;
  outline: none;
`;

// 모달
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

const ModalContent = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  text-align: center;
  background-color: white;
  width: 360px;
  height: auto;
  border-radius: 16px 16px 0px 0px;
  margin: 0 auto;
  bottom: 0px;
`;

const ModalMenuBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 52px;
  font-size: 16px;
  font-weight: 400;
`;

const ModalValue = styled.button`
  display: flex;
  align-items: center;
  padding: 16px;
  font-size: 16px;
  width: 330px;
  height: 48px;
`;
