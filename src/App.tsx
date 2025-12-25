import Map from './components/map/map';
import Filters from './components/filters/filters';
import ObjectList from './components/object-list/object-list';
import { useMemo, useRef, useState } from 'react';
import type { Coordinates, Data, FiltersState } from './types/types';
import L from "leaflet";
import useGetData from './hoocks/use-get-data';
import { getFilteredData, getSortedData } from './lib/utils';

function App() {
  const [data, setData] = useState<Data>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filters, setFilters] = useState<FiltersState>({
    name: '',
    address: '',
    showOn: true,
    showOff: true,
    sortAsc: false,
  });
  const mapRef = useRef<L.Map>(null);

  useGetData(setData, setLoading);

  const filteredData = useMemo(() => getFilteredData(data, filters), [data, filters]);

  const sortedData = useMemo(() => getSortedData(filteredData, filters.sortAsc), [filteredData, filters.sortAsc]);

  const handleFocusOnMarker = (coords: Coordinates) => {
    if (mapRef.current) {
      mapRef.current.flyTo(
        coords,
        18,
        {
          duration: 1.5,
        }
      );
    }
  };

  if (loading) {
    return <div className='w-full h-full flex justify-center items-center font-bold text-7xl'>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-[2fr_1fr] grid-rows-1 p-10 h-[90vh] gap-10 overflow-hidden">
      <Map mapData={filteredData} mapRef={mapRef} />
      <section className="flex flex-col gap-5 p-10 min-h-0">
        <h2 className="text-2xl font-bold">Светофорные объекты</h2>
        <Filters filters={filters} onChange={setFilters} />
        <ObjectList data={sortedData} onItemClick={handleFocusOnMarker} />
      </section>
    </div>
  )
}

export default App
