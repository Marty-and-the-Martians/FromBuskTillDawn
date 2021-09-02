import React, { useContext } from 'react';
import AppContext from '../../context';
import MapViewer from '../MapViewer';
import MyAccount from './MyAccount';

const AccountDetails = () => {
  const { currentUser } = useContext(AppContext);
  console.log(currentUser);
  return (
    <>
      <MapViewer />
      {currentUser.id
        ? <MyAccount profileInfo={currentUser} />
        : <div>Login to see account.</div>}
    </>
  );
};

export default AccountDetails;
