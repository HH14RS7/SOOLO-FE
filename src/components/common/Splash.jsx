import React from 'react';
import { styled, keyframes } from 'styled-components';
import { ReactComponent as Logo } from '../../assets/header/logo.svg';

const Spalash = () => {
  const favicon = process.env.PUBLIC_URL + '/favicon.ico';

  return (
    <>
      <Container>
        <Images>
          <Favicon src={favicon} alt="favicon" />
          <LogoIcon />
        </Images>
        <Info>
          <Message>
            본 서비스는 정식 서비스가 아닌 <Bold>학업용 서비스</Bold>임을 안내드립니다
          </Message>
        </Info>
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 360px;
  height: 100vh;
  margin: 0 auto;
`;

const Images = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin: 0 auto;
  position: absolute;
  top: calc(50% - 96.25px / 2 + 0.12px);
  left: calc(50% - 68px / 2 + 0.5px);
`;

const Favicon = styled.img`
  width: 64px;
  height: 64px;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const LogoIcon = styled(Logo)`
  width: 52.05px;
  height: 18.25px;
  opacity: 0;
  animation: ${fadeIn} 2.5s ease-in-out;
`;

const Info = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 10px 24px;
  height: 30px;
  width: auto;
  left: calc(50% - 304px / 2 + 0.5px);
  bottom: 50px;
  background: rgba(0, 0, 0, 0.05);
  border: 1px solid var(--color-gray-300);
  border-radius: 999px;
`;

const Message = styled.p`
  letter-spacing: 0.015em;
  color: var(--color-gray-800);
`;

const Bold = styled.span`
  font-weight: var(--font-weight-600);
`;

export default Spalash;
