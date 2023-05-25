import { useState, useEffect } from 'react';
import { QueryClient, useQuery } from 'react-query';
import { getAPI } from '../../api/api';
import { PARTIES_URL } from '../../shared/constants';
import PartyItem from './PartyItem';

const PartyList = () => {
  const RECRUITMENT_STATUS_SELECT = [
    { value: 0, label: '전체' },
    { value: 1, label: '모집중' },
    { value: 2, label: '모집마감' },
  ];
  const queryClient = new QueryClient();

  const [recruitmentStatus, setRecruitmentStatus] = useState(RECRUITMENT_STATUS_SELECT[0].value);
  const page = 0;

  const { data, isLoading, error } = useQuery(
    ['parties', recruitmentStatus],
    () => getAPI(`${PARTIES_URL.PARTIES_LIST}?page=${page}&recruitmentStatus=${recruitmentStatus}`),
    {
      onSuccess: data => {
        //console.log('data.data.data, parties::::', data.data.data.partyList);
      },
      onError: error => {},
    },
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

  const partyList = data.data.data.partyList;
  console.log(partyList);
  return (
    <div>
      <h2>모임 리스트</h2>
      <select value={recruitmentStatus} onChange={handleSelectChange}>
        {RECRUITMENT_STATUS_SELECT.map(recruitment => (
          <option key={recruitment.value} value={recruitment.value}>
            {recruitment.label}
          </option>
        ))}
      </select>
      <ul>
        {partyList.map(party => (
          <PartyItem key={party.partyId} party={party} />
        ))}
      </ul>
    </div>
  );
};

export default PartyList;
