import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import marker from '../../assets/marker.svg';
import useGeolocation from '../../hooks/useGeolocation';
import { styled } from 'styled-components';
import ReactDOMServer from 'react-dom/server';
import SelectedPartyItem from './SelectedPartyItem';
const { kakao } = window;

const PartyMapContainer = ({ searchPlace, partyInfo }) => {
  const location = useLocation();
  const currentloaction = useGeolocation();
  const mapRef = useRef();
  const markersRef = useRef([]);
  const [selectedParty, setSelectedParty] = useState(null); // Track the selected party

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
      console.log(searchPlace);
      if (status === kakao.maps.services.Status.OK) {
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        mapRef.current.setCenter(coords);
        markersRef.current.forEach(marker => marker.setMap(null));
      }
    };

    // 검색 키워드 함수 호출
    if (searchPlace) {
      ps.keywordSearch(searchPlace, placesSearchCB);
    }
    const overlayInfos = partyInfo?.map(info => {
      return {
        title: info.placeName,
        lat: info.latitude,
        lng: info.longitude,
        partyId: info.partyId,
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
        // content: content,
        // content: () => content(el.title),
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
        const selected = partyInfo.find(info => info.partyId === el.partyId);
        setSelectedParty(selected);
      });

      // 오버레이 클릭 이벤트
      kakao.maps.event.addListener(customOverlay, 'click', function () {
        const selected = partyInfo.find(info => info.partyId === el.partyId);
        setSelectedParty(selected);
      });

      kakao.maps.event.addListener(mapRef.current, 'click', function () {
        setSelectedParty(null);
      });
    });
  }, [partyInfo]);

  // 현재 위치로 찾기
  const handleCurrentLocation = () => {
    const currentLocation = new kakao.maps.LatLng(latitude, longitude);
    mapRef.current.panTo(currentLocation);
  };

  return (
    <>
      <div
        id="map"
        style={{
          width: '300px',
          height: '300px',
        }}
      />
      <div>
        {selectedParty ? (
          <SelectedPartyItem party={selectedParty} />
        ) : (
          partyInfo?.map(party => (
            <div key={party.partyId}>
              <p>{party.title}</p>
              <p>
                {party.currentCount}/{party.totalCount}
              </p>
              <p>{party.partyDate}</p>
              <p>{party.address}</p>
            </div>
          ))
        )}
      </div>

      <button onClick={handleCurrentLocation}>현재 위치로 찾기</button>
    </>
  );
};

const Wrapper = styled.div`
  border: 1px solid black;
  font-size: 14px;
`;

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

const OverlayArrow = styled.div`
  /* styles for overlayArrow */
`;

const CustomOverlay = styled.div`
  /* styles for customOverlay */
`;
export default PartyMapContainer;
