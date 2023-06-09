import React, { useEffect, useState } from 'react';
import SearchLocation from '../components/map/SearchLocation';
import SearchPlaceList from '../components/map/SearchPlaceList';
import useGeolocation from '../hooks/useGeolocation';
import { styled } from 'styled-components';

const PartyPlaceCreate = () => {
  const [place, setPlace] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const { location, error } = useGeolocation();
  const [currentLocation, setCurrentLocation] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      if (isChecked && location.loaded && !error) {
        const { latitude, longitude } = location.coordinates;
        setCurrentLocation({ latitude, longitude });
      } else {
        setCurrentLocation(null);
      }

      setLoading(false);
    };

    fetchData();
  }, [isChecked, location, error]);

  const handlePlaceChange = value => {
    setPlace(value);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <Wrapper>
      <Header>
        <Label htmlFor="search">모임 장소</Label>
        <SearchLocation onPlaceChange={handlePlaceChange} />
      </Header>
      <PlaceInfo>
        <PlaceLabel htmlFor="place">장소 목록</PlaceLabel>
        <ToggleWrapper>
          <ToggleLabel htmlFor="location">현 위치 중심</ToggleLabel>
          <input
            id="location"
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
        </ToggleWrapper>
      </PlaceInfo>
      <Bar />
      {loading ? (
        <div>로딩 중입니다...</div>
      ) : (
        <SearchPlaceList
          searchPlace={place}
          currentLocation={currentLocation}
          isChecked={isChecked}
        />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 360px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Label = styled.label`
  font-style: normal;
  font-weight: var(--font-weight-700);
  font-size: 0.75rem;
  line-height: 100%;
  padding: 1.5rem 0 0 1rem;
  letter-spacing: -0.015em;
`;

const PlaceInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 1rem;
  gap: 126px;
  height: 40px;
  margin-top: -1rem;
`;

const PlaceLabel = styled.label`
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 100%;
  letter-spacing: -0.015em;
  color: #667085;
`;

const ToggleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 0.5rem 0;
  gap: 0.5rem;
`;

const ToggleLabel = styled.label`
  font-style: normal;
  font-weight: var(--font-weight-400);
  font-size: 0.85rem;
  line-height: 100%;
  display: flex;
  align-items: center;
  text-align: right;
`;

const Bar = styled.div`
  height: 8px;
  width: 100%;
  background: var(--color-gray-100);
`;

export default PartyPlaceCreate;
