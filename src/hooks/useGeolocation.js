import { useState, useEffect } from 'react';

const useGeolocation = (options = {}) => {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { latitude: 0, longtitude: 0 },
  });

  const onSuccess = location => {
    setLocation({
      loaded: true,
      coordinates: {
        latitude: location.coords.latitude,
        longtitude: location.coords.longitude,
      },
    });
  };

  const onError = error => {
    setLocation({
      loaded: true,
      error,
    });
  };

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      onError({
        code: 0,
        message: 'Geolocation not supported',
      });
    } else {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
  }, []);

  return location;
};

// location 정보 저장
// const [location, setLocation] = useState();
// // 에러 메세지 저장
// const [error, setError] = useState();

// // Geolocation의 `getCurrentPosition` 메소드에 대한 성공 callback 핸들러
// const handleSuccess = pos => {
//   const { latitude, longitude } = pos.coords;

//   setLocation({
//     latitude,
//     longitude,
//   });
// };

// // Geolocation의 `getCurrentPosition` 메소드에 대한 실패 callback 핸들러
// const handleError = error => {
//   setError(error.message);
// };

// useEffect(() => {
//   const { geolocation } = navigator;

//   // 사용된 브라우저에서 지리적 위치(Geolocation)가 정의되지 않은 경우 오류로 처리합니다.
//   if (!geolocation) {
//     setError('Geolocation is not supported.');
//     return;
//   }

//   // Geolocation API 호출
//   geolocation.getCurrentPosition(handleSuccess, handleError, options);
// }, [options]);

// return { location, error };
// };
export default useGeolocation;
