import React, { useState } from 'react';
import SelectedPartyItem from './SelectedPartyItem';
import { styled } from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

{
  /* <Swiper
modules={[Navigation, Pagination]}
spaceBetween={-100}
// pagination={{ clickable: true }}
// scrollbar={{ draggable: true }}/
observer={true}
observeParents={true}
slidesPerView={1}
slidesOffsetAfter={-96}
slidesOffsetBefore={8}
> */
}
export default function SelectedPartyList({ partyList }) {
  return (
    <>
      <ListWrapper>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={-24}
          slidesPerView={1}
          slidesOffsetAfter={-8}
          slidesOffsetBefore={0}
          // navigation
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
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  position: relative;
  bottom: 250px;
  z-index: 10;
`;
