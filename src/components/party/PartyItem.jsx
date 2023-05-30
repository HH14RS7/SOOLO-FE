import { styled } from 'styled-components';
import { dDayConvertor } from '../../shared/dDayConvertor';
import { Link, useNavigate } from 'react-router-dom';
import { PATH_URL } from '../../shared/constants';
import { useEffect, useMemo, useState } from 'react';
import Cookies from 'js-cookie';
import { formmatedDate } from '../../shared/formattedDate';

const PartyItem = ({ party }) => {
  const [isLogin, setIsLogin] = useState(false);
  const token = Cookies.get('Access_key');
  const navigate = useNavigate();

  const {
    partyId,
    title,
    // address,
    currentCount,
    totalCount,
    recruitmentStatus,
    partyDate,
    state,
    memberInfo,
  } = party;

  const dDay = dDayConvertor(partyDate);
  const formattedDateTime = formmatedDate(partyDate, 'MM.DD · a h:mm');

  const stateMsg = useMemo(() => {
    if (state === 0) {
      return '';
    } else if (state === 1) {
      return '참여한 모임';
    } else if (state === 2) {
      return '승인대기중인 모임';
    } else {
      return '거절된 모임';
    }
  }, [state]);

  useEffect(() => {
    if (token) {
      setIsLogin(true);
    }
  }, [token, stateMsg]);

  const handleLinkClick = e => {
    if (!isLogin) {
      e.preventDefault();
      alert('로그인이 필요합니다.');
      navigate(PATH_URL.LOGIN);
    }
  };
  return (
    <PartyItemWrapper>
      <Link to={`${PATH_URL.PARTY_DETAIL}/${partyId}`} onClick={handleLinkClick}>
        <li key={partyId}>
          <p>디데이 : D-{dDay > 0 ? dDay : 0}</p>
          <p>제목 : {title}</p>
          {/* <p>장소 : {address}</p> 지도 작업후 추가 */}
          <p>모집상태 : {recruitmentStatus ? '모집중' : '모집마감'}</p>
          {/* <p>모임장 : {hostName}</p> */}
          <p>승인상태 : {stateMsg}</p>
          <p>
            모집인원 : {currentCount} / {totalCount}명
          </p>
          <p>모임시간 : {formattedDateTime}</p>
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
