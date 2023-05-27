import { useMutation, useQuery } from 'react-query';
import { getAPI, postAPI } from '../../api/api';
import { PARTIES_URL } from '../../shared/constants';
import MyAcceptItem from './MyAcceptItem';

const MyAcceptList = () => {
  const { data, isLoading, error } = useQuery('parties', () =>
    getAPI(`${PARTIES_URL.MY_APPROVE_LIST}`),
  );

  if (isLoading) {
    return <div>로딩중입니다.</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const partyList = data?.data.data;

  return (
    <div>
      <h1>승인 요청 리스트</h1>
      {partyList?.map(party => (
        <MyAcceptItem key={party.partyParticipateId} party={party} />
      ))}
    </div>
  );
};

export default MyAcceptList;
