import { QueryClient, useQuery } from 'react-query';
import { getAPI } from '../../api/api';
import { PARTIES_URL } from '../../shared/constants';
import MyRequestPartyItem from './MyRequestPartyItem';
import { useEffect } from 'react';
import { styled } from 'styled-components';

const MyRequestPartyList = () => {
  const queryClient = new QueryClient();

  const { data, isLoading, error } = useQuery(['parties'], () =>
    getAPI(`${PARTIES_URL.MY_PARTIES_LIST}`),
  );

  useEffect(() => {
    queryClient.invalidateQueries('parties');
  }, [queryClient]);

  if (isLoading) {
    return <div>로딩중입니다.</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  const requestPartyList = data?.data.data;
  return (
    <>
      {requestPartyList?.length > 0 ? (
        <ListWrapper>
          {requestPartyList.map(party => (
            <MyRequestPartyItem key={party.partyId} party={party} />
          ))}
        </ListWrapper>
      ) : (
        <div>신청한 모임이 없습니다.</div>
      )}
    </>
  );
};

export default MyRequestPartyList;

/* List */
const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
