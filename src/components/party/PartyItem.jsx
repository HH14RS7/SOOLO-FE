import { styled } from 'styled-components';
import { dDayConvertor } from '../../shared/dDayConvertor';
import { Link } from 'react-router-dom';
import { PARTIES_URL } from '../../shared/constants';

const PartyItem = ({ party }) => {
  const {
    partyId,
    title,
    content,
    hostName,
    // profileImage,
    // address,
    currentCount,
    totalCount,
    processing,
    partyDate,
  } = party;

  const dDay = dDayConvertor(partyDate);

  console.log(partyDate);
  return (
    <PartyItemWrapper>
      <Link to={`${PARTIES_URL.PARTY}/${partyId}`}>
        <li key={partyId}>
          <p>디데이 : D-{dDay > 0 ? dDay : 0}</p>
          <p>제목 : {title}</p>
          <p>내용 : {content}</p>
          <p>모임장 : {hostName}</p>
          {/* <ProfileImage src={profileImage} alt="profileImage" /> */}
          {/* <p>장소 : {address}</p> 지도 작업후 추가 */}
          <p>
            모집인원 : {currentCount} / {totalCount}명
          </p>
          <p>모집상태 : {processing ? '모집중' : '모집마감'}</p>
          <p>모임시간 : {partyDate}</p>
        </li>
      </Link>
    </PartyItemWrapper>
  );
};

const PartyItemWrapper = styled.div`
  border: 1px solid black;
`;

// const ProfileImage = styled.img`
//   width: 40px;
//   height: 40px;
//   object-fit: cover;
//   border-radius: 50%;
// `;

export default PartyItem;
