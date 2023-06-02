import React, { useEffect, useRef, useState } from 'react';
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
  const [parties, setParties] = useState([]);
  const queryClient = new QueryClient();
  const [latitude, setLatitude] = useState(37.496777); // 초기 좌표값 설정
  const [longitude, setLongitude] = useState(127.028185); // 초기 좌표값 설정

  const centerCoordinate = new kakao.maps.LatLng(latitude, longitude);

  // 로딩 상태에 따라 초기 중심 좌표 설정
  currentloaction.loading
    ? new kakao.maps.LatLng(37.496777, 127.028185) // 강남역
    : new kakao.maps.LatLng(latitude, longitude);

  const page = 0; // 임시
  const radius = 3; // 반경 km

  // geolocation 로딩중일때는 강남역 초기 세팅
  const url = `${PARTIES_URL.PARTIES_LIST}?page=${page}&recruitmentStatus=0&latitude=${latitude}&longitude=${longitude}&radius=${radius}`;

  const { data } = useQuery(['parties'], () => getAPI(url), {
    onSuccess: response => {
      setParties(response.data.partyList);
    },
  });

  useEffect(() => {
    const ps = new kakao.maps.services.Places();
    const container = document.getElementById('map');
    const options = {
      center: centerCoordinate,
      level: 6,
      radius: 50000,
    };

    mapRef.current = new kakao.maps.Map(container, options);

    queryClient.invalidateQueries('parties');

    // 키워드 검색 함수
    const placesSearchCB = (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        setLatitude(result[0].y);
        setLongitude(result[0].x);
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

    // 가게명 오버레이
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

      // mouseout시 가게명 사라지게
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
        const currentLocation = new kakao.maps.LatLng(selected.latitude, selected.longitude);
        mapRef.current.panTo(currentLocation);
        fetchData(selected.latitude, selected.longitude);
      });

      // 오버레이 클릭 이벤트
      kakao.maps.event.addListener(customOverlay, 'click', function () {
        const selected = partyList.find(party => party.partyId === el.partyId);
        setSelectedParty(selected);
      });

      // 마커 이외 클릭시
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
  }, [searchPlace, parties]);

  const zoomIn = () => {
    const map = mapRef.current;
    map.setLevel(map.getLevel() - 1);
  };

  const zoomOut = () => {
    const map = mapRef.current;
    map.setLevel(map.getLevel() + 1);
  };

  // 현재 위치로 찾기
  const handleCurrentLocation = async () => {
    setLatitude(currentloaction.coordinates.latitude);
    setLongitude(currentloaction.coordinates.longitude);

    const currentLocation = new kakao.maps.LatLng(latitude, longitude);
    fetchData(latitude, longitude);
    mapRef.current.panTo(currentLocation);
  };

  const fetchData = async (latitude, longitude) => {
    const url = `${PARTIES_URL.PARTIES_LIST}?page=${page}&recruitmentStatus=0&latitude=${latitude}&longitude=${longitude}&radius=${radius}`;
    const searchData = await getAPI(url);
    setParties(searchData.data.data.partyList);
  };

  useEffect(() => {
    fetchData(latitude, longitude);
  }, [latitude, longitude]);

  const partyList = parties;

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
        </ZoomControlContainer>
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
  // margin-bottom: 100px;
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
