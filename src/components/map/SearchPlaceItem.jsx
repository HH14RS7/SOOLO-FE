import React from 'react';
import { styled } from 'styled-components';
import { PATH_URL } from '../../shared/constants';
import { useNavigate } from 'react-router-dom';

export default function SearchPlaceItem({ place }) {
  const navigate = useNavigate();

  const handleItemClick = () => {
    navigate(PATH_URL.PARTY_MAP_CREATE, { state: place });
  };

  return (
    <LocationItem onClick={handleItemClick}>
      <p>{place.place_name}</p>
      <p> {place.road_address_name}</p>
    </LocationItem>
  );
}

const LocationItem = styled.li`
  border: 1px solid black;
  cursor: pointer;
`;
