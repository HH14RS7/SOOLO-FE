import { useState, useEffect } from 'react';
import { QueryClient, useQuery } from 'react-query';
import { getAPI } from '../../api/api';
import { PARTIES_URL, PATH_URL } from '../../shared/constants';
import PartyItem from './PartyItem';
import { styled } from 'styled-components';
import { Link } from 'react-router-dom';

const PartyList = () => {
  const RECRUITMENT_STATUS_SELECT = [
    { value: 0, label: '전체' },
    { value: 1, label: '모집중' },
    { value: 2, label: '모집마감' },
  ];
  const queryClient = new QueryClient();

  const [recruitmentStatus, setRecruitmentStatus] = useState(RECRUITMENT_STATUS_SELECT[0].value);
  const page = 0; // 임시

  const { data, isLoading, error } = useQuery(['parties', recruitmentStatus], () =>
    getAPI(`${PARTIES_URL.PARTIES_LIST}?page=${page}&recruitmentStatus=${recruitmentStatus}`),
  );

  useEffect(() => {
    queryClient.invalidateQueries('parties');
  }, [queryClient, recruitmentStatus]);

  const handleSelectChange = e => {
    const newRecruitmentStatus = e.target.value;
    if (recruitmentStatus !== newRecruitmentStatus) {
      setRecruitmentStatus(newRecruitmentStatus);
    }
  };

  if (isLoading) {
    return <div>로딩중입니다.</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const partyList = data?.data.data.partyList;
  if (!partyList) {
    return (
      <Link to={`${PATH_URL.PARTY_CREATE}`}>
        <CreateButton>모임만들기</CreateButton>
        <p>
          앗! 모임이 아직 만들어지지 않았어요!
          <br /> 모임을 열어보시면 어떨까요?
        </p>
      </Link>
    );
  }

  return (
    <div>
      <h1>모임 리스트</h1>
      <select value={recruitmentStatus} onChange={handleSelectChange}>
        {RECRUITMENT_STATUS_SELECT.map(recruitment => (
          <option key={recruitment.value} value={recruitment.value}>
            {recruitment.label}
          </option>
        ))}
      </select>
      <ul>
        {partyList?.map(party => (
          <PartyItem key={party.partyId} party={party} />
        ))}
      </ul>
    </div>
  );
};

const CreateButton = styled.button`
  width: 100px;
  height: 100px;
  border: 1px solid pink;
`;
export default PartyList;
