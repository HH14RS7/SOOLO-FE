import SearchLocation from '../components/map/SearchLocation';
import PartyMapContainer from '../components/map/PartyMapContainer';
import { useState } from 'react';

export const PartyListMap = () => {
  const [place, setPlace] = useState('');

  const handlePlaceChange = value => {
    setPlace(value);
  };
  return (
    <>
      <div>
        <SearchLocation onPlaceChange={handlePlaceChange} />
        <PartyMapContainer searchPlace={place} />
      </div>
    </>
  );
};
