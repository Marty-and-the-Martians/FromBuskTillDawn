import React from 'react';

const Locate = ({ panTo }) => (
  <input
    type="button"
    onClick={() => {
      navigator.geolocation.getCurrentPosition((location) => {
        panTo({
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        });
      }, () => null);
    }}
    value="Center Map"
  />
);

export default Locate;
