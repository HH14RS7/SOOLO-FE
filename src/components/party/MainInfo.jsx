import React from 'react';
import { styled } from 'styled-components';

export default function MainInfo() {
  return (
    <InfoSection>
      <InfoTitle>반가워요!🍷 </InfoTitle>
      <InfoTitle>우리 함께 달려볼까요?</InfoTitle>
    </InfoSection>
  );
}

/* InfoSection */
const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 36px 1rem;
  display: flex;
`;

const InfoTitle = styled.div`
  gap: 30px;
  font-size: 1.5rem;
  font-weight: var(--font-weight-700);
  letter-spacing: -0.015em;
  text-align: left;
`;
