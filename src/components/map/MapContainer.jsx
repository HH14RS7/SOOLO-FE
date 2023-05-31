import React, { useEffect, useRef, useState } from 'react';
import useGeolocation from '../../hooks/useGeolocation';
import { styled } from 'styled-components';

const { kakao } = window;

const MapContainer = ({ searchPlace }) => {
  const currentloaction = useGeolocation();
  const [Places, setPlaces] = useState([]);
  const mapRef = useRef();
  const [distance, setDistance] = useState(0); // 중심좌표와 대표역과의 거리
  const [nearbyStation, setNearbyStation] = useState(''); // 검색기반 가까운 역이름
  const STATION_CATEGORY_CODE = 'SW8'; // 지하철역 카테고리 코드

  const initialCurrentPosition = new kakao.maps.LatLng(37.496777, 127.028185); // 초기 중심 좌표(강남역)
  const [currentCenter, setCurrentCenter] = useState(initialCurrentPosition);

  const latitude = currentloaction.coordinates.latitude; // 위도
  const longitude = currentloaction.coordinates.longitude; // 경도

  useEffect(() => {
    // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성
    const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    const container = document.getElementById('map');
    const options = {
      center: currentCenter,
      level: 3,
    };

    mapRef.current = new kakao.maps.Map(container, options); // 지도 생성
    // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성
    // const zoomControl = new kakao.maps.ZoomControl();
    // mapRef.current.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    // 장소 검색 객체 생성
    const ps = new kakao.maps.services.Places();

    // 키워드 검색 요청 함수
    const placesSearchCB = (data, status, pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        if (data.length > 0) {
          const firstPlace = data[0]; // 검색된 첫번째 배열을 중심좌표로 설정
          const newCenter = new kakao.maps.LatLng(firstPlace.y, firstPlace.x);
          mapRef.current.setCenter(newCenter);
        }

        mapRef.current.setBounds(bounds);
        // 페이지 목록 보여주는 displayPagination() 추가
        displayPagination(pagination);
        setPlaces(data);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert('검색 결과가 존재하지 않습니다.');
        return;
      } else if (status === kakao.maps.services.Status.ERROR) {
        alert('검색 결과 중 오류가 발생했습니다.');
        return;
      }
    };

    const searchOptions = {
      size: 6, // 한 페이지내 마커 개수 출력
      level: 3,
      location: currentCenter,
      sort: kakao.maps.services.SortBy.ACCURANCE, // 정확도 정렬
    };

    // 주변역 검색 요청 함수
    // const nearbyStationsSearch = () => {
    //   ps.categorySearch(STATION_CATEGORY_CODE, (result, status) => {
    //     if (status === kakao.maps.services.Status.OK) {
    //       result.forEach(station => {
    //         // setDistance(calculateDistance(currentCenter, station)); // 중심 좌표와의 거리 계산
    //         setNearbyStation(station.place_name);
    //       });
    //       console.log('주변역과의 거리:', distance);
    //       console.log('주변역:', nearbyStation);
    //     }
    //   });
    // };

    // // 중심 좌표와 역의 좌표 사이의 거리 계산 함수
    // const calculateDistance = (center, station) => {
    //   const centerLatLng = new kakao.maps.LatLng(center.getLat(), center.getLng());
    //   const stationLatLng = new kakao.maps.LatLng(station.y, station.x);
    //   const distance = centerLatLng.distanceTo(stationLatLng);
    //   return distance;
    // };

    // 검색키워드 함수 호출
    if (searchPlace) {
      ps.keywordSearch(searchPlace, placesSearchCB, searchOptions);
    }

    // 검색결과 목록 하단에 페이지 번호 표시
    const displayPagination = pagination => {
      var paginationEl = document.getElementById('pagination'),
        fragment = document.createDocumentFragment(),
        i;

      // 기존에 추가된 페이지 번호 삭제
      while (paginationEl.hasChildNodes()) {
        paginationEl.removeChild(paginationEl.lastChild);
      }

      for (i = 1; i <= pagination.last; i++) {
        const el = document.createElement('a');
        el.href = '#';
        el.innerHTML = i;

        if (i === pagination.current) {
          el.className = 'on';
        } else {
          el.onclick = (function (i) {
            return function () {
              pagination.gotoPage(i);
            };
          })(i);
        }
        fragment.appendChild(el);
      }
      paginationEl.appendChild(fragment);
    };

    const displayMarker = place => {
      const marker = new kakao.maps.Marker({
        map: mapRef.current,
        position: new kakao.maps.LatLng(place.y, place.x),
      });

      kakao.maps.event.addListener(marker, 'click', function () {
        // console.log('위도:', place.y); // latitude
        // console.log('경도:', place.x); // longitude
        // console.log('장소명:', place.place_name); // placeName
        // console.log('장소 URL:', place.place_url); // placeUrl
        // console.log(':', place.place_url); // placeUrl
        // nearbyStationsSearch();

        infowindow.setContent(
          '<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>',
        );
        infowindow.open(mapRef.current, marker);
      });
    };
  }, [latitude, longitude, searchPlace]);

  const handlePlaceClick = item => {
    // 여기서 data를 다 담아줘야한다.
    console.log(item);
  };

  const zoomIn = () => {
    const map = mapRef.current;
    map.setLevel(map.getLevel() - 1);
  };
  const zoomOut = () => {
    const map = mapRef.current;
    map.setLevel(map.getLevel() + 1);
  };
  // 현재위치 찾기 클릭 함수
  const handleCurrentLocation = () => {
    const currentLocation = new kakao.maps.LatLng(latitude, longitude);
    setCurrentCenter(currentLocation);
    mapRef.current.setLevel(4);
    mapRef.current.panTo(currentLocation);
  };
  return (
    <div>
      <Map id="map">
        {/* 지도 확대, 축소 컨트롤 div 입니다 */}
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
        </ZoomControlContainer>
      </Map>
      <button onClick={handleCurrentLocation}>현재 위치 찾기</button>
      <div id="result-list">
        {Places.map((item, i) => (
          <div key={i} style={{ marginTop: '20px' }} onClick={() => handlePlaceClick(item)}>
            <div>
              <p>{item.place_name}</p>
              {item.road_address_name ? (
                <div>
                  <p>{item.road_address_name}</p>
                </div>
              ) : (
                <p>{item.address_name}</p>
              )}
              <p>{item.phone}</p>
              <a href={item.place_url} target="_blank" rel="noreferrer">
                정보 상세보기
              </a>
            </div>
          </div>
        ))}
        <div id="pagination"></div>
      </div>
    </div>
  );
};

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
export default MapContainer;
