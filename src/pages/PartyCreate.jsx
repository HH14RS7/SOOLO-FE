import PartyForm from '../components/party/PartyForm';
import SearchLocation from '../components/map/SearchLocation';
import MapContainer from '../components/map/MapContainer';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const PartyCreate = () => {
  const [place, setPlace] = useState('');
  const location = useLocation();
  const party = location.state || {};
  const handlePlaceChange = value => {
    setPlace(value);
  };

  return (
    <>
      <SearchLocation onPlaceChange={handlePlaceChange} />
      <MapContainer searchPlace={place} party={party} />
      <PartyForm party={party} />
    </>
  );
};

export default PartyCreate;
