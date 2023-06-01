import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import marker from '../../assets/marker.svg';
import useGeolocation from '../../hooks/useGeolocation';
import { styled } from 'styled-components';
import ReactDOMServer from 'react-dom/server';
import SelectedPartyItem from './SelectedPartyItem';
import SearchPartyList from './SearchPartyList';
const { kakao } = window;
const partyList = [
  {
    partyId: 1,
    title: '밤새 술 먹을 파티 구합니다.',
    partyDate: '2023-05-29T22:20',
    recruitmentStatus: false,
    totalCount: 2,
    currentCount: 2,
    latitude: 37.5022613873809,
    longitude: 127.052438975201,
    placeName: '센도수산',
    placeAddress: '서울 강남구 역삼로65길 15',
    distance: 395,
    stationName: '선릉역 2호선',
    placeUrl: 'http://place.map.kakao.com/418495008',
    image:
      'https://images.unsplash.com/photo-1578911373434-0cb395d2cbfb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
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
    placeAddress: '서울 강남구 강남대로96길 15',
    placeName: '하이퍼서울',
    distance: 251,
    stationName: '언주역 2호선',
    placeUrl: 'https://place.map.kakao.com/602523043',
    image:
      'https://images.unsplash.com/photo-1578911373434-0cb395d2cbfb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
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
    placeAddress: '서울 서초구 강남대로53길 11',
    distance: 252,
    placeUrl: 'https://place.map.kakao.com/27113679',
    stationName: '강남역',
    image:
      'https://images.unsplash.com/photo-1578911373434-0cb395d2cbfb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
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
    placeAddress: '서울 강남구 역삼로9길 25',
    distance: 1000,
    placeUrl: 'https://place.map.kakao.com/300436372',
    image:
      'https://images.unsplash.com/photo-1578911373434-0cb395d2cbfb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
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
    placeName: '역전할머니맥주 광교중앙점',
    placeAddress: '경기 수원시 영통구 센트럴타운로 107',
    distance: 1003,
    placeUrl: 'https://place.map.kakao.com/1621313528',
    stationName: '광교중앙역',
    image:
      'https://images.unsplash.com/photo-1578911373434-0cb395d2cbfb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
  },
];
const PartyMapContainer = ({ searchPlace }) => {
  const location = useLocation();
  const currentloaction = useGeolocation();
  const mapRef = useRef();
  const markersRef = useRef([]);
  const [selectedParty, setSelectedParty] = useState(null);

  const latitude = currentloaction.coordinates.latitude; // 위도
  const longitude = currentloaction.coordinates.longitude; // 경도
  const centerCoordinate = new kakao.maps.LatLng(37.496777, 127.028185); // 중심 좌표(강남역)

  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: centerCoordinate,
      level: 5,
      // radius: 10000,
    };

    mapRef.current = new kakao.maps.Map(container, options);
  }, [location]);

  useEffect(() => {
    const ps = new kakao.maps.services.Places();

    const placesSearchCB = (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        mapRef.current.setCenter(coords);
        markersRef.current.forEach(marker => marker.setMap(null));
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert('검색 결과가 존재하지 않습니다.');
        return;
      } else if (status === kakao.maps.services.Status.ERROR) {
        alert('검색 결과 중 오류가 발생했습니다.');
        return;
      }
      // get요청으로 partyList받아와야함
    };

    // 검색 키워드 함수 호출
    if (searchPlace) {
      ps.keywordSearch(searchPlace, placesSearchCB);
    }

    const overlayInfos = partyList?.map(party => {
      return {
        title: party.placeName,
        lat: party.latitude,
        lng: party.longitude,
        partyId: party.partyId,
        yAnchor: 1,
      };
    });

    // 마커 찍기
    const imageSrc = marker;
    overlayInfos.forEach(el => {
      const imageSize = new kakao.maps.Size(24, 35);
      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      const marker = new kakao.maps.Marker({
        map: mapRef.current,
        position: new kakao.maps.LatLng(el.lat, el.lng),
        title: el.title,
        image: markerImage,
      });

      // 기존 마커 제거
      const overlayContent = ReactDOMServer.renderToString(
        <OverlayWrap>
          <PlaceName>{el.title}</PlaceName>
          <OverlayArrow />
        </OverlayWrap>,
      );

      const position = new kakao.maps.LatLng(el.lat, el.lng);
      const customOverlay = new kakao.maps.CustomOverlay({
        position: position,
        content: overlayContent,
      });

      // 마커에 mouseover시 오버레이(가게명)
      kakao.maps.event.addListener(marker, 'mouseover', function () {
        customOverlay.setMap(mapRef.current);
      });

      kakao.maps.event.addListener(marker, 'mouseout', function () {
        setTimeout(function () {
          customOverlay.setMap();
        });
      });

      // 마커 클릭시 목록 출력
      kakao.maps.event.addListener(marker, 'click', function () {
        const selected = partyList.find(party => party.partyId === el.partyId);
        setSelectedParty(selected);
        markersRef.current.push(marker);
      });

      // 오버레이 클릭 이벤트
      kakao.maps.event.addListener(customOverlay, 'click', function () {
        const selected = partyList.find(party => party.partyId === el.partyId);
        setSelectedParty(selected);
      });

      kakao.maps.event.addListener(mapRef.current, 'click', function () {
        setSelectedParty(null);
      });
    });
    // unmount될 때 마커 제거
    return () => {
      markersRef.current.forEach(marker => {
        marker.setMap(null);
      });
      markersRef.current = [];
    };
  }, [searchPlace, partyList]);

  const zoomIn = () => {
    const map = mapRef.current;
    map.setLevel(map.getLevel() - 1);
  };

  const zoomOut = () => {
    const map = mapRef.current;
    map.setLevel(map.getLevel() + 1);
  };

  // 현재 위치로 찾기
  const handleCurrentLocation = () => {
    // latitude, longtitude로 get요청해서 받은 목록을 보여줘야 한다.
    const currentLocation = new kakao.maps.LatLng(latitude, longitude);
    mapRef.current.panTo(currentLocation);
  };

  return (
    <>
      <Map id="map">
        <ZoomControlContainer>
          <ZoomButton onClick={zoomIn}>
            <img
              src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_plus.png"
              alt="확대"
            />
          </ZoomButton>
          <ZoomButton onClick={zoomOut}>
            <img
              src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_minus.png"
              alt="축소"
            />
          </ZoomButton>
        </ZoomControlContainer>{' '}
      </Map>
      <button onClick={handleCurrentLocation}>현재 위치로 찾기</button>
      <div>
        {selectedParty ? (
          <SelectedPartyItem party={selectedParty} />
        ) : (
          <SearchPartyList partyList={partyList} />
        )}
      </div>
    </>
  );
};

const OverlayWrap = styled.div`
  background-color: var(--color-primary-500);
  border: 1px solid var(--color-primary-700);
  width: 111px;
  height: 40px;
  border-radius: 8px;
  flex: display;
  justify-content: center;
  align-items: center;
`;

const PlaceName = styled.h1`
  color: var(--color-gray-25);
  font-size: var(--font-small);
`;

const Map = styled.div`
  // top: 200px;
  width: 300px;
  height: 300px;
  position: relative;
`;

const ZoomControlContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  flex-direction: column;
  z-index: 99;
`;

const ZoomButton = styled.span`
  cursor: pointer;
  padding: 5px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 3px;
  margin-bottom: 2px;

  &:last-child {
    margin-bottom: 0;
  }

  img {
    width: 12px;
    height: 12px;
  }
`;
const OverlayArrow = styled.div``;

export default PartyMapContainer;
