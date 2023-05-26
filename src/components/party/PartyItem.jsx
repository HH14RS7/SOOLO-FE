import { styled } from 'styled-components';
import { dDayConvertor } from '../../shared/dDayConvertor';
import { Link } from 'react-router-dom';
import { PATH_URL } from '../../shared/constants';
import moment from 'moment';

const PartyItem = ({ party }) => {
  const {
    partyId,
    title,
    // address,
    currentCount,
    totalCount,
    recruitmentStatus,
    partyDate,
    memberInfo,
  } = party;

  const dDay = dDayConvertor(partyDate);
  const formatPartyDate = moment(partyDate).format('YYYY월 MM월 DD일 a HH:mm');

  return (
    <PartyItemWrapper>
      <Link to={`${PATH_URL.PARTY_DETAIL}/${partyId}`}>
        <li key={partyId}>
          <p>디데이 : D-{dDay > 0 ? dDay : 0}</p>
          <p>제목 : {title}</p>
          {/* <p>장소 : {address}</p> 지도 작업후 추가 */}
          <p>모집상태 : {recruitmentStatus ? '모집중' : '모집마감'}</p>
          {/* <p>모임장 : {hostName}</p> */}
          <p>
            모집인원 : {currentCount} / {totalCount}명
          </p>
          <p>모임시간 : {formatPartyDate}</p>
          {memberInfo?.map((member, i) => (
            <div key={i}>
              <ProfileImage src={member.profileImage} alt="profileImage" />
            </div>
          ))}
        </li>
      </Link>
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
  display: flex;
`;

export default PartyItem;
