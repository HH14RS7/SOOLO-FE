import React from 'react';
import SelectedPartyItem from './SelectedPartyItem';
import { styled } from 'styled-components';

export default function SelectedPartyList({ partyList }) {
  return (
    <>
      <ListWrapper>
        {partyList?.map(party => (
          <SelectedPartyItem key={party.partyId} party={party} />
        ))}
      </ListWrapper>
    </>
  );
}
const ListWrapper = styled.ul`
  width: 360px;
  height: 170px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 0.5rem;
  position: relative;
  bottom: 250px;
  z-index: 30;
`;
