import React from 'react';
import SelectedPartyItem from './SelectedPartyItem';
import { styled } from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function SelectedPartyList({ partyList }) {
  return (
    <>
      <ListWrapper>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={350}
          slidesPerView={2}
          // navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
        >
          {partyList?.map(party => (
            <SwiperSlide key={party.partyId}>
              <SelectedPartyItem key={party.partyId} party={party} />ㄴ
            </SwiperSlide>
          ))}
        </Swiper>
      </ListWrapper>
    </>
  );
}
const ListWrapper = styled.ul`
  width: 360px;
  height: 170px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 0.5rem;
  position: relative;
  bottom: 150px;
  z-index: 30;
`;
