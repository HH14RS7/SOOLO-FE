import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export const Modal = ({ title, subTitle, text1, onClick }) => {
  const navigate = useNavigate();

  return (
    <>
      <>
        <Modals>
          <ExitContainer>
            <ExitModal>
              <ExitName>{title}</ExitName>
              <ExitText>{subTitle}</ExitText>
              <ExitBtnDiv>
                <EixtBtn
                  onClick={() => {
                    navigate('/user/login');
                  }}
                >
                  {text1}
                </EixtBtn>
              </ExitBtnDiv>
            </ExitModal>
          </ExitContainer>
        </Modals>
      </>
    </>
  );
};

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

const EixtBtn = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  color: #fff;
  font-weight: 600;
  font-size: 12px;
  width: 295px;
  height: 48px;
  background: #f63d68;
  border-radius: 12px;
  cursor: pointer;
`;
