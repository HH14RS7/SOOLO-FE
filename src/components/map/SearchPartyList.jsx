import React from 'react';
import SearchPartyItem from './SearchPartyItem';

export default function SearchPartyList({ partyList, regionName, stationName, searchPlace }) {
  let displayRegionName = regionName;
  let displayStationName = stationName;

  console.log(partyList);
  if (searchPlace.endsWith('구') || searchPlace.endsWith('동') || searchPlace.endsWith('역')) {
    displayRegionName = searchPlace.replace();
  } else {
    if (partyList.length > 0) {
      const { regionName: partyRegionName, stationName: partyStationName } = partyList[0];
      if (partyRegionName) {
        displayRegionName = partyRegionName;
      }
      if (partyStationName) {
        displayStationName = partyStationName;
      }
    }
  }

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
      <button>
        {/* {displayStationName ? displayStationName.trim().split(' ')[0] : displayRegionName}에서 모임
        만들기 */}
        모임 만들기
      </button>
    </>
  );
}
