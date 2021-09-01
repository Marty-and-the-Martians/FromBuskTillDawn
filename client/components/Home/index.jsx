import React from 'react';
import MapViewer from '../MapViewer';
import CalViews from './CalViews';

const Home = () => {
  return (
    <div>
      <MapViewer />
      <button> Local Events </button>
      <button> My Schedule </button>
      <CalViews />
    </div>
  );
};

export default Home;
