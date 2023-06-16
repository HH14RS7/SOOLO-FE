import React from 'react';
import { styled } from 'styled-components';

export default function MainInfo() {
  const goForms = () => {
    window.open(
      'https://docs.google.com/forms/d/12pWAWiklb-Mz8xNg-Kfng8Pi1nd7mU-2mnzsWRGjrBg/edit?ts=64899f93',
      '_blank',
    );
  };

  return (
    <InfoSection>
      <Banner src="/img/banner.png" alt="banner" onClick={goForms} />
      {/* <InfoTitle>반가워요!🍷 </InfoTitle>
      <InfoTitle>우리 함께 달려볼까요?</InfoTitle> */}
    </InfoSection>
  );
}

/* InfoSection */
const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  // padding: 36px 1rem; // 배너용 (추후 복구)
  margin-bottom: 24px; // 배너용(추후 삭제)
  display: flex;
`;

const InfoTitle = styled.div`
  gap: 30px;
  font-size: 1.5rem;
  font-weight: var(--font-weight-700);
  letter-spacing: -0.015em;
  text-align: left;
`;

const Banner = styled.img`
  cursor: pointer;
`;
