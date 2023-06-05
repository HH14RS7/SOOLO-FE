import React, { useEffect, useRef, useState } from 'react';
import useGeolocation from '../../hooks/useGeolocation';
import { styled } from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { mapDataState, regionNameState, stationDataState } from '../../atoms';
const { kakao } = window;

const MapContainer = ({ searchPlace, party }) => {
  const setStationData = useSetRecoilState(stationDataState);
  const setMapData = useSetRecoilState(mapDataState);
  const setRegionName = useSetRecoilState(regionNameState);
  const currentloaction = useGeolocation();
  const [Places, setPlaces] = useState([]);
  const mapRef = useRef();
  const mapdata = useRecoilValue(mapDataState);
  const stationData = useRecoilValue(stationDataState);
  const isEdit = !!party.partyId;
  var geocoder = new kakao.maps.services.Geocoder();

  const STATION_CATEGORY_CODE = 'SW8'; // 지하철역 카테고리 코드
  const FOOD_CATEGORY_CODE = 'FD6'; // 음식점 카테고리 코드

  const latitude = currentloaction.coordinates.latitude; // 위도
  const longitude = currentloaction.coordinates.longitude; // 경도
  const [currentCenter, setCurrentCenter] = useState('');

  // 로딩 상태에 따라 초기 중심 좌표 설정
  const initialCurrentPosition = isEdit
    ? new kakao.maps.LatLng(party.latitude, party.longitude) // 수정시 기존 좌표
    : currentloaction.loading
    ? new kakao.maps.LatLng(37.496777, 127.028185) // 강남역
    : new kakao.maps.LatLng(latitude, longitude);

  const ps = useRef(new kakao.maps.services.Places()).current;

  useEffect(() => {
    // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성
    const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    const container = document.getElementById('map');
    const options = {
      center: initialCurrentPosition,
      level: 2,
    };

    mapRef.current = new kakao.maps.Map(container, options); // 지도 생성

    // 키워드 검색 요청 함수
    const placesSearchCB = (data, status, pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        const bounds = new kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        if (data.length > 0) {
          const firstPlace = data[0];
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

    // 검색 옵션
    const searchOptions = {
      size: 8, // 한 페이지내 마커 개수 출력
      level: 3,
      // radius: 50000,
      location: isEdit ? initialCurrentPosition : currentCenter,
      sort: kakao.maps.services.SortBy.DISTNACE, // 거리순 정렬
      category_group_code: FOOD_CATEGORY_CODE,
    };

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

    // 맵 화면에 마커 및 오버레이 출력
    const displayMarker = place => {
      const marker = new kakao.maps.Marker({
        map: mapRef.current,
        position: new kakao.maps.LatLng(place.y, place.x),
      });

      kakao.maps.event.addListener(marker, 'click', function () {
        // console.log('위도:', place.y); // latitude
        // console.log('경도:', place.x); // longitude
        // console.log('장소명:', place.place_name); // placeName
        // console.log('장소위치', place.road_address_name); //placeAddress
        // console.log('장소 URL:', place.place_url); // placeUrl

        geocoder.coord2RegionCode(place.x, place.y, callback);
        const newMapData = {
          latitude: place.y,
          longitude: place.x,
          placeName: place.place_name,
          placeAddress: place.road_address_name,
          placeUrl: place.place_url,
        };
        setMapData(newMapData);
        searchNearbyStations(place.y, place.x);

        infowindow.setContent(
          '<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>',
        );
        infowindow.open(mapRef.current, marker);
      });
    };

    // 수정모드일때 초기 마커 표시
    if (isEdit) {
      const partyPlace = {
        y: party.latitude,
        x: party.longitude,
        place_name: party.placeName,
        road_address_name: party.road_address_name,
        place_url: party.place_url,
      };
      const stationData = {
        stationName: party.stationName,
        distance: party.distance,
      };
      saveMapData(partyPlace);
      setStationData(stationData);
      displayMarker(partyPlace);
    }
  }, [currentloaction, searchPlace]);

  // 주변역 정보(거리, 역이름) 가져오기
  const nearbyStationsSearch = (result, status) => {
    if (status === kakao.maps.services.Status.OK) {
      const nearbyStation = result[0];
      if (nearbyStation) {
        // console.log('가장 가까운 역과의 거리:', nearbyStation.distance); // m단위(0인경우 1m미만)
        // console.log('가장 가까운 역:', nearbyStation.place_name);
        const updatedStationData = {
          distance: nearbyStation.distance,
          stationName: nearbyStation.place_name,
        };
        setStationData(updatedStationData);
      }
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
      setStationData({ distance: '', stationName: '' });
    } else if (status === kakao.maps.services.Status.ERROR) {
      setStationData({ distance: '', stationName: '' });
    }
  };

  // 주변역 찾기 함수
  const searchNearbyStations = (latitude, longitude) => {
    const categoryOptions = {
      size: 8,
      location: new kakao.maps.LatLng(latitude, longitude),
      radius: 5000,
      sort: kakao.maps.services.SortBy.DISTANCE,
      category: STATION_CATEGORY_CODE,
    };
    ps.categorySearch(STATION_CATEGORY_CODE, nearbyStationsSearch, categoryOptions);
  };

  // 행정구역명 변환 함수
  const callback = function (result, status) {
    let regionName = '';
    if (status === kakao.maps.services.Status.OK) {
      const region1DepthName = result[0].region_1depth_name;
      const region2DepthName = result[0].region_2depth_name;
      const region3DepthName = result[0].region_3depth_name;

      if (region1DepthName.endsWith('특별시') || region1DepthName.endsWith('광역시')) {
        // 특별시나 광역시인 경우
        regionName = region1DepthName.slice(0, -3); // 뒤의 '특별시' 또는 '광역시' 제거
      } else {
        // 특별시나 광역시가 아닌 경우
        regionName = '';
      }
      if (region2DepthName.endsWith('구')) {
        // 2depth가 '구'로 끝나는 경우
        if (region1DepthName.endsWith('특별시') || region1DepthName.endsWith('광역시')) {
          regionName += ' ' + region2DepthName;
        } else {
          regionName += region2DepthName;
        }
      } else {
        // 2depth가 '구'로 끝나지 않는 경우
        regionName += region2DepthName + ' ' + region3DepthName;
      }
      setRegionName(regionName);
    }
  };

  //map정보 data에 담기
  const saveMapData = item => {
    const newMapData = {
      latitude: item.y,
      longitude: item.x,
      placeName: item.place_name,
      placeAddress: item.road_address_name,
      placeUrl: item.place_url,
    };
    setMapData(newMapData);
  };

  // 리스트 클릭시 맵/지하철 정보 저장
  const handlePlaceClick = item => {
    geocoder.coord2RegionCode(item.x, item.y, callback);
    saveMapData(item);
    searchNearbyStations(item.y, item.x);
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
    const currentLocation = currentloaction.loading
      ? new kakao.maps.LatLng(37.496777, 127.028185) // 강남역
      : new kakao.maps.LatLng(latitude, longitude);

    setCurrentCenter(currentLocation);
    mapRef.current.setLevel(4);
    mapRef.current.panTo(currentLocation);
  };

  // 이전 장소 찾기 클릭 함수
  // const handleResetLocation = () => {
  //   const currentLocation = new kakao.maps.LatLng(party.latitude, party.longitude);
  //   setCurrentCenter(currentLocation);
  //   mapRef.current.setLevel(4);
  //   mapRef.current.panTo(currentLocation);
  // };

  return (
    <div>
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
        </ZoomControlContainer>
      </Map>
      <button onClick={handleCurrentLocation}>현재 위치 찾기</button>
      {/* <button onClick={handleResetLocation}>이전 모임장소 그대로</button> */}
      <ul>
        {Places.map((item, i) => (
          <ListWrapper key={i} onClick={() => handlePlaceClick(item)}>
            <div>
              <p>{item.place_name}</p>
              {item.road_address_name ? (
                <div>
                  <p>{item.road_address_name}</p>
                </div>
              ) : (
                <p>{item.address_name}</p>
              )}
              <a href={item.place_url} target="_blank" rel="noreferrer">
                정보 상세보기
              </a>
            </div>
          </ListWrapper>
        ))}
        <div id="pagination"></div>
      </ul>
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

const ListWrapper = styled.li`
  border: 1px solid black;
  cursor: pointer;
`;
export default MapContainer;
