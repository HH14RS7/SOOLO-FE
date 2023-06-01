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
