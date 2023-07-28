import React from 'react';
import { styled } from 'styled-components';
import { formmatedDate } from '../../shared/formattedDate';
import { Link } from 'react-router-dom';
import { PATH_URL } from '../../shared/constants';
import { dDayConvertor } from '../../shared/dDayConvertor';
import { ReactComponent as Slash } from '../../assets/map/slash.svg';
import { ReactComponent as Location } from '../../assets/map/location-line.svg';
import { ReactComponent as People } from '../../assets/footer/mypage.svg';
import { ReactComponent as Subway } from '../../assets/map/subway.svg';
import { ReactComponent as Dot } from '../../assets/common/dot.svg';

export default function SearchPartyItem({ party }) {
  const dDay = dDayConvertor(party.partyDate);
  const isdday = dDay === 0;
  const partyDate = formmatedDate(party.partyDate, 'MM.DD (ddd)');
  const partyTime = formmatedDate(party.partyDate, 'a h:mm');
  const isfulled = party.currentCount === party.totalCount;
  const defaultImg = '/img/default-image.webp';

  return (
    <Wrapper>
      <Link to={`${PATH_URL.PARTY_DETAIL}/${party.partyId}`}>
        <ItemWrapper recuritmentsatus={party.recruitmentStatus ? 1 : 0}>
          <ImageDayInfo>
            <PlaceImage src={party.imageUrl || defaultImg} alt="placeImage" />
            <DdayTag isdday={isdday ? 1 : 0}>
              <Dday>D-{isdday ? 0 : dDay}</Dday>
            </DdayTag>
          </ImageDayInfo>
          <PartyDetailWrapper>
            <Title>{party.title}</Title>
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
              <PartyDate>{partyDate}</PartyDate> <DotIcon /> <PartyDate> {partyTime} </PartyDate>
            </PartyDateInfo>
          </PartyDetailWrapper>
        </ItemWrapper>
      </Link>
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const ItemWrapper = styled.div`
  display: flex;
  padding: 1rem;
  align-items: center;
  gap: 1rem;
  font-size: var(--font-size-regular);
  border-bottom: 1px solid var(--color-gray-100);
  opacity: ${props => (props.recuritmentsatus ? 1 : 0.6)};
`;

const ImageDayInfo = styled.div`
  position: relative;
  display: flex;
  isolation: isolate;
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
  // width: 100%;
  // height: 101px;
`;

const PlaceImage = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 1rem;
  align-items: center;
  isolation: isolate;
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
