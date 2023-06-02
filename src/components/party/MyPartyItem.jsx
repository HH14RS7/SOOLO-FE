import { styled } from 'styled-components';
import { dDayConvertor } from '../../shared/dDayConvertor';
import { Link } from 'react-router-dom';
import { PATH_URL } from '../../shared/constants';
import { formmatedDate } from '../../shared/formattedDate';

const MyPartyItem = ({ party }) => {
  const {
    partyId,
    title,
    currentCount,
    totalCount,
    partyDate,
    state,
    imageUrl,
    stationName,
    placeAddress,
  } = party;

  const dDay = dDayConvertor(partyDate);
  const formattedDateTime = formmatedDate(partyDate, 'MM.DD · a h:mm');

  return (
    <PartyItemWrapper>
      <Link to={`${PATH_URL.PARTY_DETAIL}/${partyId}`}>
        <li key={partyId}>
          <p> D-{dDay > 0 ? dDay : 0}</p>
          <p>{title}</p>
          {/* <p>{recruitmentStatus ? '모집중' : '모집마감'}</p> */}
          {/* <p>승인상태 : {state}</p> */}
          <PlaceImage src={imageUrl} alt="placeImage" />
          <p>{stationName ? stationName : placeAddress}</p>
          <p>
            {currentCount} / {totalCount}
          </p>
          <p>{formattedDateTime}</p>
        </li>
      </Link>
    </PartyItemWrapper>
  );
};

const PartyItemWrapper = styled.div`
  border: 1px solid black;
`;

const PlaceImage = styled.img`
  width: 253px;
  height: 80px;
  border-radius: 16px;
`;
export default MyPartyItem;
