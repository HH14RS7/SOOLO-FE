import { styled } from 'styled-components';
import { dDayConvertor } from '../../shared/dDayConvertor';
import { Link } from 'react-router-dom';
import { PATH_URL } from '../../shared/constants';
import { formmatedDate } from '../../shared/formattedDate';

const MyRequestPartyItem = ({ party }) => {
  const {
    partyId,
    title,
    // address,
    // currentCount,
    // totalCount,
    approveStatus,
    partyDate,
    memberInfo,
    state,
  } = party;

  const dDay = dDayConvertor(partyDate);
  const formattedDateTime = formmatedDate(partyDate, 'MM.DD · a h:mm');

  console.log('approveStatus', approveStatus);
  return (
    <PartyItemWrapper>
      <Link to={`${PATH_URL.PARTY_DETAIL}/${partyId}`}>
        <li key={partyId}>
          <p>승인상태 : {state === 1 ? '승인완료' : '승인대기'}</p>
          <p>디데이 : D-{dDay > 0 ? dDay : 0}</p>
          <p>제목 : {title}</p>
          {/* <p>장소 : {address}</p> 지도 작업후 추가 */}
          {/* <p>
            모집인원 : {currentCount} / {totalCount}명
          </p> */}
          <p>모임시간 : {formattedDateTime}</p>
          {memberInfo?.map((member, i) => (
            <ProfileImageWrapper key={i}>
              <ProfileImage src={member.profileImage} alt="profileImage" />
            </ProfileImageWrapper>
          ))}
        </li>
      </Link>
    </PartyItemWrapper>
  );
};

const PartyItemWrapper = styled.div`
  border: 1px solid black;
`;

const ProfileImageWrapper = styled.div`
  display: flex;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 50%;
`;

export default MyRequestPartyItem;
