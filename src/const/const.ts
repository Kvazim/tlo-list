export const ON = 'on';
export const OFF = 'off';

export const DATA_URL = '/data/tlo-list-mock.json';

export const LEAFLET_PARAMETRS = {
  TILE_LAYER: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
  ATTRIBUTION: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
} as const;

export const MAP_INITIAL_COORDINATES = [55.7512, 37.6184] as const;
