import React, { useEffect, useState } from 'react';
import SearchLocation from '../components/map/SearchLocation';
import SearchPlaceList from '../components/map/SearchPlaceList';
import useGeolocation from '../hooks/useGeolocation';

const PartyPlaceCreate = () => {
  const [place, setPlace] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const { location, error } = useGeolocation();
  const [currentLocation, setCurrentLocation] = useState({});

  useEffect(() => {
    if (isChecked) {
      if (location.loaded && !error) {
        const { latitude, longitude } = location.coordinates;
        setCurrentLocation({ latitude, longitude });
        setIsChecked(true);
      } else if (location.loading) {
        alert('로딩중입니다');
        setIsChecked(false);
      } else if (error) {
        alert(error.message);
        setIsChecked(false);
      }
    } else {
      setIsChecked(false);
    }
  }, [isChecked, location, error]);

  const handlePlaceChange = value => {
    setPlace(value);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      <SearchLocation onPlaceChange={handlePlaceChange} />
      <input id="location" type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
      <label htmlFor="location"> 현재위치로 검색하기</label>
      <SearchPlaceList
        searchPlace={place}
        currentLocation={currentLocation}
        isChecked={isChecked}
      />
    </>
  );
};

export default PartyPlaceCreate;
