import type { OFF, ON } from "../const/const";

export type Mode = typeof ON | typeof OFF;
export type Coordinates = [number, number];

export type DataItem = {
  id: string;
  name: string;
  address: string;
  coords: Coordinates;
  mode: Mode;
};

export type Data = DataItem[];

export type FiltersState = {
  name: string;
  address: string;
  showOn: boolean;
  showOff: boolean;
  sortAsc: boolean | null;
};