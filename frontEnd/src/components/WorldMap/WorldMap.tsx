import React from 'react';
import react from 'react';
import Map, { Marker, Popup, GeolocateControl } from 'react-map-gl';

import './WorldMap.scss';

import Pin from './WorldMapPin';

import { useGetLocationsQuery } from 'services/backend';
import { useActions } from 'hooks/useActions';

const TOKEN =
  'pk.eyJ1Ijoiem94YWwiLCJhIjoiY2xicnI4Z25zMGptNjNvbnRqbmY1cHRvdyJ9.GHmqXKeWVadi-Bq0dEowCQ'; // Set your mapbox token here

interface GlobalMapInterface {
  setIsReviewsOpen: (value: boolean) => void;
}

export function WorldMap({ setIsReviewsOpen }: GlobalMapInterface) {
  const { setLocationId } = useActions();
  // const [popupInfo, setPopupInfo] = useState<popupInterface | null>(null);
  const { data } = useGetLocationsQuery();

  const pins = react.useMemo(
    () =>
      data?.map((location) => (
        <Marker
          key={location.id}
          longitude={Number(location.coordinates.longitude)}
          latitude={Number(location.coordinates.latitude)}
          anchor="bottom"
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            setLocationId(location.id);
            setIsReviewsOpen(true);
          }}
        >
          <Pin />
        </Marker>
      )),
    [data]
  );
  return (
    <div className="world-map">
      <Map
        initialViewState={{
          latitude: 53.893,
          longitude: 27.567,
          zoom: 3.5,
          bearing: 0,
          pitch: 0,
          // projection: 'globe', //doesn't work
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/light-v11"
        mapboxAccessToken={TOKEN}
      >
        <GeolocateControl position="top-left" />

        {pins}

        {/* {popupInfo && (
        <Popup
          anchor="top"
          longitude={Number(popupInfo.longitude)}
          latitude={Number(popupInfo.latitude)}
          onClose={() => setPopupInfo(null)}
        >
          <div className="map-popup">{popupInfo.city}</div>
          <img width="100%" src={popupInfo.image} />
        </Popup>
      )} */}
      </Map>
    </div>
  );
}
