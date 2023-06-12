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

const PartyItem = ({ party }) => {
  const defaultImg = '/img/default-image.png';
  const dDay = dDayConvertor(party.partyDate);
  const isdday = dDay === 0;
  const formmatedPartyDate = formmatedDate(party.partyDate, 'MM.DD (ddd)');
  const partyTime = formmatedDate(party.partyDate, 'a h:mm');
  const isfulled = party.currentCount === party.totalCount;

  return (
    <>
      <Link to={`${PATH_URL.PARTY_DETAIL}/${party.partyId}`}>
        <ItemWrapper>
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
              <PartyDate>{formmatedPartyDate}</PartyDate> <DotIcon />
              <PartyDate> {partyTime} </PartyDate>
            </PartyDateInfo>
          </PartyDetailWrapper>
        </ItemWrapper>
      </Link>
    </>
  );
};

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
  object-fit: cover;
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
  height: 101px;
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

// 모달
const Modals = styled.div`
  position: fixed;
  overflow: hidden;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: rgba(29, 41, 57, 0.5);
  /* margin: 0 auto; */
  /* width: 375px; */
  height: 100%;
`;

const ModalContent = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  text-align: center;
  background-color: white;
  width: 360px;
  height: 196px;
  border-radius: 16px 16px 0px 0px;
  margin: 0 auto;
  bottom: 70px;
`;

const ModalMenuBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 52px;
  font-size: 16px;
  font-weight: 400;
`;

const ModalChatExit = styled.button`
  display: flex;
  align-items: center;
  padding: 16px;
  font-size: 16px;
  width: 330px;
  height: 48px;
`;

const ModalReport = styled.button`
  display: flex;
  align-items: center;
  text-align: left;
  font-size: 16px;
  width: 330px;
  height: 48px;
  padding: 16px;
`;

const ComingSoon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-left: 10px;
  width: 79px;
  height: 22px;
  font-size: 10px;
  border-radius: 10px;
  background: #f2f4f7;
  color: #344054;
`;

// Exit Modal 스타일
const ExitContainer = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  position: fixed;
`;

const ExitModal = styled.div`
  text-align: center;
  margin: auto;
  z-index: 100;
  width: 327px;
  height: 198px;
  border-radius: 16px;
  background: #fff;
`;

const ExitName = styled.div`
  font-size: 16px;
  font-weight: 700;
  margin-top: 60px;
`;

const ExitText = styled.div`
  font-size: 14px;
  margin-top: 8px;
`;

const ExitBtnDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 36px;
`;

const ExitCancel = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  color: #667085;
  font-size: 12px;
  font-weight: 600;
  width: 140px;
  height: 48px;
  background: #fff;
  border: 1.5px solid #667085;
  border-radius: 12px;
  cursor: pointer;
`;

const EixtBtn = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  color: #fff;
  font-weight: 600;
  font-size: 12px;
  width: 140px;
  height: 48px;
  background: #f63d68;
  border-radius: 12px;
  cursor: pointer;
`;

export default PartyItem;
