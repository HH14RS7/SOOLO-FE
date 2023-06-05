import React, { useEffect, useState } from 'react';
import SearchLocation from '../components/map/SearchLocation';
import SearchPlaceList from '../components/map/SearchPlaceList';
import useGeolocation from '../hooks/useGeolocation';

const PartyPlaceCreate = () => {
  const [place, setPlace] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const { location, error } = useGeolocation();

  useEffect(() => {
    if (isChecked) {
      if (error) {
        alert(error.message);
      } else if (location.loading) {
        alert('로딩중입니다');
      } else {
        const lat = location.coordinates.latitude;
        const lon = location.coordinates.longitude;
        // 이 정보로 현재 위치 이름 가져오고 latitude , longtidue를 넘겨서 줘야한다.
        // console.log(lat, lon);
        // setLatitude(lat);
        // setLongitude(lon);
      }
    }
  }, [location, error, isChecked]);

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
      <SearchPlaceList searchPlace={place} />
    </>
  );
};

export default PartyPlaceCreate;
