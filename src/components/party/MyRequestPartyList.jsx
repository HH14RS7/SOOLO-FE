import { QueryClient, useQuery } from 'react-query';
import { getAPI } from '../../api/api';
import { PARTIES_URL } from '../../shared/constants';
import MyRequestPartyItem from './MyRequestPartyItem';
import { useEffect } from 'react';
import { styled } from 'styled-components';
import Default from '../user/Default';
import { ReactComponent as NoRequest } from '../../assets/mypage/no-request.svg';
import Loading from '../common/Loading';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Backicon } from '../../assets/userprofile/back.svg';

const MyRequestPartyList = () => {
  const navigate = useNavigate();
  const queryClient = new QueryClient();

  const { data, isLoading, error } = useQuery(['parties'], () =>
    getAPI(`${PARTIES_URL.MY_PARTIES_LIST}`),
  );

  useEffect(() => {
    queryClient.invalidateQueries('parties');
  }, [queryClient]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  const requestPartyList = data?.data.data;
  return (
    <>
      {requestPartyList?.length > 0 ? (
        <ListWrapper>
          <Topbar>
            <IconCon>
              <StyledBackicon
                onClick={() => {
                  navigate(-1);
                }}
              />
            </IconCon>
            내가 신청한 모임
            <IconCon />
          </Topbar>
          {requestPartyList.map(party => (
            <MyRequestPartyItem key={party.partyId} party={party} />
          ))}
        </ListWrapper>
      ) : (
        <Default title={'내가 신청한 모임'} image={<NoRequest />} />
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

const Topbar = styled.div`
  box-sizing: border-box;
  width: 360px;
  height: 52px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  border-bottom: 1px solid #f2f4f7;
`;

const IconCon = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px 0px 0px 16px;
  width: 40px;
  height: 24px;
  left: 0px;
  top: calc(50% - 24px / 2);
`;

const StyledBackicon = styled(Backicon)`
  cursor: pointer;
`;
