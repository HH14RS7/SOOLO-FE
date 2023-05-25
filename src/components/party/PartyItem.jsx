import { styled } from 'styled-components';
import moment from 'moment';

const PartyItem = ({ party }) => {
  const targetDate = moment(party.date);
  const currentDate = moment();
  const dday = targetDate.diff(currentDate, 'days');

  return (
    <PartyItemWrapper>
      <div key={party.partyId}>
        <p>제목 : {party.title}</p>
        <p>내용 : {party.content}</p>
        <p>모임장 : {party.memberName}</p>
        <ProfileImage src={party.profileImage} alt="profileImage" />
        <p>장소 : {party.address}</p>
        <p>
          모집인원 : {party.currentCount} / {party.totalCount}명
        </p>
        <p>모집상태 : {party.processing ? '모집중' : '모집마감'}</p>
        <p>모임시간 : {party.date}</p>
        <p>디데이 : D-{dday > 0 ? dday : 0}</p>
      </div>
    </PartyItemWrapper>
  );
};

const PartyItemWrapper = styled.div`
  border: 1px solid black;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 50%;
`;

export default PartyItem;
