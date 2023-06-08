import { useState, useEffect } from 'react';
import { QueryClient, useQuery } from 'react-query';
import { getAPI } from '../../api/api';
import { PARTIES_URL } from '../../shared/constants';
import PartyItem from './PartyItem';
import { styled } from 'styled-components';
import { Link } from 'react-router-dom';

const PartyList = () => {
  const unionImg = './img/union.png';
  const mainInfoImg = './img/main-info.png';

  const RECRUITMENT_STATUS_SELECT = [
    { value: 0, label: '전체' },
    { value: 1, label: '모집중' },
    { value: 2, label: '모집마감' },
  ];

  const queryClient = new QueryClient();
  const [recruitmentStatus, setRecruitmentStatus] = useState(RECRUITMENT_STATUS_SELECT[0].value);
  const page = 0; // 임시

  const { data, isLoading, error } = useQuery(['parties', recruitmentStatus], () =>
    getAPI(`${PARTIES_URL.PARTIES_LIST}?page=${page}&recruitmentStatus=${recruitmentStatus}`),
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

  return (
    <Wrapper>
      <InfoSection>
        <InfoTitle>반가워요!🍷 </InfoTitle>
        <InfoTitle>우리 함께 달려볼까요?</InfoTitle>
      </InfoSection>
      {partyList ? (
        <>
          <PartySection>
            <PartyHeader>
              <Title>현재 진행중인 모임</Title>
              <SelectContainer>
                <SelectElement value={recruitmentStatus} onChange={handleSelectChange}>
                  {RECRUITMENT_STATUS_SELECT.map(recruitment => (
                    <OptionElement key={recruitment.value} value={recruitment.value}>
                      {recruitment.label}
                    </OptionElement>
                  ))}
                </SelectElement>
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

const Wrapper = styled.div`
  width: 360px;
  margin: 0 auto;
  // height: 100%;
`;

/* InfoSection */
const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 36px 1rem;
  display: flex;
`;

const InfoTitle = styled.div`
  gap: 30px;
  font-size: 1.5rem;
  font-weight: var(--font-weight-700);
  letter-spacing: -0.015em;
  text-align: left;
`;

/* PartySection */
const PartySection = styled.section`
  padding: 0 1rem;
`;

const PartyHeader = styled.div`
  // background: blue;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h4`
  color: var(--color-gray-500);
  white-space: nowrap;
`;

const SelectContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 0.25rem;
`;

const SelectElement = styled.select`
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
  justify-content: center;
  height: calc(100vh - 278px);
  align-items: center;
`;

const InfoImg = styled.img`
  width: 86px;
  height: 86px;
`;

export default PartyList;
