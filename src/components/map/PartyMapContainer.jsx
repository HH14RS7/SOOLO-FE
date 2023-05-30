import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import marker from '../../assets/marker.svg';
import useGeolocation from '../../hooks/useGeolocation';
const { kakao } = window;

const PartyMapContainer = ({ searchPlace, partyInfo }) => {
  const location = useLocation();
  const currentloaction = useGeolocation();
  const mapRef = useRef();
  const markersRef = useRef([]);

  const latitude = currentloaction.coordinates.latitude; // 위도
  const longitude = currentloaction.coordinates.longitude; // 경도
  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(37.496777, 127.028185),
      level: 5,
    };

    mapRef.current = new kakao.maps.Map(container, options);
  }, [location]);

  useEffect(() => {
    const ps = new kakao.maps.services.Places();
    const placesSearchCB = (result, status) => {
      console.log(searchPlace);
      if (status === kakao.maps.services.Status.OK) {
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        // console.log('현재위치', coords);
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
      // markersRef.current = [];

      // markersRef.current.push(newMarker);

      // 기존 마커 제거

      const content =
        '<div class="overlayWrap">' +
        '    <div class="accommInfoWrap">' +
        `        <h1 class="accommName">${el.title}</h1>` +
        '    </div>' +
        '    <div class="overlayArrow">' +
        '</div>';

      const position = new kakao.maps.LatLng(el.lat, el.lng);
      const customOverlay = new kakao.maps.CustomOverlay({
        position: position,
        content: content,
      });

      kakao.maps.event.addListener(marker, 'mouseover', function () {
        customOverlay.setMap(mapRef.current);
      });

      kakao.maps.event.addListener(marker, 'mouseout', function () {
        setTimeout(function () {
          customOverlay.setMap();
        });
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
      <button onClick={handleCurrentLocation}>현재 위치로 찾기</button>
    </>
  );
};

export default PartyMapContainer;
