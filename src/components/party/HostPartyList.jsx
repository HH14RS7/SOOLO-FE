import { useQuery } from 'react-query';
import { getAPI } from '../../api/api';
import { PARTIES_URL } from '../../shared/constants';
import HostPartyItem from './HostPartyItem';
import { styled } from 'styled-components';
import Default from '../user/Default';
import { ReactComponent as DefaultIcon } from '../../assets/mypage/default2.svg';
import Loading from '../common/Loading';
import { ReactComponent as Backicon } from '../../assets/userprofile/back.svg';
import { useNavigate } from 'react-router-dom';

const HostPartyList = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useQuery('hostParties', () =>
    getAPI(`${PARTIES_URL.MY_HOST_LIST}`),
  );

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const partyList = data?.data.data;

  return (
    <>
      {partyList?.length > 0 ? (
        <ListWrapper>
          <Topbar>
            <IconCon>
              <StyledBackicon
                onClick={() => {
                  navigate(-1);
                }}
              />
            </IconCon>
            내가 개설한 모임
            <IconCon />
          </Topbar>
          {partyList?.map(party => (
            <HostPartyItem key={party.partyId} party={party} />
          ))}
        </ListWrapper>
      ) : (
        <Default title={'내가 개설한 모임'} image={<DefaultIcon />} />
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
