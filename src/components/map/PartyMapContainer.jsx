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
import { ReactComponent as Location } from '../../assets/map/location.svg';
import { ReactComponent as Overlay } from '../../assets/map/overlay.svg';
import { ReactComponent as OverlayArrow } from '../../assets/map/overlay-arrow.svg';
import { ReactComponent as Add } from '../../assets/map/add.svg';
import { ReactComponent as Subtract } from '../../assets/map/subtract.svg';

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

  const radius = searchPlace.endsWith('역') ? 2.5 : 5;

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
      if (mapRef.current) {
        const center = new kakao.maps.LatLng(lat, lon);
        mapRef.current.setCenter(center);
      }
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
              <Overlay />
              <OverlayPlaceName>{el.title}</OverlayPlaceName>
              <OverlayArrowIcon />
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
      setSelectedParty(null);
      onPlaceChange('');
      // marker.setMap('');
      if (data.length > 0) {
        setLatitude(data[0].y);
        setLongitude(data[0].x);
        getRegionName(data[0].y, data[0].x);
        getStationInfo(data[0].y, data[0].x);
      }
      // 검색한 (searchPlace랑) = 같다면?
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
      alert('올바른 지역을 검색해주세요.');
      return;
    } else if (status === kakao.maps.services.Status.ERROR) {
      alert('검색 결과 중 오류가 발생했습니다.');
      return;
    }
  }, []);

  // 오버레이 닫기
  const closeOverlay = useCallback(() => {
    if (customOverlayRef.current) {
      customOverlayRef.current.setMap(null);
      customOverlayRef.current = null;
    }
    setSelectedParty(null);
  }, []);

  // 검색 키워드 함수
  useEffect(() => {
    if (searchPlace) {
      closeOverlay();
      setSelectedParty(null);

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
    <Wrap>
      <Map id="map">
        <ZoomControlContainer>
          <ZoomButton onClick={zoomIn}>
            <AddIcon />
          </ZoomButton>
          <ZoomButton onClick={zoomOut}>
            <SubtractIcon />
          </ZoomButton>
        </ZoomControlContainer>
      </Map>
      <ButtonWrapper>
        <CurrentButton onClick={handleCurrentLocation}>
          <LocationIcon />
          <CoordinateTitle>현재 위치로 찾기</CoordinateTitle>
        </CurrentButton>
      </ButtonWrapper>
      {isLoading ? (
        <Loading>로딩중입니다</Loading>
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
    </Wrap>
  );
};

const Wrap = styled.div`
  height: 100%;
`;

const Map = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 360px;
  min-height: 512px;
  margin: 0 auto;
  // height: 100%; // footer 임시용
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

const CurrentButton = styled.button`
  display: flex;
  width: 175px;
  height: 48px;
  background: var(--color-gray-800);
  padding: 1rem 1.5rem;
  border-radius: 0.75rem;
  margin-top: -15rem;
  z-index: 5;
  gap: 0.5rem;
`;

const LocationIcon = styled(Location)`
  fill: white;
`;

const CoordinateTitle = styled.h4`
  color: var(--color-white);
`;

/* Overlay */
const OverlayWrap = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  margin-bottom: 26px;
  justify-content: center;
  align-items: center;
  padding: 0.75rem 1rem;
  gap: 4px;
  height: 40px;
  background-color: var(--color-primary-500);
  border: 1px solid var(--color-primary-700);
  border-radius: 0.5rem;
`;

const OverlayArrowIcon = styled(OverlayArrow)`
  position: absolute;
  margin-top: 48px;
  transform: translateX(-14%);
`;

const OverlayPlaceName = styled.h3`
  color: var(--color-gray-25);
`;

/* Zoom Button */
const ZoomControlContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 1rem 1rem 0 0;
  gap: 0.5rem;

  position: absolute;
  width: 64px;
  height: 120px;
  left: 296px;
  top: 72px;

  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  display: flex;
  flex-direction: column;
  z-index: 3;
`;

const AddIcon = styled(Add)`
  fill: var(--color-gray-600);
`;

const SubtractIcon = styled(Subtract)`
  fill: var(--color-gray-600);
`;

const ZoomButton = styled.span`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  background: var(--color-gray-25);
  border: 1px solid var(--color-gray-300);
  box-shadow: 2px 4px 16px rgba(0, 0, 0, 0.15);
  border-radius: 0.25rem;
`;

// 로딩바 임시
const Loading = styled.div`
  margin: 0 auto;
  width: 360px;
`;
export default PartyMapContainer;
