import React from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import keys from '../../../config/config';
import mapStyles from './mapStyles';

const center = {
  lat: 104.9903,
  lng: 39.7392,
};

const MapViewer = (props) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: keys.google,
    libararies: ['places'],
  });

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading Maps';
  return (
    <GoogleMap
      mapContainerStyle={mapStyles}
      zoom={8}
      center={center}
    >
      {/* {props.isMarkerShown && <Marker position={center} />} */}
    </GoogleMap>
  );
};

export default MapViewer;
