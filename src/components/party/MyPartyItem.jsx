import { styled } from 'styled-components';
import { dDayConvertor } from '../../shared/dDayConvertor';
import { Link } from 'react-router-dom';
import { PATH_URL } from '../../shared/constants';
import { formmatedDate } from '../../shared/formattedDate';
import { ReactComponent as Location } from '../../assets/map/location-line.svg';
import { ReactComponent as People } from '../../assets/footer/mypage.svg';
import { ReactComponent as Subway } from '../../assets/map/subway.svg';
import { ReactComponent as Dot } from '../../assets/map/dot.svg';

const MyPartyItem = ({ party }) => {
  const { partyId, title, partyDate, state, imageUrl, stationName, placeAddress } = party;

  const dDay = dDayConvertor(party.partyDate);
  const isdday = dDay === 0;
  const formmatedPartyDate = formmatedDate(party.partyDate, 'MM.DD (ddd)');
  const partyTime = formmatedDate(party.partyDate, 'a h:mm');

  const gradiant1 = '/img/gradiant-black-op20.png';
  const gradiant2 = '/img/gradiant-op20.png';

  return (
    <>
      <Link to={`${PATH_URL.PARTY_DETAIL}/${partyId}`}>
        <PlaceWrapper>
          <ImageWrapper>
            <PlaceImage src={party.imageUrl} imgurl={imageUrl} alt="placeImage" />
            <Gradiant1 src={gradiant1} alt="gradiant1" />
            <Gradiant2 src={gradiant2} alt="gradiant2" />
          </ImageWrapper>
          <DateInfo>
            <DdayTag isdday={isdday ? 1 : 0}>
              <Dday>D-{isdday ? 0 : dDay}</Dday>
            </DdayTag>
            <PartyDateInfo>
              <PartyDate>{formmatedPartyDate}</PartyDate> <DotIcon />
              <PartyDate> {partyTime} </PartyDate>
            </PartyDateInfo>
          </DateInfo>
          <DetailInfo>
            <Title>{party.title}</Title>
            <PartyPlace>
              {party.stationName ? <Subway /> : <Location />}
              <PlaceName>
                {party.stationName ? party.stationName?.split(' ')[0] : party.regionName}
              </PlaceName>
            </PartyPlace>
          </DetailInfo>
        </PlaceWrapper>
      </Link>
    </>
  );
};

/* PlaceWrapper */
const PlaceWrapper = styled.div`
  margin-left: 0.5rem;
  display: flex;
  flex-direction: column;
  width: 242px;
  height: 146px;
  overflow: hidden;
  border-radius: 1rem;
  position: relative;
  border-radius: 16px;
  border: 1px solid var(--color-gray-100);
    url(${props => props.imgurl});
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 74px;
  position: relative;
`;

const PlaceImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
`;

const Gradiant1 = styled.img`
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  position: absolute;
`;

const Gradiant2 = styled.img`
  top: 0px;
  // left: 0px;
  width: 100%;
  height: 100%;
  position: absolute;
`;

const DateInfo = styled.div`
  align-items: flex-start;
  position: absolute;
  left: 16px;
  top: 12px;
  display: flex;
  gap: 9px;
  align-items: center;
`;

const Dday = styled.h5`
  color: var(--color-white);
`;

const PartyDateInfo = styled.div`
  display: flex;
  gap: 0.25rem;
`;

const PartyDate = styled.h4`
  color: var(--color-white);
`;

const DdayTag = styled.div`
  padding: 0.25rem 0.5rem;
  width: 40px;
  height: 22px;
  background: ${props => (props.isdday ? 'var(--color-primary-500)' : 'var(--color-primary-300)')};
  border-radius: 999px;
  width: auto;
`;

const DotIcon = styled(Dot)`
  fill: var(--color-gray-500);
  margin: auto 0;
  align-items: center;
`;

const DetailInfo = styled.div`
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: flex-start;
  padding: 16px;
  gap: 0.5rem;
  width: 242px;
  height: 72px;
  background: #ffffff;
  border-radius: 0px 0px 1rem 1rem;
`;

const Title = styled.h3`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: break-all;
  width: 220px;
`;

const PartyPlace = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.25rem;
`;

const PlaceName = styled.h5``;

export default MyPartyItem;
