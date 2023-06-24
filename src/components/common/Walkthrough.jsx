import React, { useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Swiper.css';

import { useNavigate } from 'react-router-dom';
import { PATH_URL } from '../../shared/constants';

const Walkthrough = () => {
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const mockupHeight = 503.55;
  const goMain = () => {
    navigate(PATH_URL.MAIN);
  };

  useEffect(() => {
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);
  const navigate = useNavigate();

  const images = ['/img/mockup1.png', '/img/mockup2.png', '/img/mockup3.png'];
  const subImage = '/img/mockup-sub.png';

  const messages = [
    {
      message1: '다양한 술 모임을',
      message2: '빠르게 찾아보세요',
      subMessage1: '내가 원하는 위치, 시간대에 맞춰 모임을 찾거나',
      subMessage2: '개최하며 다양한 사람과 술자리를 즐길 수 있습니다.',
    },
    {
      message1: '승인제를 통해 나와 술 취향이',
      message2: '맞는 사람을 만날 수 있어요',
      subMessage1: '주량, 모임에 참여하고 싶은 이유 등 간단한',
      subMessage2: '서로의 정보를 보고 만날 사람에 대해 알아보세요.',
    },
    {
      message1: '모임 나가기 전, 만날 사람들과',
      message2: '대화를 해보세요',
      subMessage1: '함께 만날 사람들과 이야기를 나누고, 모여서 어떤 술을',
      subMessage2: '마실지, 안주를 먹을지 고민할 수 있습니다.',
    },
  ];

  const handleSlideChange = swiper => {
    const nextIndex = swiper.activeIndex;
    setActiveIndex(nextIndex);
  };

  const handleSkip = () => {
    const nextIndex = activeIndex + 1;
    if (nextIndex < images.length) {
      setActiveIndex(nextIndex);
      swiperRef.current.swiper.slideTo(nextIndex);
    }
  };

  return (
    <>
      <Container>
        {activeIndex !== 2 && <SkipButton onClick={goMain}>SKIP</SkipButton>}
        <Wrapper>
          <StSwiper
            ref={swiperRef}
            modules={[Navigation, Pagination]}
            mousewheel={true}
            keyboard={true}
            grabCursor={true}
            pagination={{ clickable: true }}
            onSlideChange={handleSlideChange}
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <Mockup
                  src={image}
                  alt={`mockup${index + 1}`}
                  style={{
                    top: viewportHeight < 800 ? `${viewportHeight - mockupHeight - 70}px` : '230px',
                  }}
                />
              </SwiperSlide>
            ))}
          </StSwiper>
          {activeIndex === 1 && <SubImage src={subImage} alt="subImage" />}
          <Bottom
            style={{
              top: `${viewportHeight - 260}px`,
            }}
          >
            <Info>
              <Message>{messages[activeIndex].message1}</Message>
              <Message>{messages[activeIndex].message2}</Message>
              <SubMessageWrapper>
                <SubMessage>{messages[activeIndex].subMessage1}</SubMessage>
                <SubMessage>{messages[activeIndex].subMessage2}</SubMessage>
              </SubMessageWrapper>
            </Info>
            <Button
              activeindex={activeIndex}
              onClick={() => {
                handleSkip();
                if (activeIndex === 2) {
                  goMain();
                }
              }}
            >
              <ButtonTitle activeindex={activeIndex}>
                {activeIndex === 2 ? 'Soolo 시작하기' : '다음'}
              </ButtonTitle>
            </Button>
          </Bottom>
        </Wrapper>
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 360px;
  height: 100vh;
  margin: 0 auto;
  background: var(--color-primary-500);
  position: relative;
`;

const SkipButton = styled.button`
  width: 26px;
  height: 12px;
  font-style: normal;
  font-weight: var(--font-weight-700);
  font-size: 12px;
  line-height: 100%;
  letter-spacing: -0.015em;
  color: var(--color-primary-200);
  position: absolute;
  top: 24px;
  right: 16px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  cursor: pointer;
  z-index: 10;
`;

// 목업 info 감싼거
const Wrapper = styled.div`
  height: 100vh;
`;

const StSwiper = styled(Swiper)`
  height: 100vh;
  bottom: 0px;
  margin: 0 auto;
`;

const Mockup = styled.img`
  position: relative;
  width: 250px;

  height: 503.55px;
  left: calc(50% - 250px / 2);
  filter: drop-shadow(10px 4px 4px rgba(0, 0, 0, 0.1));
`;

const SubImage = styled.img`
  position: absolute;
  bottom: 254px;
  @media (min-height: 800px) {
    top: 400px;
  }
  user-select: none;
  z-index: 10;
`;

const Bottom = styled.div`
  z-index: 30;
  position: absolute;
  width: 360px;
  height: 260px;
  bottom: 0px;
  background: #ffffff;
  box-shadow: 0px -11px 67px rgba(0, 0, 0, 0.1);
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 360px;
  align-items: center;
  margin-top: 3rem;
`;

const Message = styled.h4`
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 100%;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -0.015em;
  color: #1d2939;
`;

const SubMessageWrapper = styled.div`
  margin-top: 4px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const SubMessage = styled.h4`
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -0.015em;
  color: #475467;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 16px;
  width: 328px;
  height: 48px;
  border: 1.5px solid var(--color-primary-500);
  border-radius: 12px;
  margin: 0 auto;
  margin-top: 3rem;
  background: ${props =>
    props.activeindex === 2 ? 'var(--color-primary-500)' : 'var(--color-white)'};
`;

const ButtonTitle = styled.p`
  font-weight: var(--font-weight-700);
  font-size: 12px;
  color: ${props => (props.activeindex === 2 ? 'var(--color-white)' : 'var(--color-primary-500)')};
`;
export default Walkthrough;
