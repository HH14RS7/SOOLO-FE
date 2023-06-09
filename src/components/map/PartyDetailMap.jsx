import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate, useHistory } from 'react-router-dom';
import { styled } from 'styled-components';
import { PATH_URL } from '../../shared/constants';
import marker from '../../assets/map/marker.svg';
import { ReactComponent as Add } from '../../assets/map/add.svg';
import { ReactComponent as Subtract } from '../../assets/map/subtract.svg';

const { kakao } = window;
export default function PartyDetailMap({ latitude, longitude }) {
  const mapRef = useRef(null);

  useEffect(() => {
    // Kakao 지도 API 로드가 완료되었는지 확인
    if (window.kakao && window.kakao.maps) {
      const container = mapRef.current;
      const position = new kakao.maps.LatLng(latitude, longitude);

      const options = {
        center: position,
        level: 3,
      };

      const map = new window.kakao.maps.Map(container, options);
      mapRef.current = map;
      const imageSrc = marker;
      const imageSize = new window.kakao.maps.Size(18, 18);
      const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);

      const markers = new window.kakao.maps.Marker({
        map,
        position,
        image: markerImage,
      });
    }
  }, [latitude, longitude]);

  return (
    <Wrapper>
      <Map ref={mapRef} id="map"></Map>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 327px;
  height: 213px;
`;

const Map = styled.div`
  height: 210px;
  width: 100%;
  border-radius: 1rem;
`;
