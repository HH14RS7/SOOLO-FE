import styled from 'styled-components';

export const Modal = props => {
  const { type, message, subMessage, cancelName, confirmName, onCancelClick, onConfirmClick } =
    props;

  // one button
  if (type === 'single') {
    return (
      <Container>
        <ModalWrapper>
          <Modals>
            <Message>{message}</Message>
            <SubMessage>{subMessage}</SubMessage>
            <ButtonWrapper>
              <ConfirmBtn width="295px" onClick={onConfirmClick}>
                {confirmName}
              </ConfirmBtn>
            </ButtonWrapper>
          </Modals>
        </ModalWrapper>
      </Container>
    );
  }

  // two button
  if (type === 'both') {
    return (
      <Container>
        <ModalWrapper>
          <Modals>
            <Message>{message}</Message>
            <SubMessage>{subMessage}</SubMessage>
            <ButtonWrapper>
              <CancelBtn onClick={onCancelClick}>{cancelName}</CancelBtn>
              <ConfirmBtn width="140px" onClick={onConfirmClick}>
                {confirmName}
              </ConfirmBtn>
            </ButtonWrapper>
          </Modals>
        </ModalWrapper>
      </Container>
    );
  }

  // non button
  if (type === 'none') {
    return (
      <Container>
        <ModalWrapper>
          <Modals>
            <Message>{message}</Message>
            <SubMessage>{subMessage}</SubMessage>
          </Modals>
        </ModalWrapper>
      </Container>
    );
  }
};

const Container = styled.div`
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

const ModalWrapper = styled.div`
  width: 100%;
  top: 32vh;
  display: flex;
  position: absolute;
`;

const Modals = styled.div`
  text-align: center;
  margin: auto;
  z-index: 100;
  width: ${props => props.width || '327px'};
  height: ${props => props.height || '198px'};
  border-radius: 1rem;
  background: #fff;
`;

const Message = styled.div`
  font-size: 16px;
  font-weight: var(--font-weight-700);
  margin-top: 60px;
`;

const SubMessage = styled.div`
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 36px;
`;

const CancelBtn = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  color: var(--color-gray-500);
  font-size: 0.75rem;
  font-weight: var(--font-weight-600);
  width: 140px;
  height: 48px;
  background: var(--color--white);
  border: 1.5px solid var(--color-gray-500);
  border-radius: 12px;
  cursor: pointer;
`;

const ConfirmBtn = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  color: var(--color-white);
  font-weight: var(--font-weight-600);
  font-size: 0.75rem;
  width: ${props => props.width || '295px'};
  height: 3rem;
  background: var(--color-primary-500);
  border-radius: 0.75rem;
  cursor: pointer;
`;
