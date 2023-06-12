import React, { useState } from 'react';
import SelectedPartyItem from './SelectedPartyItem';
import { styled } from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function SelectedPartyList({ partyList }) {
  const spaceBetween = partyList.length === 1 ? 24 : -24;

  return (
    <>
      <ListWrapper>
        <Swiper modules={[Navigation, Pagination]} spaceBetween={spaceBetween} slidesPerView={1}>
          {partyList?.map(party => (
            <SwiperSlide key={party.partyId}>
              <SelectedPartyItem key={party.partyId} party={party} />
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
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  position: relative;
  bottom: 250px;
  z-index: 10;
`;
