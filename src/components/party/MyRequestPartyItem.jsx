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
          <p>
            {state === 1 ? '승인완료' : state === 2 ? '대기중' : state === 3 ? '거절된 모임' : ''}
          </p>
          <p>D-{dDay > 0 ? dDay : 0}</p>
          <p>{title}</p>
          {/* <p>장소 : {address}</p> 지도 작업후 추가 */}
          {/* <p>
            모집인원 : {currentCount} / {totalCount}명
          </p> */}
          <p>{formattedDateTime}</p>
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
