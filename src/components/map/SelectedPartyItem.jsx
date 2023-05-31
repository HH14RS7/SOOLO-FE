import React from 'react';
import { styled } from 'styled-components';
import { formmatedDate } from '../../shared/formattedDate';

export default function SelectedPartyItem({ party }) {
  console.log(party);
  const { title, currentCount, totalCount, partyDate, address, image } = party;
  return (
    <ListMapper>
      <div>
        <p>{title}</p>
        <span>
          {currentCount}/{totalCount}
        </span>
        <p> {formmatedDate(partyDate, 'MM.DD · a h:mm')}</p>
        <p>{address}</p>
        <PlaceImage src={image} alt="placeImage" />
      </div>
    </ListMapper>
  );
}

const ListMapper = styled.div`
  border: 1px solid black;
  font-size: 14px;
`;

const PlaceImage = styled.img`
  width: 30px;
  height: 30px;
`;
