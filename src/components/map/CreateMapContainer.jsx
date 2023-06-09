import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate, useHistory } from 'react-router-dom';
import { styled } from 'styled-components';
import { PATH_URL } from '../../shared/constants';
import marker from '../../assets/map/marker.svg';
import { ReactComponent as Add } from '../../assets/map/add.svg';
import { ReactComponent as Subtract } from '../../assets/map/subtract.svg';

export default function CreateMapContainer() {
  const { kakao } = window;
  const location = useLocation();
  const place = location.state || {};
  const navigate = useNavigate();
  const moreButton = '/img/more-detail.png';

  console.log(place);
  const latitude = place.y;
  const longitude = place.x;
  const mapRef = useRef(null);

  useEffect(() => {
    const container = mapRef.current;
    const options = {
      center: new kakao.maps.LatLng(latitude, longitude),
      level: 3,
    };

    const map = new kakao.maps.Map(container, options);
    mapRef.current = map;
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

  const zoomIn = () => {
    const map = mapRef.current;
    map.setLevel(map.getLevel() - 1);
  };

  const zoomOut = () => {
    const map = mapRef.current;
    map.setLevel(map.getLevel() + 1);
  };

  const handleItemClick = () => {
    navigate(PATH_URL.PARTY_CREATE, { state: place });
  };

  // 가게 정보 더보기
  const handleDetailClick = () => {
    const url = place.place_url;
    window.open(url, '_blank');
  };

  const goSearchPlaceList = () => {
    navigate(PATH_URL.PARTY_PLACE_CREATE);
  };

  return (
    <Wrapper>
      <Map ref={mapRef} id="map">
        <ZoomControlContainer>
          <ZoomButton onClick={zoomIn}>
            <AddIcon />
          </ZoomButton>
          <ZoomButton onClick={zoomOut}>
            <SubtractIcon />
          </ZoomButton>
        </ZoomControlContainer>
      </Map>
      <PlaceWrapper>
        <PlaceDetail>
          <LeftDetail>
            <TopInfo>
              <h4>{place.place_name}</h4>
              <Category> {place.category_name.split('>').reverse()[0]}</Category>
            </TopInfo>
            <PlaceAddress> {place.road_address_name}</PlaceAddress>
          </LeftDetail>
          <DetailButton onClick={handleDetailClick}>
            <DetailImage src={moreButton} alt="moredetail" />
          </DetailButton>
        </PlaceDetail>
        <PlaceButton onClick={handleItemClick}>이곳에서 모임 열기</PlaceButton>
      </PlaceWrapper>
      {/* <button onClick={goSearchPlaceList}>이전으로</button> */}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
  width: 360px;
  margin: 0 auto;
`;

const Map = styled.div`
  display: flex;
  max-height: 360px;
  min-height: 568px;
`;

/* Zoom Control */
const ZoomControlContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 1rem 1rem 0 0;
  gap: 0.5rem;
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
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

/* PlaceWrapper */
const PlaceWrapper = styled.div`
  position: absolute;
  display: flex;
  height: 176px;
  flex-direction: column;
  flex-grow: 1;
  bottom: 0;
  z-index: 5;
  background: var(--color-white);
  padding: 1.5rem 1rem;
  border-top: 1px solid var(--color-gray-200);
  margin-bottom: 70px; // 임시주석
`;

const PlaceDetail = styled.div`
  height: 84px;
  display: flex;
  justify-content: space-between;
`;

const LeftDetail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 2rem;
  gap: 1rem;
`;

const DetailButton = styled.button`
  display: flex;
  margin-bottom: 1rem;
  cursor: pointer;
`;

const DetailImage = styled.img`
  width: 42px;
  height: 42px;
`;

const TopInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
`;

const Category = styled.h5`
  color: var(--color-gray-500);
`;

const PlaceAddress = styled.h5`
  color: var(--color-gray-500);
`;

/* PlaceButton */
const PlaceButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 328px;
  height: 48px;
  background: var(--color-primary-500);
  border: 1px solid var(--color-primary-500);
  border-radius: 0.75rem;

  font-family: 'Inter';
  font-style: normal;
  font-weight: var(--font-weight-600);
  font-size: 0.75rem;
  line-height: 15px;
  color: var(--color-gray-25);
`;
