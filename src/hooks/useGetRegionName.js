// useGeocoder.js

import { useState } from 'react';

const useGeocoder = () => {
  const { kakao } = window;
  const [regionName, setRegionName] = useState('');
  const geocoder = new kakao.maps.services.Geocoder();

  const getRegionName = (longitude, latitude) => {
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
        console.log('행정구역 이름: ' + regionName);
        setRegionName(regionName);
      }
    };

    geocoder.coord2RegionCode(longitude, latitude, callback);
  };
  return { regionName, getRegionName };
};

export default useGeocoder;
