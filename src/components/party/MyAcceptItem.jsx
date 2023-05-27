import { useMutation } from 'react-query';
import { MEMBER_URL, PARTIES_URL, PATH_URL } from '../../shared/constants';
import { deleteAPI, postAPI } from '../../api/api';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

const MyAcceptItem = ({ party }) => {
  const { partyId, title, partyParticipateId, memberName, memberProfileImage, awaiting } = party;

  const acceptMutation = useMutation(
    partyParticipateId => postAPI(`${PARTIES_URL.ACCEPT}/${partyParticipateId}`),
    {
      onSuccess: response => {
        alert(response.data.msg);
      },
      onError: error => {
        alert(error.message);
      },
    },
  );

  const handleAcceptClick = () => {
    acceptMutation.mutate(partyParticipateId);
  };

  const rejectMutation = useMutation(
    partyParticipateId => deleteAPI(`${PARTIES_URL.ACCEPT}/${partyParticipateId}`),
    {
      onSuccess: response => {
        alert(response.data.msg);
      },
      onError: error => {
        alert(error.message);
      },
    },
  );

  const handleRejectClick = () => {
    rejectMutation.mutate(partyParticipateId);
  };

  return (
    <PartyItemWrapper>
      <li>
        <Link to={`${PATH_URL.PARTY_DETAIL}/${partyId}`}>
          <p>제목: {title}</p>
          <p>신청자: {memberName}</p>
        </Link>
        <Link to={`${MEMBER_URL.TARGET_PAGE_GET}/${partyParticipateId}`}>
          <ProfileImage src={memberProfileImage} alt="memberProfileImage" />
        </Link>
      </li>
      <button onClick={handleAcceptClick}>승인하기</button>
      <button onClick={handleRejectClick}>승인거부</button>
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

export default MyAcceptItem;
