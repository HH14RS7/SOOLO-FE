import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import marker from '../../assets/map/marker.svg';
import { PATH_URL } from '../../shared/constants';

export default function CreateMapContainer() {
  const { kakao } = window;
  const location = useLocation();
  const place = location.state || {};
  const navigate = useNavigate();

  const latitude = place.y;
  const longitude = place.x;
  const mapRef = useRef(null);

  useEffect(() => {
    const container = mapRef.current;
    const options = {
      center: new kakao.maps.LatLng(latitude, longitude),
      level: 4,
    };

    const map = new kakao.maps.Map(container, options);
    const imageSrc = marker;
    const imageSize = new kakao.maps.Size(18, 18);
    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
    const position = new kakao.maps.LatLng(latitude, longitude);

    const markers = new kakao.maps.Marker({
      map,
      position,
      image: markerImage,
    });
  }, []);

  //   const zoomIn = () => {
  //     const map = mapRef.current;
  //     map.setLevel(map.getLevel() - 1);
  //   };

  //   const zoomOut = () => {
  //     const map = mapRef.current;
  //     map.setLevel(map.getLevel() + 1);
  //   };

  const handleItemClick = () => {
    navigate(PATH_URL.PARTY_CREATE, { state: place });
  };

  const goSearchPlaceList = () => {
    navigate(PATH_URL.PARTY_PLACE_CREATE);
  };

  return (
    <div>
      <Map ref={mapRef} id="map">
        {/* <ZoomControlContainer>
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
        </ZoomControlContainer> */}
      </Map>
      <div>
        <div>{place.place_name}</div>
        <div>{place.road_address_name}</div>
      </div>
      <button onClick={handleItemClick}>장소 선택하기</button>
      <button onClick={goSearchPlaceList}>이전으로</button>
      {/* <button onClick={goBack}>이전으로</button> */}
    </div>
  );
}

const Map = styled.div`
  display: flex;
  width: 360px;
  height: 400px;
`;

// const ZoomControlContainer = styled.div`
//   position: absolute;
//   top: 10px;
//   right: 10px;
//   display: flex;
//   flex-direction: column;
// `;

// const ZoomButton = styled.button`
//   border: none;
//   background: none;
//   cursor: pointer;
//   padding: 5px;
// `;
