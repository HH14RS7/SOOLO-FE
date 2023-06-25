import { atom } from 'recoil';

export const footerActiveState = atom({
  key: 'footerActiveState',
  default: 0,
});

export const tempPartyData = atom({
  key: 'tempPartyData',
  default: '',
});

export const noticeState = atom({
  key: 'noticeState',
  default: [],
});

export const sse = atom({
  key: 'sse',
  default: '',
});

// export const mapDataState = atom({
//   key: 'mapDataState',
//   default: null,
// });

// export const stationDataState = atom({
//   key: 'stationDataState',
//   default: {
//     distance: '',
//     stationName: '',
//   },
// });

// export const regionNameState = atom({
//   key: 'regionNameState',
//   default: '강남역',
// });
