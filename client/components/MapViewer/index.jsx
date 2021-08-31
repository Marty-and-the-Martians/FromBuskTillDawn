import React, { useContext, useCallback, useRef } from 'react';
import {
  GoogleMap, useLoadScript, Marker, InfoWindow,
} from '@react-google-maps/api';
import Search from './Search';
import Locate from './Locate';
import keys from '../../../config/config';
import mapStyles from './mapStyles';
import AppContext from '../../context';

const center = {
  lat: 39.7392,
  lng: -104.9903,
};

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
    selected,
    setSelected,
    addEventPopupOpen,
    setAddEventPopupOpen,
  } = useContext(AppContext);

  const handleSubmitEvent = useCallback((e) => {
    e.preventDefault();
    const newEvent = {
      id: events.length,
      position: newEventLoc,
      time: new Date(),
      type: 'Progressive Ska',
      performerId: 42,
      name: e.target.eventName.value,
    };
    setEvents((currEvents) => (
      [
        ...currEvents,
        newEvent,
      ]
    ));
    setAddEventPopupOpen(false);
  }, [newEventLoc, events]);

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
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading Maps';
  return (
    <div style={{ width: '50vw', height: '50vh' }}>

      <Search panTo={panTo} />
      <Locate panTo={panTo} />

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
        onClick={handleMapClick}
        onLoad={onMapLoad}
      >
        {
          events.map((event) => (
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
          ))
        }

        {addEventPopupOpen ? (
          <InfoWindow
            position={newEventLoc}
            onCloseClick={() => { setAddEventPopupOpen(false); }}
          >
            <form onSubmit={handleSubmitEvent}>
              <input type="text" placeholder="hello world" name="eventName" required />
              <button type="submit">Add Event</button>
            </form>
          </InfoWindow>
        ) : <></>}

        {selected ? (
          <InfoWindow
            position={selected.position}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <h3>{selected.name}</h3>
          </InfoWindow>
        ) : <></>}
      </GoogleMap>
    </div>
  );
};

export default MapViewer;
