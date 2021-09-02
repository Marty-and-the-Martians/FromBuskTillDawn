import React, { useContext } from 'react';
import MapViewer from '../MapViewer';
import CalViews from './CalViews';
import AppContext from '../../assets/mockData';

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
