import React from 'react';
import { styled } from 'styled-components';
import { formmatedDate } from '../../shared/formattedDate';
import { Link } from 'react-router-dom';
import { PATH_URL } from '../../shared/constants';

export default function SelectedPartyItem({ party }) {
  const { partyId, title, currentCount, totalCount, partyDate, address, imageUrl } = party;

  return (
    <ListMapper>
      <Link to={`${PATH_URL.PARTY_DETAIL}/${partyId}`}>
        <div>
          <p>{title}</p>
          <span>
            {currentCount}/{totalCount}
          </span>
          <span>{party.stationName ? party.stationName : party.placeAddress}</span>

          <p> {formmatedDate(partyDate, 'MM.DD · a h:mm')}</p>
          <p>{address}</p>
          <PlaceImage src={imageUrl} alt="placeImage" />
        </div>
      </Link>
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
