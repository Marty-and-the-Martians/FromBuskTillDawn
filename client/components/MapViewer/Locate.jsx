import React from 'react';
import Button from '@material-ui/core/Button';

const Locate = ({ panTo }) => (
  <Button
    onClick={() => {
      navigator.geolocation.getCurrentPosition((location) => {
        panTo({
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        });
      }, () => null);
    }}
  >
    Center Map
  </Button>
);

export default Locate;
