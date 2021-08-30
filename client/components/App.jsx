import React from 'react';

import MapViewer from './MapViewer';
import keys from '../../config/config';

const App = () => (
  <>
    <h1>{`From Busk 'till Dawn starter!`}</h1>
    <MapViewer />
      {/* isMarkerShown */}
      {/* googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places`} */}
      {/* loadingElement={<div style={{ height: `100%` }} />} */}
      {/* containerElement={<div style={{ height: `400px` }} />} */}
      {/* mapElement={<div style={{ height: `100%` }} />} */}
  </>
);

export default App;
