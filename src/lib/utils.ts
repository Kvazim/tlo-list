import { OFF, ON } from "../const/const";
import type { Data, FiltersState } from "../types/types";

export const getFilteredData = (data: Data, filters: FiltersState): Data => {
  return data.filter((item) => {
      return item.name.toLowerCase().includes(filters.name.toLowerCase()) &&
        item.address.toLowerCase().includes(filters.address.toLowerCase()) &&
        (filters.showOn && item.mode === ON) || 
        (filters.showOff && item.mode === OFF);
  });
};

export const getSortedData = (data: Data, sortAsc: boolean): Data => {
  if (sortAsc) {
    return [...data].sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));
  } else {
    return [...data].sort((a, b) => b.name.localeCompare(a.name, undefined, { numeric: true }));
  }
};