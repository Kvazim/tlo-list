import L from "leaflet";

export const ON = 'on';
export const OFF = 'off';

export const DATA_URL = '/data/tlo-list-mock.json';

export const LEAFLET_PARAMETRS = {
  TILE_LAYER: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
  ATTRIBUTION: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
} as const;

export const MAP_INITIAL_COORDINATES = [55.7512, 37.6184] as const;

export const ICONS = {
  ON: new L.Icon({ iconUrl: '/img/pin-active.svg', iconSize: [28, 40], iconAnchor: [14, 40] }),
  OFF: new L.Icon({ iconUrl: '/img/pin-disabled.svg', iconSize: [28, 40], iconAnchor: [14, 40] }),
};

export const ITEM_HEIGHT = 160;
