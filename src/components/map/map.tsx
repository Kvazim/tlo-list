import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import { LEAFLET_PARAMETRS, MAP_INITIAL_COORDINATES, ON } from "../../const/const";
import type { Data } from "../../types/types";
import L from "leaflet";

type MapProps = {
  mapData: Data;
  mapRef: React.RefObject<L.Map | null>;
};

const activeIcon = new L.Icon({
  iconUrl: '/img/pin-active.svg',
  iconSize: [28, 40],
  iconAnchor: [14, 40]
});

const disabledIcon = new L.Icon({
  iconUrl: '/img/pin-disabled.svg',
  iconSize: [28, 40],
  iconAnchor: [14, 40]
});

function Map({ mapData, mapRef }: MapProps) {

  return (
    <section className="w-full h-full bg-gray-200">
      <MapContainer
        center={[...MAP_INITIAL_COORDINATES]}
        zoom={11}
        ref={mapRef}
        className="w-full h-full"
      >
        <TileLayer
          url={LEAFLET_PARAMETRS.TILE_LAYER}
          attribution={LEAFLET_PARAMETRS.ATTRIBUTION}
        />

        {mapData.map(item => (
          <Marker
            key={item.id}
            position={item.coords}
            icon={item.mode === ON ? activeIcon : disabledIcon}
          >
            <Popup>
              <span
                className="flex justify-start items-center font-bold"
              >
                {item.name}
              </span>
              <p className="text-gray-700">{item.address}</p>
              <span className="text-gray-400">
                Статус:&nbsp;
                  <span className={item.mode === ON ? 'text-green-600' : 'text-red-600'} >
                    {item.mode === 'on' ? 'Активный' : 'Неактивный'}
                  </span>
              </span>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </section>
  )
}

export default Map;