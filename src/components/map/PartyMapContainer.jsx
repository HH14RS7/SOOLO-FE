import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import SearchPartyList from './SearchPartyList';
import { PARTIES_URL } from '../../shared/constants';
import { getAPI } from '../../api/api';
import useGeolocation from '../../hooks/useGeolocation';
import marker from '../../assets/map/marker.svg';
import { styled } from 'styled-components';
import ReactDOMServer from 'react-dom/server';
import SelectedPartyList from './SelectedPartyList';
import useGetRegionName from '../../hooks/useGetRegionName';
import useGetNearbyStation from '../../hooks/useGetNearbyStation';

const { kakao } = window;
const PartyMapContainer = ({ searchPlace, onPlaceChange }) => {
  const initialLatitude = 37.497942; // 강남역 초기 위도
  const initialLongitude = 127.027621; // 강남역 초기 경도

  const { location, error } = useGeolocation();
  const [latitude, setLatitude] = useState(initialLatitude);
  const [longitude, setLongitude] = useState(initialLongitude);
  const [selectedParty, setSelectedParty] = useState();
  const customOverlayRef = useRef();
  const mapRef = useRef();
  const { regionName, getRegionName } = useGetRegionName();
  const { stationName, getStationInfo } = useGetNearbyStation();

  const radius = searchPlace.endsWith('역') ? 3 : 5;

  const fetchPartyList = async (latitude, longitude) => {
    try {
      const response = await getAPI(
        `${PARTIES_URL.PARTIES_LIST}?page=0&recruitmentStatus=0&latitude=${latitude}&longitude=${longitude}&radius=${radius}`,
      );
      return response.data.data.partyList;
    } catch (error) {
      console.error('조회실패', error);
      return [];
    }
  };

  const { data: partyList, isLoading } = useQuery(['parties', latitude, longitude], () =>
    fetchPartyList(latitude, longitude),
  );

  // 현재위치 내 모임 조회
  const handleCurrentLocation = useCallback(() => {
    if (error) {
      alert(error.message);
    } else if (location.loading) {
      alert('로딩중입니다');
    } else {
      const lat = location.coordinates.latitude;
      const lon = location.coordinates.longitude;
      setLatitude(lat);
      setLongitude(lon);
      getRegionName(lat, lon);
      getStationInfo(lat, lon);
      onPlaceChange('');
    }
  }, [location]);

  // 모임 리스트 마커 찍기
  const drawMarkers = useCallback(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(latitude, longitude),
      level: 6,
      radius: 5000,
    };

    const map = new kakao.maps.Map(container, options);
    mapRef.current = map;
    const markerList = []; // 중복 마커 체크를 위한 배열

    if (partyList && partyList.length > 0) {
      const imageSrc = marker;

      const overlayInfos =
        partyList?.map(party => {
          return {
            title: party.placeName,
            latitude: party.latitude,
            longitude: party.longitude,
            partyId: party.partyId,
          };
        }) || [];

      // 가게명 오버레이
      overlayInfos.forEach(el => {
        const imageSize = new kakao.maps.Size(18, 18);
        const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
        const position = new kakao.maps.LatLng(el.latitude, el.longitude);

        const marker = new kakao.maps.Marker({
          map,
          position,
          title: el.placeName,
          image: markerImage,
          clickable: true,
        });

        // 중복 마커 체크
        const isDuplicate = markerList.some(
          marker => marker.latitude === el.latitude && marker.longitude === el.longitude,
        );

        if (!isDuplicate) {
          markerList.push({
            latitude: el.latitude,
            longitude: el.longitude,
          });
        }

        // 마커 클릭 이벤트 - 선택된 파티 조회
        kakao.maps.event.addListener(marker, 'click', function () {
          const overlayContent = ReactDOMServer.renderToString(
            <OverlayWrap>
              <PlaceName>{el.title}</PlaceName>
            </OverlayWrap>,
          );

          const customOverlay = new kakao.maps.CustomOverlay({
            map: map,
            position: position,
            content: overlayContent,
            yAnchor: 1,
          });

          // 선택된 오버레이 닫기
          if (customOverlayRef.current) {
            customOverlayRef.current.setMap(null);
            customOverlayRef.current = null;
          }

          customOverlayRef.current = customOverlay;

          // 중복된 위치 필터
          const selectedParties = isDuplicate
            ? partyList.filter(
                party => party.latitude === el.latitude && party.longitude === el.longitude,
              )
            : partyList.filter(party => party.partyId === el.partyId);

          if (selectedParties.length > 0) {
            setSelectedParty(selectedParties);
            map.panTo(position);
            marker.setMap(map);
          }
          if (customOverlayRef.current) {
            customOverlay.setMap(null);
          }
          customOverlay.setMap(map);
          getRegionName(latitude, longitude);
          getStationInfo(latitude, longitude);
        });

        // 마커 이외 클릭시 - 전체 조회
        kakao.maps.event.addListener(map, 'click', function () {
          setTimeout(function () {
            if (customOverlayRef.current) {
              customOverlayRef.current.setMap(null);
              customOverlayRef.current = null;
            }
            setSelectedParty(null);
          });
        });
      });
    }
  }, [latitude, longitude, partyList]);

  useEffect(() => {
    drawMarkers();
  }, [drawMarkers]);

  // 키워드 검색
  const placesSearchCB = useCallback((data, status) => {
    if (status === kakao.maps.services.Status.OK) {
      if (data.length > 0) {
        setLatitude(data[0].y);
        setLongitude(data[0].x);
        getRegionName(data[0].y, data[0].x);
        getStationInfo(data[0].y, data[0].x);
      }
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
      alert('올바른 지역을 검색해주세요.');
      return;
    } else if (status === kakao.maps.services.Status.ERROR) {
      alert('검색 결과 중 오류가 발생했습니다.');
      return;
    }
  }, []);

  // 검색 키워드 함수
  useEffect(() => {
    if (searchPlace) {
      const ps = new kakao.maps.services.Places();
      ps.keywordSearch(searchPlace, placesSearchCB);
    }
  }, [searchPlace, placesSearchCB]);

  const zoomIn = () => {
    const map = mapRef.current;
    map.setLevel(map.getLevel() - 1);
  };

  const zoomOut = () => {
    const map = mapRef.current;
    map.setLevel(map.getLevel() + 1);
  };

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
      <CurrentButton onClick={handleCurrentLocation}>현재위치로 찾기</CurrentButton>
      {isLoading ? (
        <div>로딩중입니다</div>
      ) : (
        <div>
          {selectedParty ? (
            <SelectedPartyList partyList={selectedParty} />
          ) : (
            <SearchPartyList
              partyList={partyList}
              regionName={regionName}
              stationName={stationName}
              searchPlace={searchPlace}
            />
          )}
        </div>
      )}
    </div>
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
  margin-bottom: 20px;
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
  z-index: 3;
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

const CurrentButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 16px 24px;
  gap: 8px;

  width: 175px;
  height: 48px;
  left: 92.5px;
  top: 317px;

  /* Gray/800 */

  background: #1d2939;
  border-radius: 12px;
`;

export default PartyMapContainer;
