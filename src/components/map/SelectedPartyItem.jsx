import React from 'react';
import { styled } from 'styled-components';
import { formmatedDate } from '../../shared/formattedDate';
import { Link } from 'react-router-dom';
import { PATH_URL } from '../../shared/constants';
import { ReactComponent as Slash } from '../../assets/map/slash.svg';
import { ReactComponent as Location } from '../../assets/map/location-line.svg';
import { ReactComponent as People } from '../../assets/footer/mypage.svg';
import { ReactComponent as Subway } from '../../assets/map/subway.svg';
import { ReactComponent as Dot } from '../../assets/map/dot.svg';
import { dDayConvertor } from '../../shared/dDayConvertor';

export default function SelectedPartyItem({ party }) {
  const { partyId, title, currentCount, totalCount, stationName, regionName, partyDate, imageUrl } =
    party;
  const dDay = dDayConvertor(partyDate);
  const isdday = dDay === 0;
  const formatPartyDate = formmatedDate(partyDate, 'MM.DD (ddd)');
  const partyTime = formmatedDate(partyDate, 'a h:mm');
  const isfulled = party.currentCount === party.totalCount;

  return (
    <>
      <Link to={`${PATH_URL.PARTY_DETAIL}/${partyId}`}>
        <PartyItem>
          <ImageDayInfo>
            <PlaceImage src={party.imageUrl} alt="placeImage" />
            <DdayTag isdday={isdday ? 1 : 0}>
              <Dday>D-{isdday ? 0 : dDay}</Dday>
            </DdayTag>
          </ImageDayInfo>
          <PartyDetailWrapper>
            <Title>{title}</Title>
            <DetailPlacePeople>
              <PartyPlace>
                {party.stationName ? <Subway /> : <Location />}
                <PlaceName>
                  {party.stationName ? party.stationName?.split(' ')[0] : party.regionName}
                </PlaceName>
              </PartyPlace>
              <PeopleCountInfo isfulled={isfulled ? 1 : 0}>
                <PeopleIcon isfulled={isfulled ? 1 : 0} />
                <PeopleCount>{currentCount} </PeopleCount>
                <SlashIcon isfulled={isfulled ? 1 : 0} />
                <PeopleCount> {totalCount} </PeopleCount>
              </PeopleCountInfo>
            </DetailPlacePeople>
            <PartyDateInfo>
              <PartyDate>{formatPartyDate}</PartyDate> <DotIcon />{' '}
              <PartyDate> {partyTime} </PartyDate>
            </PartyDateInfo>
          </PartyDetailWrapper>
        </PartyItem>
      </Link>
    </>
  );
}

const PartyItem = styled.div`
  width: 327px;
  height: 170px;
  position: relative;
  background: var(--color-white);
  border-width: 0px 1px 1px 1px;
  border-style: solid;
  border-color: var(--color-gray-100);
  border-radius: 1rem;
  left: 1rem;
  border: 1px solid var(--color-primary-500);
  filter: drop-shadow(4px 4px 22px rgba(0, 0, 0, 0.25));
  border-radius: 16px;
  overflow: hidden;
`;

const ImageDayInfo = styled.div`
  overflow: hidden; /* 추가 */
  // border-radius: 1rem;
`;

const DdayTag = styled.div`
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  align-items: flex-start;
  padding: 0.25rem 0.5rem;
  width: 40px;
  height: 22px;
  background: ${props => (props.isdday ? 'var(--color-primary-500)' : 'var(--color-primary-300)')};
  border-radius: 999px;
  // width: auto;
`;

const Dday = styled.h5`
  color: var(--color-white);
  border-bottom: var(--color-gray-100);
  white-space: nowrap;
`;

const PartyDetailWrapper = styled.div`
  /* Auto layout */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 16px;
  gap: 10px;
  position: absolute;
  width: 327px;
  height: 96px;
  left: 0px;
  top: 74px;
  background: var(--color-white);
  /* Gray/100 */
`;

const Title = styled.h3`
  // width: 100%;
  // height: 101px;
`;

const PlaceImage = styled.img`
  width: 100%;
  height: 72px;
  object-fit: cover;
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
