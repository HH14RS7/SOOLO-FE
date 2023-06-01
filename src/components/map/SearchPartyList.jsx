import React from 'react';
import SearchPartyItem from './SearchPartyItem';

export default function SearchPartyList({ partyList }) {
  return (
    <>
      <span>주변 모임 리스트</span>
      <span>{partyList?.length}</span>
      <ul>
        {partyList?.map(party => (
          <SearchPartyItem key={party.partyId} party={party} />
        ))}
      </ul>
    </>
  );
}
