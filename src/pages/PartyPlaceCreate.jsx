import SearchLocation from '../components/map/SearchLocation';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import SearchPlaceList from '../components/map/SearchPlaceList';

const PartyPlaceCreate = () => {
  const [place, setPlace] = useState('');
  const location = useLocation();
  const party = location.state || {};
  const handlePlaceChange = value => {
    setPlace(value);
  };

  return (
    <>
      <SearchLocation onPlaceChange={handlePlaceChange} />
      <SearchPlaceList searchPlace={place} />
    </>
  );
};

export default PartyPlaceCreate;
