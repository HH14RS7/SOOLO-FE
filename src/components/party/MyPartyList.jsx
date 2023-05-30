import { useQuery } from 'react-query';
import { getAPI } from '../../api/api';
import { PARTIES_URL } from '../../shared/constants';
import MyPartyItem from './MyPartyItem';

const MyPartyList = () => {
  const approveStatus = 0;

  const { data, isLoading, error } = useQuery('myParties', () =>
    getAPI(`${PARTIES_URL.MY_PARTIES_LIST}?approveStatus=${approveStatus}`),
  );

  const partyList = data?.data.data;

  if (isLoading) {
    return <div>로딩중입니다.</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <>
      {partyList?.length > 0 && (
        <div>
          <h1>신청 모임 리스트</h1>
          <ul>
            {partyList?.map(party => (
              <MyPartyItem key={party.partyId} party={party} />
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default MyPartyList;
