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

  console.log(party);
  const {
    partyId,
    title,
    currentCount,
    totalCount,
    recruitmentStatus,
    partyDate,
    state,
    imageUrl,
    stationName,
    placeAddress,
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
          <p> D-{dDay > 0 ? dDay : 0}</p>
          <p>{title}</p>
          {/* <p>{recruitmentStatus ? '모집중' : '모집마감'}</p> */}
          {/* <p>승인상태 : {stateMsg}</p> */}
          <PlaceImage src={imageUrl} alt="placeImage" />
          <p>{stationName ? stationName : placeAddress}</p>
          <p>
            {currentCount} / {totalCount}
          </p>
          <p>{formattedDateTime}</p>
        </li>
      </Link>
    </PartyItemWrapper>
  );
};

const PartyItemWrapper = styled.div`
  border: 1px solid black;
`;

const PlaceImage = styled.img`
  width: 74px;
  height: 74px;
  border-radius: 16px;
`;
export default PartyItem;
