import React from 'react';
import SelectedPartyItem from './SelectedPartyItem';

export default function SelectedPartyList({ partyList }) {
  return (
    <>
      <ul>
        {partyList?.map(party => (
          <SelectedPartyItem key={party.partyId} party={party} />
        ))}
      </ul>
    </>
  );
}
