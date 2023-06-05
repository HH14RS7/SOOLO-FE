import { useState, useEffect } from 'react';

const useGeolocation = (options = {}) => {
  const [location, setLocation] = useState({
    loaded: false,
    loading: true,
    coordinates: { latitude: '', longitude: '' },
    erorr: '',
  });

  const onSuccess = location => {
    setLocation({
      loaded: true,
      loading: false,
      coordinates: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      },
      error: '',
    });
  };

  const onError = error => {
    let errorMessage = '';
    switch (error.code) {
      case 0:
        errorMessage = '현재 위치를 지원하지 않습니다.';
        break;
      case 1:
        errorMessage = '위치 정보 수집을 허용해주세요.';
        break;
      case 2:
        errorMessage = '현재 위치를 가져올 수 없습니다. 잠시 후 다시 시도해주세요.';
        break;
      default:
        errorMessage = '현재 위치를 가져올 수 없습니다.';
        break;
    }

    setLocation({
      error: {
        code: error.code,
        message: errorMessage,
      },
    });
  };

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      onError({
        code: 0,
        message: '현재위치를 지원하지 않습니다',
      });
    } else {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
  }, []);

  return { location, error: location.error };
};

export default useGeolocation;
