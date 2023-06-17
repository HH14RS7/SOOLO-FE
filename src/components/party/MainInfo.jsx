import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { styled } from 'styled-components';
import LoginModal from '../../components/LoginModal';

export default function MainInfo() {
  const token = Cookies.get('Access_key');
  const [showModal, setShowModal] = useState(false);

  const goForms = () => {
    if (token) {
      window.open('https://forms.gle/PAFUCTugD5KZqAHx6', '_blank');
    } else {
      setShowModal(true);
    }
  };

  return (
    <InfoSection>
      {showModal && <LoginModal />}
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
