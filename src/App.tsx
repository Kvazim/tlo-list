import Map from './components/map/map';
import Filters from './components/filters/filters';
import ObjectList from './components/object-list/object-list';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { Coordinates, Data, FiltersState } from './types/types';
import { DATA_URL, ON } from './const/const';
import L from "leaflet";

function App() {
  const [data, setData] = useState<Data>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filters, setFilters] = useState<FiltersState>({
    name: '',
    address: '',
    showOn: ON,
    showOff: ON,
    sortAsc: false,
  });
  const mapRef = useRef<L.Map>(null);

  useEffect(() => {
    fetch(DATA_URL)
      .then(
        (response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          return response.json()
        }
      )
      .then((jsonData) => {
        setData(jsonData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setData([]);
        setLoading(false);
      });
  }, []);

  const filteredData = useMemo(() => data.filter(item => {
    return item.name.toLowerCase().includes(filters.name.toLowerCase()) &&
      item.address.toLowerCase().includes(filters.address.toLowerCase()) &&
      (filters.showOn === ON && item.mode === ON) || (filters.showOff === ON && item.mode !== ON);
  }), [data, filters]);

  const sortedData = useMemo(() => {
    if (filters.sortAsc) {
      return [...filteredData].sort((a, b) => a.name.localeCompare(b.name));
    } else {
      return filteredData;
    }
  }, [filteredData, filters.sortAsc]);

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
