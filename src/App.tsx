import Map from './components/map/map';
import Filters from './components/filters/filters';
import ObjectList from './components/object-list/object-list';
import { useMemo, useRef, useState } from 'react';
import type { Coordinates, FiltersState } from './types/types';
import L from "leaflet";
import useGetData from './hoocks/use-get-data';
import { getFilteredData, getSortedData } from './lib/utils';
import { useMatchMedia } from './hoocks/use-match-media';

function App() {
  const [filters, setFilters] = useState<FiltersState>({
    name: '',
    address: '',
    showOn: true,
    showOff: true,
    sortAsc: null,
  });
  const mapContainerRef = useRef<HTMLElement | null>(null);
  const mapRef = useRef<L.Map>(null);

  const { data, loading } = useGetData();

  const isDesktop = useMatchMedia('(min-width: 1024px)');

  const filteredData = useMemo(() => getFilteredData(data, filters), [data, filters]);

  const sortedData = useMemo(() => getSortedData(filteredData, filters.sortAsc), [filteredData, filters.sortAsc]);



  const handleFocusOnMarker = (coords: Coordinates) => {
    if (!isDesktop && mapContainerRef.current) {
      mapContainerRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }

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
    <div className="w-full flex flex-col-reverse lg:flex-row lg:h-[90vh] p-10 gap-10 overflow-hidden">
      <section className="flex w-full h-100 bg-gray-200 lg:h-auto" ref={mapContainerRef}>
        <Map mapData={filteredData} mapRef={mapRef} isDesktop={isDesktop} />
      </section>
      <section className="flex flex-col md:grid md:grid-cols-2 lg:flex lg:flex-col gap-5 min-h-0">
        <h2 className="text-2xl font-bold">Светофорные объекты</h2>
        <Filters filters={filters} onChange={setFilters} />
        <section className="flex flex-1 p-5 border-t border-gray-600 md:border-transparent md:row-start-1 md:row-end-3 md:col-start-2 lg:border-gray-600 min-h-0 w-full h-full overflow-hidden">
          <ObjectList data={sortedData} onItemClick={handleFocusOnMarker} />
        </section>
      </section>
    </div>
  )
}

export default App
