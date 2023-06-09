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
    <PlaceItem onClick={handleItemClick}>
      <PlaceInfo>
        <h3>{place.place_name}</h3>
        <Category> {place.category_name.split('>').reverse()[0]}</Category>
      </PlaceInfo>
      <PlaceAddress> {place.road_address_name}</PlaceAddress>
    </PlaceItem>
  );
}

const PlaceItem = styled.li`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1rem;
  gap: 0.5rem;
  border-bottom: 1px solid var(--color-gray-200);
`;

const PlaceInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Category = styled.h5`
  color: var(--color-gray-500);
`;

const PlaceAddress = styled.h5`
  color: var(--color-gray-500);
`;
