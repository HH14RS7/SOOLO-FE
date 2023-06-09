import { useQuery } from 'react-query';
import { getAPI } from '../../api/api';
import { PARTIES_URL } from '../../shared/constants';
import MyPartyItem from './MyPartyItem';
import { styled } from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const MyPartyList = () => {
  const { data, isLoading, error } = useQuery('myParties', () =>
    getAPI(`${PARTIES_URL.MY_PARTIES_LIST}`),
  );

  const partyList = data?.data.data;

  if (isLoading) {
    return <div>로딩중입니다.</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <>
      <Title>신청한 모임</Title>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={150}
        slidesPerView={2}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
      >
        {partyList?.length > 0 && (
          <Wrapper>
            <PartyList>
              {partyList?.map(party => (
                <SwiperSlide key={party.partyId}>
                  <MyPartyItem key={party.partyId} party={party} />
                </SwiperSlide>
              ))}
            </PartyList>
          </Wrapper>
        )}
      </Swiper>
    </>
  );
};

const Wrapper = styled.section`
  width: 360px;
  margin: 0 auto;
  height: 100%;
`;

const Title = styled.h4`
  color: var(--color-gray-500);
  white-space: nowrap;
  padding: 0 0 1rem 8px;
`;

const StyledSwiper = styled(Swiper)`
  height: 146px;
`;

const PartyList = styled.div`
  margin-top: 1rem;
  // padding: 0 1rem;
  display: flex;
  align-items: flex-start;
  // gap: 1rem;
  width: 500px;
  height: 146px;
`;

export default MyPartyList;
