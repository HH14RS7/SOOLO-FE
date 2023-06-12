import { useState, useEffect } from 'react';
import { QueryClient, useQuery } from 'react-query';
import { getAPI } from '../../api/api';
import { PARTIES_URL } from '../../shared/constants';
import PartyItem from './PartyItem';
import styled from 'styled-components';
import Select, { components } from 'react-select';
import { ReactComponent as ArrowBottom } from '../../assets/common/arrow-bottom.svg';

const PartyList = () => {
  const unionImg = './img/union.png';
  const mainInfoImg = './img/main-info.png';

  const RECRUITMENT_STATUS_SELECT = [
    { value: 0, label: '전체' },
    { value: 1, label: '모집중' },
    { value: 2, label: '모집마감' },
  ];

  const queryClient = new QueryClient();
  // const [recruitmentStatus, setRecruitmentStatus] = useState(RECRUITMENT_STATUS_SELECT[0].value);
  const [recruitmentStatus, setRecruitmentStatus] = useState(RECRUITMENT_STATUS_SELECT[0]);

  const page = 0; // 임시

  const { data, isLoading, error } = useQuery(['parties', recruitmentStatus.value], () =>
    getAPI(`${PARTIES_URL.PARTIES_LIST}?page=${page}&recruitmentStatus=${recruitmentStatus.value}`),
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

  const partyList = data?.data.data.partyList;

  const handleSelected = option => {
    setRecruitmentStatus(option);
  };

  const { Option } = components;
  const IconOption = props => (
    <Option {...props}>
      <img src={require('./' + props.data.icon)} style={{ width: 36 }} alt={props.data.label} />
      {props.data.label}
    </Option>
  );

  const styles = {
    control: base => ({
      ...base,
    }),
    menu: base => ({
      ...base,
      fontFamily: 'Times New Roman',
    }),
    control: styles => ({
      ...styles,
      backgroundColor: 'white',
      width: '80px',
      border: '1px solid #D0D5DD',
      borderRadius: '999px',
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isFocused ? 'var(--color-primary-500)' : 'var(--color-white)',
        color: isFocused ? 'var(--color-white)' : 'var(--color-black)',
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: 'var(--color-primary-500)',
          color: 'var(--color-white)',
        },
        '&:before': {
          display: 'none',
        },
      };
    },
  };

  console.log(partyList);
  return (
    <Wrapper>
      {partyList.length > 0 ? (
        <>
          <PartySection>
            <PartyHeader>
              <Title>현재 진행중인 모임</Title>
              <StSelect
                placeholder={RECRUITMENT_STATUS_SELECT[0].label}
                options={RECRUITMENT_STATUS_SELECT}
                onChange={option => handleSelected(option)}
                value={recruitmentStatus}
                styles={styles}
              />
            </PartyHeader>
            <ListWrapper>
              <List>
                {partyList.map(party => (
                  <PartyItem key={party.partyId} party={party} />
                ))}
              </List>
            </ListWrapper>
          </PartySection>
          <ListBottomSection>
            <Message>마음에 드는 모임이 없으신가요?</Message>
            <ButtonInfo>
              <Message>아래</Message>
              <UnionImage src={unionImg} alt="union" />
              <Message>통해 모임을 열어보세요! </Message>
            </ButtonInfo>
          </ListBottomSection>
        </>
      ) : (
        <InfoWrapper>
          <InfoImg src={mainInfoImg} alt="mainInfoImage" />
          <BottomInfoSection>
            <Message>앗! 아직 열린 모임이 없어요.</Message>
            <ButtonInfo>
              <Message>아래</Message>
              <UnionImage src={unionImg} alt="union" />
              <Message>을 통해 모임을 열어보세요!</Message>
            </ButtonInfo>
          </BottomInfoSection>
        </InfoWrapper>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 360px;
  margin: 0 auto;
  height: calc(100%-200px);
`;

/* PartySection */
const PartySection = styled.section`
  padding: 1rem;
`;

const PartyHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h4`
  color: var(--color-gray-500);
  white-space: nowrap;
`;

const StSelect = styled(Select)`
  width: 80px;
  border-radius: 999px;
  background: yellow;
  font-size: 12px;
  &:hover: {
    border: '2px solid blue';
    appearance: none;
    -webkit-appearance: none; //(사파리, 크롬)
    -moz-appearance: none; //(파이어폭스)
  }
  &:option: {
    background: yellow;
  }
`;

// const StSelect = styled(Select)`;
// display: flex;
// flex-direction: row;
// justify-content: flex-end;
// align-items: flex-start;
// padding: 8px 16px;
// gap: 4px;

// width: 80px;
// height: 32px;

// /* Gray/300 */

// border: 1px solid #d0d5dd;
// border-radius: 999px;
// `;

const SelectElement = styled.li`
  width: 80px;
  height: 32px;
  border: 1px solid #d0d5dd;
  border-radius: 999px;
`;

const OptionElement = styled.option``;

/* List */
const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const List = styled.ul``;

/* ListBottomSection */
const ListBottomSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0;
  gap: 6px;
  padding-bottom: 120px; // 무한스크롤 구현 후 제거
`;
/* BottomInfoSection */
const BottomInfoSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem 0;
  gap: 6px;
`;

const Message = styled.h5`
  color: var(--color-gray-800);
`;

const ButtonInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const UnionImage = styled.img`
  width: 16px;
  height: 16px;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 360px;
  left: calc(50% - 360px / 2);
  top: calc(50% - 32px / 2);
`;

const InfoImg = styled.img`
  width: 48px;
  height: 48px;
`;

export default PartyList;
//
