import { useState, useEffect } from 'react';
import { getAPI } from '../../api/api';
import { PARTIES_URL } from '../../shared/constants';
import PartyItem from './PartyItem';
import styled from 'styled-components';
import Select, { components } from 'react-select';
import { ReactComponent as ArrowBottom } from '../../assets/common/arrow-bottom.svg';
import { useInView } from 'react-intersection-observer';

const PartyList = () => {
  const unionImg = './img/union.png';
  const mainInfoImg = './img/main-info.png';
  const RECRUITMENT_STATUS_SELECT = [
    { value: 0, label: '전체' },
    { value: 1, label: '모집중' },
    { value: 2, label: '모집마감' },
  ];
  const [partyList, setPartyList] = useState([]);
  const [recruitmentStatus, setRecruitmentStatus] = useState(RECRUITMENT_STATUS_SELECT[0]);
  const [Page, setPage] = useState(0);
  const [ref, inView] = useInView();

  const getPartyList = () => {
    getAPI(`${PARTIES_URL.PARTIES_LIST}?page=${Page}&recruitmentStatus=${recruitmentStatus.value}`)
      .then(res => {
        console.log('partyList', res.data.data.partyList);
        // 리스트 뒤로 붙여주기
        setPartyList([...partyList, ...res?.data?.data?.partyList]);
        // 요청 성공 시에 페이지에 1 카운트 해주기
        setPage(page => page + 1);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleSelected = option => {
    setRecruitmentStatus(option);
  };

  useEffect(() => {
    // inView가 true 일때만 실행한다.
    if (inView) {
      getPartyList();
    }
  }, [inView]);

  const styles = {
    menu: base => ({
      ...base,
      fontFamily: 'Pretendard',
    }),
    control: base => ({
      ...base,
      width: 'auto',
      minHeight: '32px',
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: '14px',
      border: '1px solid #D0D5DD',
      '&:focus': {
        border: '1px solid red',
      },
      '&::after': {
        transform: 'rotate(…)',
        border: "'1xp solid var(--color-primary-500)'",
      },
      borderRadius: '999px',
    }),
    option: (styles, { data, isFocused }) => {
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
        fontSize: '14px',
      };
    },
    indicatorSeparator: base => ({
      ...base,
      display: 'none',
      padding: '0px',
    }),
  };
  const CaretDownIcon = () => {
    return <ArrowBottom icon="caret-down" />;
  };
  const DropdownIndicator = props => {
    return (
      <components.DropdownIndicator {...props}>
        <CaretDownIcon />
      </components.DropdownIndicator>
    );
  };

  return (
    <Wrapper>
      <>
        {partyList ? (
          <>
            <PartySection>
              <PartyHeader>
                <Title>현재 진행중인 모임</Title>
                {
                  <Select
                    placeholder={RECRUITMENT_STATUS_SELECT[0].label}
                    options={RECRUITMENT_STATUS_SELECT}
                    onChange={option => handleSelected(option)}
                    value={recruitmentStatus}
                    components={{ DropdownIndicator }}
                    styles={styles}
                  />
                }
              </PartyHeader>
              <ListWrapper>
                <List>
                  {partyList?.map(party => (
                    <PartyItem key={party.partyId} party={party} />
                  ))}
                </List>
              </ListWrapper>
              <div ref={ref}></div>
              <ListBottomSection>
                <Message>마음에 드는 모임이 없으신가요?</Message>
                <ButtonInfo>
                  <Message>아래</Message>
                  <UnionImage src={unionImg} alt="union" />
                  <Message>통해 모임을 열어보세요! </Message>
                </ButtonInfo>
              </ListBottomSection>
            </PartySection>
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
      </>
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
