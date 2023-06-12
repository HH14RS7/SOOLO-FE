import { styled } from 'styled-components';
import { dDayConvertor } from '../../shared/dDayConvertor';
import { Link } from 'react-router-dom';
import { PATH_URL } from '../../shared/constants';
import { formmatedDate } from '../../shared/formattedDate';
import { ReactComponent as Slash } from '../../assets/map/slash.svg';
import { ReactComponent as Location } from '../../assets/map/location-line.svg';
import { ReactComponent as People } from '../../assets/footer/mypage.svg';
import { ReactComponent as Subway } from '../../assets/map/subway.svg';
import { ReactComponent as Dot } from '../../assets/map/dot.svg';
import { ReactComponent as Complete } from '../../assets/mypage/complete.svg';
import { ReactComponent as Wait } from '../../assets/mypage/wait.svg';
import { ReactComponent as Nagative } from '../../assets/mypage/nagative.svg';

const MyRequestPartyItem = ({ party }) => {
  const dDay = dDayConvertor(party.partyDate);
  const isdday = dDay === 0;
  const formmatedPartyDate = formmatedDate(party.partyDate, 'MM.DD (ddd)');
  const partyTime = formmatedDate(party.partyDate, 'a h:mm');
  const isfulled = party.currentCount === party.totalCount;
  const defaultImg = '/img/default-image.png';

  return (
    <Link to={`${PATH_URL.PARTY_DETAIL}/${party.partyId}`}>
      <ItemWrapper>
        <ImageDayInfo>
          <PlaceImage src={defaultImg || party.imageUrl} alt="placeImage" />
          <DdayTag isdday={isdday ? 1 : 0}>
            <Dday>D-{isdday ? 0 : dDay}</Dday>
          </DdayTag>
        </ImageDayInfo>
        <PartyDetailWrapper>
          <TitleCon>
            <p>
              {party.state === 1 ? (
                <Complete />
              ) : party.state === 2 ? (
                <Wait />
              ) : party.state === 3 ? (
                <Nagative />
              ) : (
                ''
              )}
            </p>
            <Title>{party.title}</Title>
          </TitleCon>
          <DetailPlacePeople>
            <PartyPlace>
              {party.stationName ? <Subway /> : <Location />}
              <PlaceName>
                {party.stationName ? party.stationName?.split(' ')[0] : party.regionName}
              </PlaceName>
            </PartyPlace>
            <PeopleCountInfo isfulled={isfulled ? 1 : 0}>
              <PeopleIcon isfulled={isfulled ? 1 : 0} />
              <PeopleCount>{party.currentCount} </PeopleCount>
              <SlashIcon isfulled={isfulled ? 1 : 0} />
              <PeopleCount> {party.totalCount} </PeopleCount>
            </PeopleCountInfo>
          </DetailPlacePeople>
          <PartyDateInfo>
            <PartyDate>{formmatedPartyDate}</PartyDate> <DotIcon />
            <PartyDate> {partyTime} </PartyDate>
          </PartyDateInfo>
        </PartyDetailWrapper>
      </ItemWrapper>
    </Link>
  );
};

export default MyRequestPartyItem;

const ItemWrapper = styled.li`
  display: flex;
  align-items: center;
  padding: 0px 0.5rem;
  gap: 1rem;
  height: 101px;
  font-size: var(--font-size-regular);
  border-bottom: 1px solid var(--color-gray-100);
`;

const PlaceImage = styled.img`
  width: 74px;
  height: 74px;
  border-radius: 16px;
`;

const ImageDayInfo = styled.div`
  position: relative;
  display: flex;
  width: 70px;
  height: 70px;
`;

const DdayTag = styled.div`
  position: absolute;
  top: 6px;
  left: 6px;
  align-items: flex-start;
  padding: 0.25rem 0.5rem;
  width: 40px;
  height: 22px;
  background: ${props => (props.isdday ? 'var(--color-primary-500)' : 'var(--color-primary-300)')};
  border-radius: 999px;
  width: auto;
`;

const Dday = styled.h5`
  color: var(--color-white);
  border-bottom: var(--color-gray-100);
  white-space: nowrap;
`;

const PartyDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  width: 242px;
  height: 62px;
`;

const Title = styled.h3`
  width: 240px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: break-all;
`;

const DetailPlacePeople = styled.div`
  display: flex;
  gap: 1rem;
  display: flex;
  align-items: flex-start;
`;

const PartyPlace = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.25rem;
`;

const PlaceName = styled.h5``;

const PeopleCountInfo = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.25rem;
  align-items: center;
  color: ${props => (props.isfulled ? 'var(--color-error-500)' : 'inherit')};
`;

const PeopleIcon = styled(People)`
  width: 14px;
  height: 14px;
  fill: ${props => (props.isfulled ? 'var(--color-error-500)' : 'inherit')};
`;

const SlashIcon = styled(Slash)`
  fill: ${props => (props.isfulled ? 'var(--color-error-500)' : 'inherit')};
`;

const PeopleCount = styled.h5``;

const PartyDateInfo = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 7px;
  justify-content: center;
`;

const PartyDate = styled.h5`
  color: var(--color-gray-500);
`;

const DotIcon = styled(Dot)`
  fill: var(--color-gray-500);
  margin: auto 0;
  align-items: center;
`;

const TitleCon = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 4px;

  width: 224px;
  height: 18px;
`;
