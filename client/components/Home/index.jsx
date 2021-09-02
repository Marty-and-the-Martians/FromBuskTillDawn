import React, { useContext } from 'react';
import AppContext from '../../context';
import MapViewer from '../MapViewer';
import CalViews from './CalViews';

const Home = () => {
  const { currentUser } = useContext(AppContext);
  return (
    <div>
      <MapViewer />
      <button> Local Events </button>
      {currentUser.id
        ? <button> My Schedule </button>
        : null}
      <CalViews />
    </div>
  );
};

export default Home;
