import React, { useContext, useCallback, useRef } from 'react';
import {
  GoogleMap, useLoadScript, Marker, InfoWindow, useGoogleMap,
} from '@react-google-maps/api';
import Search from './Search';
import Locate from './Locate';
import NewEventForm from './NewEventForm';
import keys from '../../../config/config';
import mapStyles from './mapStyles';
import AppContext from '../../context';

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const options = {
  styles: mapStyles,
};

const libraries = ['places'];

const MapViewer = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: keys.google.API_KEY,
    libraries,
  });

  const {
    events,
    setEvents,
    newEventLoc,
    setNewEventLoc,
    center,
    setCenter,
    selected,
    setSelected,
    addEventPopupOpen,
    setAddEventPopupOpen,
  } = useContext(AppContext);

  const handleMapClick = useCallback((e) => {
    setNewEventLoc({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
    setSelected(null);
    setAddEventPopupOpen(true);
  }, []);

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
    console.log(mapRef.current.center.lat);
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    setCenter({ lat, lng });
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading Maps';
  return (
    <div style={{ width: '50vw', height: '50vh' }}>
      <span style={{
        position: 'absolute',
        zIndex: '5',
        marginLeft: '15em',
        display: 'flex',
      }}
      >
        <Search panTo={panTo} />
        <Locate panTo={panTo} />
      </span>

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        onCenterChanged={() => {
        }}
        options={options}
        onClick={handleMapClick}
        onLoad={onMapLoad}
      >
        {events.map((event) => (
          <Marker
            // icon={{
            //   url: '../../assets/ASSET_NAME',
            //   scaledSize: new window.google.maps.Size(30, 30),
            //   origin: new window.google.maps.Point(0, 0),
            //   anchor: new window.google.maps.Size(15, 15),
            // }}
            key={event.id}
            position={event.position}
            onClick={() => {
              setSelected(event);
              setAddEventPopupOpen(false);
            }}
          />
        ))}

        {addEventPopupOpen ? (
          <InfoWindow
            position={newEventLoc}
            onCloseClick={() => {
              setAddEventPopupOpen(false);
            }}
          >
            <NewEventForm />
          </InfoWindow>
        ) : (
          <></>
        )}

        {selected ? (
          <InfoWindow
            position={selected.position}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <>
              <div>{selected.description}</div>
              <div>{selected.genre}</div>
              <div>{selected.time.toString()}</div>
            </>
          </InfoWindow>
        ) : (
          <></>
        )}
      </GoogleMap>
    </div>
  );
};

export default MapViewer;
