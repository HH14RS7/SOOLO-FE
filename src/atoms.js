import { atom } from 'recoil';

export const mapDataState = atom({
  key: 'mapDataState',
  default: null,
});

export const stationDataState = atom({
  key: 'stationDataState',
  default: {
    distance: '',
    stationName: '',
  },
});

export const regionNameState = atom({
  key: 'regionNameState',
  default: '강남역',
});

export const footerActiveState = atom({
  key: 'footerActiveState',
  default: 0,
});
