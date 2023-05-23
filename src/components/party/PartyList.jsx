import { useState, useMemo } from 'react';
import { useQuery } from 'react-query';
import { getAPI } from '../../api/api';
import { PARTIES_URL } from '../../shared/constants';
import PartyItem from './PartyItem';

const PartyList = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const { data, isLoading, error } = useQuery('parties', () => getAPI(PARTIES_URL.PARTIES_LIST));

  const handleChange = e => {
    setSelectedOption(e.target.value);
  };

  const partyList = useMemo(() => {
    if (!data) return [];
    return data.data;
  }, [data]);

  if (isLoading) {
    return <div>로딩중입니다.</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const filteredPartyList = partyList.filter(party => {
    if (selectedOption === 'all' || selectedOption === '') {
      return true;
    }
    return party.processing.toString() === selectedOption;
  });

  return (
    <div>
      <h2>모임 리스트</h2>
      <select value={selectedOption} onChange={handleChange}>
        <option value="all">전체</option>
        <option value="true">모집중</option>
        <option value="false">모집마감</option>
      </select>
      <ul>
        {filteredPartyList.map(party => (
          <PartyItem key={party.partyId} party={party} />
        ))}
      </ul>
    </div>
  );
};

export default PartyList;
