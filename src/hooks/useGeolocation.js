import { useState, useEffect } from 'react';

const useGeolocation = (options = {}) => {
  const [location, setLocation] = useState({
    loaded: false,
    loading: true,
    coordinates: { latitude: 0, longitude: 0 },
  });

  const onSuccess = location => {
    setLocation({
      loaded: true,
      loading: false,
      coordinates: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      },
    });
  };

  const onError = error => {
    setLocation({
      loading: false,
      loaded: true,
      error,
    });
  };

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      onError({
        code: 0,
        message: '현재위치를 가져올 수 없습니다',
      });
    } else {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
  }, []);

  return location;
};

export default useGeolocation;
