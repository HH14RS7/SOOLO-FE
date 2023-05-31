import React from 'react';

export default function SelectedPartyItem({ party }) {
  console.log(party);
  const { title, currentCount, totalCount, partyDate, address } = party;
  return (
    <div>
      <div>
        <p>{title}</p>
        <p>
          {currentCount}/{totalCount}
        </p>
        <p>{partyDate}</p>
        <p>{address}</p>
      </div>
    </div>
  );
}
