import React, { useContext } from 'react';
import AppContext from '../../context';
import MapViewer from '../MapViewer';

const AccountDetails = () => {
  const context = useContext(AppContext);

  return (
    <>
      <MapViewer />
      <div> Account Settings Go Here </div>
    </>
  );
};

export default AccountDetails;
