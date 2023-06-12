import React from 'react';
import { BeatLoader } from 'react-spinners';
import { styled } from 'styled-components';

export default function Loading() {
  return (
    <LoadingOverlay>
      <BeatLoader color="#F63D68" speedMultiplier={0.8} />
    </LoadingOverlay>
  );
}

const LoadingOverlay = styled.div`
  position: fixed;
  bottom: 72px;
  left: 0 auto;
  width: 360px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 50;
`;
