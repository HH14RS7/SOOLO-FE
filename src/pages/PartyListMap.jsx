import { styled } from 'styled-components';
import SearchLocation from '../components/map/SearchLocation';
import PartyMapContainer from '../components/map/PartyMapContainer';
import { useRef, useState } from 'react';
export const PartyListMap = () => {
  const partyLists = [
    {
      partyId: 1,
      title: '밤새 술 먹을 파티 구합니다.',
      partyDate: '2023-05-29T22:20',
      recruitmentStatus: false,
      totalCount: 2,
      currentCount: 2,
      latitude: 37.494272356526984,
      longitude: 127.0280802697825,
      placeName: '홀릭스',
      address: '서울 서초구 서초대로77길 24',
    },
    {
      partyId: 2,
      title: '알쓰들의 모임',
      partyDate: '2023-05-30T22:20',
      recruitmentStatus: false,
      totalCount: 4,
      currentCount: 2,
      latitude: 37.5000892164148,
      longitude: 127.028240773556,
      address: '서울 강남구 강남대로96길 15',
      placeName: '하이퍼서울',
    },
    {
      partyId: 3,
      title: '오늘 밤 술 달려봅시다',
      partyDate: '2023-05-31T22:20',
      recruitmentStatus: false,
      totalCount: 4,
      currentCount: 2,
      latitude: 37.4939696557259,
      longitude: 127.027921843719,
      placeName: '먼데이블루스',
      address: '서울 서초구 강남대로53길 11',
    },
    {
      partyId: 4,
      title: '맛있는 안주랑 같이',
      partyDate: '2023-06-03T22:20',
      recruitmentStatus: false,
      totalCount: 5,
      currentCount: 2,
      latitude: 37.495759373328156,
      longitude: 127.03361964276374,
      placeName: '언더그라운드',
      address: '서울 강남구 역삼로9길 25',
    },
    {
      partyId: 5,
      title: '역전할매 ㄱㄱ',
      partyDate: '2023-06-03T22:20',
      recruitmentStatus: false,
      totalCount: 5,
      currentCount: 2,
      latitude: 37.29243939383418,
      longitude: 127.04860740073208,
      placeName: '역전할머니맥주',
      address: '경기 수원시 영통구 센트럴타운로 107',
    },
  ];
  const [place, setPlace] = useState('');

  const handlePlaceChange = value => {
    setPlace(value);
  };
  return (
    <>
      <div>
        <SearchLocation onPlaceChange={handlePlaceChange} />
        <PartyMapContainer searchPlace={place} partyInfo={partyLists} />
        <div>주변 모임 리스트 {partyLists?.length}</div>
        {/* 주변모임리스트의 address와 일치하거나 keyword같은 애들만 나온다. */}
        {/* 현재 위치로 찾기 버튼을 클릭하면 latitude, longitude 가 움직이며 리스트의 내용들의 마커가 반경 중심으로바뀐다. */}
      </div>
    </>
  );
};
