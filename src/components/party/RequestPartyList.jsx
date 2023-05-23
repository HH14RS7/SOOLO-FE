import { useQuery } from 'react-query';
import PartyItem from './PartyItem';
import { styled } from 'styled-components';
import { getAPI } from '../../api/api';
import { PARTIES_URL } from '../../shared/constants';
import { useMemo } from 'react';

const RequestPartyList = () => {
  const { data, isLoading, error } = useQuery('parties', () => getAPI(PARTIES_URL.MY_PARTIES_LIST));

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
  return (
    <ListWraaper>
      <h2>신청중인 모임 리스트</h2>
      <ul>
        {partyList?.map(party => (
          <PartyItem key={party.partyId} party={party} />
        ))}
      </ul>
    </ListWraaper>
  );
};

const ListWraaper = styled.div`
  border: 1px solid black;
`;

export default RequestPartyList;
