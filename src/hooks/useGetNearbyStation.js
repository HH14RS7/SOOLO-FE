import { useState } from 'react';

const useGetNearbyStation = () => {
  const { kakao } = window;
  const ps = new kakao.maps.services.Places();
  const [stationName, setStationName] = useState('');
  const [distance, setDistance] = useState('');

  const STATION_CATEGORY_CODE = 'SW8'; // 지하철역 카테고리 코드

  const getStationInfo = (latitude, longitude) => {
    console.log(latitude, longitude);
    const categoryOptions = {
      size: 1,
      location: new kakao.maps.LatLng(latitude, longitude),
      radius: 5000,
      sort: kakao.maps.services.SortBy.DISTANCE,
      category: STATION_CATEGORY_CODE,
    };

    const callback = function (result, status) {
      const nearbyStation = result[0];
      if (status === kakao.maps.services.Status.OK && nearbyStation) {
        setStationName(nearbyStation.place_name);
        setDistance(nearbyStation.distance);
      } else {
        setStationName('');
        setDistance('');
      }
    };

    ps.categorySearch(STATION_CATEGORY_CODE, callback, categoryOptions);
  };

  return { stationName, distance, getStationInfo };
};

export default useGetNearbyStation;
