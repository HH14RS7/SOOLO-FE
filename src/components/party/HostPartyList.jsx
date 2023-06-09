import { useQuery } from 'react-query';
import { getAPI } from '../../api/api';
import { PARTIES_URL } from '../../shared/constants';
import HostPartyItem from './HostPartyItem';
import { styled } from 'styled-components';

const HostPartyList = () => {
  const { data, isLoading, error } = useQuery('hostParties', () =>
    getAPI(`${PARTIES_URL.MY_HOST_LIST}`),
  );

  if (isLoading) {
    return <div>로딩중입니다.</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const partyList = data?.data.data;

  return (
    <>
      {partyList?.length > 0 ? (
        <ListWrapper>
          {partyList?.map(party => (
            <HostPartyItem key={party.partyId} party={party} />
          ))}
        </ListWrapper>
      ) : (
        <div>개설한 모임이 없습니다</div>
      )}
    </>
  );
};

export default HostPartyList;

/* List */
const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
