import { useEffect, useState } from 'react';

const useGeoLocation = () => {
  const [location, setLocation] = useState({
    lng: '',
    lat: '',
    error: '',
  });

  const getCurrentPosition = () => {
    if (navigator.geolocation) {
      return new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject)
      );
    } else {
      return new Promise((resolve) => resolve({}));
    }
  };

  useEffect(() => {
    const getCoordinates = async () => {
      try {
        const { coords } = await getCurrentPosition();

        if (coords) {
          setLocation((state) => ({
            ...state,
            lng: coords.longitude,
            lat: coords.latitude,
          }));
        } else {
          setLocation((state) => ({
            ...state,
            error: 'Geolocation is not supported by this browser.',
          }));
        }
      } catch (error) {
        const { code } = error;

        switch (code) {
          case error.PERMISSION_DENIED:
            setLocation((state) => ({
              ...state,
              error: 'User denied the request for Geolocation.',
            }));
            break;
          case error.POSITION_UNAVAILABLE:
            setLocation((state) => ({
              ...state,
              error: 'Location information is unavailable.',
            }));
            break;
          case error.TIMEOUT:
            setLocation((state) => ({
              ...state,
              error: 'The request to get user location timed out.',
            }));
            break;
          case error.UNKNOWN_ERROR:
            setLocation((state) => ({
              ...state,
              error: 'An unknown error occurred.',
            }));
            break;
          default:
            break;
        }
      }
    };

    getCoordinates();
  }, []);

  return location;
};

export default useGeoLocation;
