import { useState, useEffect } from 'react';
import { QueryClient, useQuery } from 'react-query';
import { getAPI } from '../../api/api';
import { PARTIES_URL } from '../../shared/constants';
import PartyItem from './PartyItem';
import styled from 'styled-components';
import Select from 'react-select'; //라이브러리 import
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
  const [toggle, setToggle] = useState(false);

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
  return (
    <Wrapper>
      {partyList ? (
        <>
          <PartySection>
            <PartyHeader>
              <Title>현재 진행중인 모임</Title>
              <SelectContainer>
                <Select
                  placeholder={RECRUITMENT_STATUS_SELECT[0].label}
                  options={RECRUITMENT_STATUS_SELECT}
                  onChange={option => handleSelected(option)}
                  value={recruitmentStatus}
                />
              </SelectContainer>
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
            <Message>앗! 모임이 아직 열린 모임이 없어요.</Message>
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

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    border: state.isFocused ? '2px solid blue' : '1px solid #d0d5dd',
    borderRadius: '999px',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '100%',
    // letter-spacing: '-0.015em';
    // color: '#475467',
    // boxShadow: 'none',
    '&:hover': {
      border: state.isFocused ? '2px solid blue' : '1px solid #d0d5dd',
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? '#f7f8fa' : 'white',
    color: state.isFocused ? 'blue' : 'black',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '100%',
    '&:hover': {
      backgroundColor: '#f7f8fa',
    },
  }),
};
const Wrapper = styled.div`
  width: 360px;
  margin: 0 auto;
  height: 100%;
  padding-bottom: 250px;
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
// const SelectContainer = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: flex-end;
//   align-items: flex-start;
//   gap: 0.25rem;
// `;

// const SelectElement = styled.select`
//   width: 80px;
//   height: 32px;
//   border: 1px solid #d0d5dd;
//   border-radius: 999px;
// `;
const SelectContainer = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 0.25rem;
`;

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

const InfoContainer = styled.div`
  // background: green;
  // height: 100vh;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: calc(100vh - 220px);
  align-items: center;
  min-height: 250px;
`;

const InfoImg = styled.img`
  width: 86px;
  height: 86px;
`;

export default PartyList;
//
