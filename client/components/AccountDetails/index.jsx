import React, { useContext } from 'react';
import AppContext from '../../context';
import MapViewer from '../MapViewer';
import data from '../../assets/mockData';
import MyAccount from './MyAccount';
import PerformerProfile from './PerformerProfile';

const AccountDetails = () => {
  const { loggedIn } = useContext(AppContext);
  const { user2, loggedOnUser } = data;
  const profileInfo = loggedIn ? loggedOnUser : user2;
  const { name } = profileInfo;
  const currentUser = 'Keanu';
  // console.log(user);
  return (
    <>
      <MapViewer />
      {loggedOnUser && currentUser === name
        ? <MyAccount profileInfo={profileInfo} />
        : <PerformerProfile profileInfo={profileInfo} />}
    </>
  );
};

export default AccountDetails;
