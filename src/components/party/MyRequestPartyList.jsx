import { QueryClient, useQuery } from 'react-query';
import { getAPI } from '../../api/api';
import { PARTIES_URL } from '../../shared/constants';
import MyRequestPartyItem from './MyRequestPartyItem';
import { useEffect, useState } from 'react';

const MyRequestPartyList = () => {
  const APPROVE_STATUS_SELECT = [
    { value: 0, label: '전체' },
    { value: 1, label: '승인완료' },
    { value: 2, label: '승인대기' },
  ];
  const queryClient = new QueryClient();

  const [approveStatus, setApproveStatus] = useState(APPROVE_STATUS_SELECT[0].value);

  const { data, isLoading, error } = useQuery(['parties', approveStatus], () =>
    getAPI(`${PARTIES_URL.MY_PARTIES_LIST}?approveStatus=${approveStatus}`),
  );

  useEffect(() => {
    queryClient.invalidateQueries('parties');
  }, [queryClient, approveStatus]);

  const handleSelectChange = e => {
    const newApproveStatus = e.target.value;
    if (approveStatus !== newApproveStatus) {
      setApproveStatus(newApproveStatus);
    }
  };

  if (isLoading) {
    return <div>로딩중입니다.</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  const requestPartyList = data?.data.data;

  return (
    <>
      {requestPartyList?.length > 0 && (
        <div>
          <h1>내가 신청한 모임 리스트</h1>
          <select value={approveStatus} onChange={handleSelectChange}>
            {APPROVE_STATUS_SELECT.map(status => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
          <ul>
            {requestPartyList?.map(party => (
              <MyRequestPartyItem key={party.partyId} party={party} />
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default MyRequestPartyList;
