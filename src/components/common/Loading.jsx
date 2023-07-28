import React from 'react';
import { BeatLoader, MoonLoader } from 'react-spinners';
import { styled } from 'styled-components';

export default function Loading({ type }) {
  return (
    <>
      {type === 'circle' ? (
        <Container>
          <MoonLoader color="#F63D68" size={20} />
        </Container>
      ) : (
        <LoadingOverlay>
          <BeatLoader color="#F63D68" speedMultiplier={2} />
        </LoadingOverlay>
      )}
    </>
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
  z-index: 50;
`;

const Container = styled.div`
  transition: opacity 0.3s ease-in-out;
`;
