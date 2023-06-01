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
        {partyList?.length > 0 ? (
          <div>마음에 드는 모임이 없으신가요?</div>
        ) : (
          <>
            <div>주변에 모임이 없습니다</div>
          </>
        )}
      </ul>
      <button>'강남역'에서 모임 만들기</button>
    </>
  );
}
