import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { PARTIES_URL, PATH_URL } from '../../shared/constants';
import styled from 'styled-components';

// 이미지 import
import { ReactComponent as ApproveBack } from '../../assets/party/partyapproveX.svg';
import { ReactComponent as Check } from '../../assets/party/approvecheck.svg';
import { ReactComponent as Warning } from '../../assets/party/reporticon.svg';
import queryString from 'query-string';
import { postAPI } from '../../api/api';

export const PartyApply = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const queryObj = queryString.parse(location.search);
  const { partyId } = queryObj;

  const [reason, setReason] = useState();
  const [amountAlcohol, setAmountAlcohol] = useState();
  const [limitInput, setLimitInput] = useState();
  const [approveInput, setApproveInput] = useState();

  // 주량
  const limitInputHandler = e => {
    setLimitInput(e.target.value);
    setAmountAlcohol(e.target.value);
  };

  // 신청이유
  const approveInputHandler = e => {
    setApproveInput(e.target.value);
    setReason(e.target.value);
  };

  const ApplicationButtonHandler = e => {
    if (reason && reason.length < 5) {
      alert('신청이 불가합니다. 모임 신청 이유를 5글자 이상으로 입력해주세요.');
      return;
    }

    if (amountAlcohol && amountAlcohol.length < 2) {
      alert('신청이 불가합니다. 주량을 2글자 이상으로 입력해주세요.');
      return;
    }

    const data = {
      reason,
      amountAlcohol,
    };

    postAPI(`${PARTIES_URL.PARTIES_APPLICATION}/${partyId}`, data)
      .then(response => {
        alert(response.data.msg);
        navigate(`${PATH_URL.PARTY_DETAIL}/${partyId}`);
      })
      .catch(e => console.log('e ::', e));
  };

  return (
    <>
      <Background>
        <Container>
          <Topbar>
            <TopbarName>모임 신청하기</TopbarName>
            <Link to={`${PATH_URL.PARTY_DETAIL}/${partyId}`}>
              <ApproveBackdiv>
                <ApproveBack />
              </ApproveBackdiv>
            </Link>
          </Topbar>
          <Contents>
            <ApproveDiv>
              <div
                style={{
                  width: '328px',
                  height: '120px',
                  margin: '0 auto',
                  alignItems: 'flex-start',
                  flexDirection: 'row',
                }}
              >
                <ApproveName>내 주량</ApproveName>
                {limitInput?.length === 1 ? (
                  <ApprovInputDiv color={'red'}>
                    <textarea
                      type="text"
                      value={(limitInput, amountAlcohol)}
                      maxLength="10"
                      placeholder="예 : 소주 한병, 많이 약해요, 취해본 적이 없어요..."
                      onChange={limitInputHandler}
                      style={{
                        height: '90px',
                        width: '318px',
                        outline: 'none',
                        border: 'none',
                        padding: '5px',
                        margin: 'auto',
                      }}
                    ></textarea>
                  </ApprovInputDiv>
                ) : (
                  <ApprovInputDiv color={'#C5C6CC'}>
                    <textarea
                      type="text"
                      value={(limitInput, amountAlcohol)}
                      maxLength="10"
                      placeholder="예 : 소주 한병, 많이 약해요, 취해본 적이 없어요..."
                      onChange={limitInputHandler}
                      style={{
                        height: '90px',
                        width: '318px',
                        outline: 'none',
                        border: 'none',
                        padding: '5px',
                        margin: 'auto',
                      }}
                    ></textarea>
                  </ApprovInputDiv>
                )}
                {limitInput?.length < 2 ? (
                  <ReportText>
                    <WarninIcon />
                    2자 이상 적어주세요.
                  </ReportText>
                ) : null}
                {limitInput?.length > 9 ? (
                  <LengthDiv color={'red'}> {limitInput?.length || 0} / 10</LengthDiv>
                ) : (
                  <LengthDiv color={'#98a2b3'}> {limitInput?.length || 0} / 10</LengthDiv>
                )}
              </div>
            </ApproveDiv>
            <ApproveDiv>
              <div
                style={{
                  width: '328px',
                  height: '120px',
                  margin: '0 auto',
                  alignItems: 'flex-start',
                  flexDirection: 'row',
                }}
              >
                <ApproveName>모임에 신청한 이유</ApproveName>
                {approveInput?.length < 5 ? (
                  <ApprovInputDiv color={'red'}>
                    <textarea
                      type="text"
                      value={(approveInput, reason)}
                      maxLength="25"
                      placeholder="모임을 신청한 이유를 적어주세요"
                      onChange={approveInputHandler}
                      style={{
                        height: '90px',
                        width: '318px',
                        outline: 'none',
                        border: 'none',
                        padding: '5px',
                        margin: 'auto',
                      }}
                    ></textarea>
                  </ApprovInputDiv>
                ) : (
                  <ApprovInputDiv color={'#C5C6CC'}>
                    <textarea
                      type="text"
                      value={(approveInput, reason)}
                      maxLength="25"
                      placeholder="모임을 신청한 이유를 적어주세요"
                      onChange={approveInputHandler}
                      style={{
                        height: '90px',
                        width: '318px',
                        outline: 'none',
                        border: 'none',
                        padding: '5px',
                        margin: 'auto',
                      }}
                    ></textarea>
                  </ApprovInputDiv>
                )}
                {approveInput?.length < 5 ? (
                  <ReportText>
                    <WarninIcon />
                    5자 이상 적어주세요.
                  </ReportText>
                ) : null}
                {approveInput?.length > 24 ? (
                  <LengthDiv color={'red'}> {approveInput?.length || 0} / 25</LengthDiv>
                ) : (
                  <LengthDiv color={'#98a2b3'}> {approveInput?.length || 0} / 25</LengthDiv>
                )}
              </div>
            </ApproveDiv>
            <BottomDiv>
              <ExplainDiv>
                <ExplainImg>
                  <Check />
                </ExplainImg>
                <ExplainText>
                  자세하게 적어 모임 주최자에게 자신을 소개해보세요! 자세히 적을수록 모임 수락률이
                  높아집니다.
                </ExplainText>
              </ExplainDiv>
              <ApproveBtn
                onClick={() => {
                  ApplicationButtonHandler();
                }}
              >
                모임 신청하기
              </ApproveBtn>
            </BottomDiv>
          </Contents>
        </Container>
      </Background>
    </>
  );
};

