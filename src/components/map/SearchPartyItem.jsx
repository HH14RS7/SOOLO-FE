import React from 'react';
import { styled } from 'styled-components';
import { formmatedDate } from '../../shared/formattedDate';

export default function SearchPartyItem({ party }) {
  return (
    <>
      <ItemWrapper>
        <p>{party.title}</p>
        <PlaceImage src={party.image} alt="placeImage" />
        <span>{party.stationName ? party.stationName : party.placeAddress}</span>
        <span>
          {party.currentCount}/{party.totalCount}
        </span>
        <p> {formmatedDate(party.partyDate, 'MM.DD · a h:mm')}</p>
      </ItemWrapper>
    </>
  );
}
const PlaceImage = styled.img`
  width: 30px;
  height: 30px;
`;

const ItemWrapper = styled.li`
  border: 1px solid black;
  font-size: 14px;
`;
