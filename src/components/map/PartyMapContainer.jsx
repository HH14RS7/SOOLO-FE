import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import marker from '../../assets/marker.svg';
import useGeolocation from '../../hooks/useGeolocation';
import { styled } from 'styled-components';
import ReactDOMServer from 'react-dom/server';
import SelectedPartyItem from './SelectedPartyItem';
import SearchPartyList from './SearchPartyList';
import { QueryClient, useQuery } from 'react-query';
import { PARTIES_URL } from '../../shared/constants';
import { getAPI } from '../../api/api';
const { kakao } = window;

const PartyMapContainer = ({ searchPlace }) => {
  const currentloaction = useGeolocation();
  const mapRef = useRef();
  const markersRef = useRef([]);
  const [selectedParty, setSelectedParty] = useState(null);

  const latitude = currentloaction.coordinates.latitude; // 위도
  const longitude = currentloaction.coordinates.longitude; // 경도
  const queryClient = new QueryClient();

  const centerCoordinate = new kakao.maps.LatLng(37.496777, 127.028185);

  const page = 0; // 임시
  const radius = 10;

  const { data, isLoading, error } = useQuery(
    ['parties'],
    () =>
      // geolocation 로딩중일때는 강남역 초기 세팅
      getAPI(
        `${PARTIES_URL.PARTIES_LIST}?page=${page}&recruitmentStatus=0&latitude=37.496777&longitude=127.028185&radius=${radius}`,
      ),

    // currentloaction.loading
    //   ? getAPI(
    //       `${PARTIES_URL.PARTIES_LIST}?page=${page}&recruitmentStatus=0&latitude=37.496777&longitude=127.028185&radius=${radius}`,
    //     )
    //   : getAPI(
    //       `${PARTIES_URL.PARTIES_LIST}?page=${page}&recruitmentStatus=0&latitude=${latitude}&longitude=${longitude}&radius=${radius}`,
    //     ),
  );

  useEffect(() => {
    const ps = new kakao.maps.services.Places();
    const container = document.getElementById('map');
    const options = {
      center: centerCoordinate,
      level: 6,
      radius: 10000,
    };

    mapRef.current = new kakao.maps.Map(container, options);

    queryClient.invalidateQueries('parties');

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
    };

    // 검색 키워드 함수 호출
    if (searchPlace) {
      ps.keywordSearch(searchPlace, placesSearchCB);
    }

    const overlayInfos =
      partyList?.map(party => {
        return {
          title: party.placeName,
          lat: party.latitude,
          lng: party.longitude,
          partyId: party.partyId,
          yAnchor: 1,
        };
      }) || [];

    // 마커 찍기
    const imageSrc = marker;
    overlayInfos.forEach(el => {
      console.log(el);
      const imageSize = new kakao.maps.Size(24, 35);
      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      const marker = new kakao.maps.Marker({
        map: mapRef.current,
        position: new kakao.maps.LatLng(el.lat, el.lng),
        title: el.title,
        image: markerImage,
      });

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
        // 마커 선택한 중심좌표로 이동
        console.log(markersRef);
        const currentLocation = new kakao.maps.LatLng(selected.latitude, selected.longitude);
        mapRef.current.panTo(currentLocation);
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
  }, [searchPlace, queryClient]);

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
    const updatedUrl = `${PARTIES_URL.PARTIES_LIST}?page=${page}&recruitmentStatus=0&latitude=${latitude}&longitude=${longitude}&radius=${radius}`;
    queryClient.prefetchQuery(['parties'], () => getAPI(updatedUrl));
    queryClient.invalidateQueries('parties');

    const currentLocation = new kakao.maps.LatLng(latitude, longitude);
    mapRef.current.panTo(currentLocation);
  };

  const partyList = data?.data.data.partyList;

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