const Background = styled.div`
  background: #fff;
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  width: 360px;
  height: 100%;
  margin: 0 auto;
  background: #fff;
`;

// TopBar 스타일
const Topbar = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  align-items: center;
  justify-content: space-between;
  width: 360px;
  height: 52px;
  border-bottom: 1px solid #f2f4f7;
  background: #fff;
  z-index: 10;
`;

const TopbarName = styled.div`
  color: #1d2939;
  font-size: 16px;
  text-align: center;
  flex-grow: 1;
`;

const ApproveBackdiv = styled.div`
  width: 24px;
  height: 24px;
  position: absolute;
  margin-right: 16px;
  bottom: 0;
  right: 0;
  margin-bottom: 14px;
`;

// Contents 스타일
const Contents = styled.div`
  padding-top: 70px;
  width: 360px;
`;

const ApproveDiv = styled.div`
  width: 360px;
  height: 178px;
`;

const ApprovInputDiv = styled.div`
  display: flex;
  width: 328px;
  height: 100px;
  background: #fff;
  border: 1px solid ${props => props.color};
  border-radius: 12px;
`;

const ApproveName = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: #2f3036;
  margin-bottom: 8px;
`;

const LimitInput = styled.input`
  width: 296px;
  height: 14px;
  margin: 0 auto;
  margin-top: 12px;
  border: none;
  outline: none;
`;

const ApproveReason = styled.input`
  width: 296px;
  height: 14px;
  margin: 0 auto;
  margin-top: 12px;
  border: none;
  outline: none;
`;

const LengthDiv = styled.div`
  font-size: 10px;
  font-weight: 400;
  color: ${props => props.color};
  margin-top: 8px;
  float: right;
`;

const ReportText = styled.div`
  position: absolute;
  display: flex;
  font-size: 10px;
  color: #f04438;
  margin-top: 8px;
`;

const WarninIcon = styled(Warning)`
  margin-right: 4px;
`;

const BottomDiv = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding-bottom: 80px;
`;

// 설명 스타일
const ExplainDiv = styled.div`
  display: flex;
  width: 328px;
  height: 50px;
  margin: 0 auto;
  background: #f2f4f7;
  border-radius: 8px;
  margin-bottom: 20px;
  padding: 12px 0px 12px 16px;
`;

const ExplainImg = styled.div`
  width: 10px;
  height: 10px;
`;

const ExplainText = styled.div`
  font-size: 10px;
  font-weight: 400;
  color: #475467;
  margin-left: 4px;
  max-width: 212px;
  line-height: 15px;
`;

// 버튼 스타일
const ApproveBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  width: 328px;
  height: 48px;
  margin: 0 auto;
  background-color: #f63d68;
  border: 1px solid #f63d68;
  border-radius: 12px;
  margin-bottom: 8px;
  cursor: pointer;
`;
