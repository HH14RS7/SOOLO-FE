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
      {partyList?.length > 0 && (
        <>
          <Title>신청한 모임</Title>
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={-100}
            // pagination={{ clickable: true }}
            // scrollbar={{ draggable: true }}/
            observer={true}
            observeParents={true}
            slidesPerView={1}
            slidesOffsetAfter={-96}
            slidesOffsetBefore={8}
          >
            <Wrapper>
              <PartyList>
                {partyList.map(party => (
                  <SwiperSlide key={party.partyId}>
                    <MyPartyItem key={party.partyId} party={party} />
                  </SwiperSlide>
                ))}
              </PartyList>
            </Wrapper>
          </Swiper>
        </>
      )}
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
  padding: 0 0 1rem 1rem;
`;

const PartyList = styled.div`
  margin-top: 1rem;
  display: flex;
  align-items: flex-start;
  height: 146px;
`;

export default MyPartyList;
