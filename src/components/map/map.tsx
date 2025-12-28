import { MapContainer, Marker, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import { ICONS, LEAFLET_PARAMETRS, MAP_INITIAL_COORDINATES, ON } from "../../const/const";
import type { Data } from "../../types/types";
import L from "leaflet";
import TloPopup from "../tlo-popup/tlo-popup";
import { useEffect } from "react";

type MapProps = {
  mapData: Data;
  mapRef: React.RefObject<L.Map | null>;
  isDesktop?: boolean;
};

function Map({ mapData, mapRef, isDesktop }: MapProps) {

  useEffect(() => {
    if (!mapRef.current) {
      return;
    }

    if (isDesktop) {
      mapRef.current.dragging.enable();
    } else {
      mapRef.current.dragging.disable();
    }
  }, [isDesktop, mapRef]);

  return (
    <MapContainer
      center={[...MAP_INITIAL_COORDINATES]}
      zoom={10}
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
          icon={item.mode === ON ? ICONS.ON : ICONS.OFF}
        >
          <TloPopup item={item} />
        </Marker>
      ))}
    </MapContainer>
  )
}

export default Map;
