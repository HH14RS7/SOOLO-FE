import PartyForm from '../components/party/PartyForm';
import SearchLocation from '../components/map/SearchLocation';
import MapContainer from '../components/map/MapContainer';
import { useState } from 'react';

const PartyCreate = () => {
  const [place, setPlace] = useState('');

  const handlePlaceChange = value => {
    setPlace(value);
  };

  return (
    <>
      <SearchLocation onPlaceChange={handlePlaceChange} />
      <MapContainer searchPlace={place} />
      <PartyForm />
    </>
  );
};

export default PartyCreate;
