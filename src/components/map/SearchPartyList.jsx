import React from 'react';
import SearchPartyItem from './SearchPartyItem';
import { styled } from 'styled-components';
import { ReactComponent as Fire } from '../../assets/map/fire.svg';
import { PATH_URL } from '../../shared/constants';
import { Link } from 'react-router-dom';

export default function SearchPartyList({ partyList }) {
  return (
    <Wrapper>
      <Header>
        <HeaderTitle>주변 모임 리스트</HeaderTitle>
        <Badge>
          <BadgeCount>{partyList?.length}</BadgeCount>
        </Badge>
      </Header>
      <ListWrapper>
        <List>
          {partyList?.map(party => (
            <SearchPartyItem key={party.partyId} party={party} />
          ))}
        </List>
        <ListInfo>
          {partyList?.length > 0 ? (
            <InfoTitle>마음에 드는 모임이 없으신가요?</InfoTitle>
          ) : (
            <>
              <InfoTitle>주변에 모임이 없습니다</InfoTitle>
            </>
          )}
          <Link to={`${PATH_URL.PARTY_PLACE_CREATE}`}>
            <Button>
              <ButtonTitle>모임 만들기</ButtonTitle>
              <FireIcon />
            </Button>
          </Link>
        </ListInfo>
      </ListWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 360px;
  margin: 0 auto;
  // height: 220px;
  height: 260px;
  border-radius: 16px 16px 0px 0px;
  background-color: var(--color-gray-25);
  border: 1px solid var(--color-gray-300);
  border-bottom: none;
  margin-bottom: 70px;

  z-index: 5;
  // 임시 슬라이드 전
  // position: relative;
  // bottom: 250px;

  position: absolute;
  bottom: 0px;

  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 8px;
    background-color: var(--color-gray-25);
  }

  &::-webkit-scrollbar-track {
    background-color: var(--color-gray-25);
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--color-gray-200);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-button {
    display: none;
  }
`;

const Header = styled.header`
  display: flex;
  height: 52px;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const HeaderTitle = styled.h4``;

const Badge = styled.div`
  padding: 0.125rem 0.5rem;
  min-width: 33px;
  height: 20px;
  gap: 10px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  background: var(--color-gray-100);
  border-radius: 999px;
`;

const BadgeCount = styled.h4`
  text-align: center;
  white-space: nowrap;
`;

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const List = styled.div`
  // width: 360px;
  width: 100%;
`;

const ListInfo = styled.div`
  width: 100%;
  display: flex;
  height: 150px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const InfoTitle = styled.h5``;

const Button = styled.button`
  display: flex;
  flex-direction: row;
  // justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0.75rem 1rem;
  gap: 0.5rem;
  height: 3rem;
  background-color: var(--color-primary-500);
  border-radius: 0.75rem;
`;

const ButtonTitle = styled.div`
  font-style: normal;
  font-weight: var(--color-weight-600);
  color: var(--color-white);
  font-size: 0.75rem;
  line-height: 15px;
`;

const FireIcon = styled(Fire)`
  fill: white;
`;
