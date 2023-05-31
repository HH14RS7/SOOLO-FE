import React from 'react';
import { PropagateLoader } from 'react-spinners';
import { styled } from 'styled-components';

export default function Loading() {
  return (
    <LoadingOverlay>
      <LoadingContainer>
        <PropagateLoader color="#1977F2" height={15} width={5} radius={2} margin={2} />
        <LoadingText>
          로딩중입니다.
          <br />
          잠시만 기다려주세요.
        </LoadingText>
      </LoadingContainer>
    </LoadingOverlay>
  );
}

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 50;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-color: white;
`;

const LoadingText = styled.p`
  margin-top: 10px;
  font-size: 16px;
  text-align: center;
`;
