import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../../context';
import MapViewer from '../MapViewer';
import EditMyAccount from './EditMyAccount';
import MyAccount from './MyAccount';

const AccountDetails = () => {
  const { currentUser, setCurrentUser } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <MapViewer />
      {isEditing
        ? <EditMyAccount profileInfo={currentUser} setIsEditing={setIsEditing} />
        : <MyAccount profileInfo={currentUser} setIsEditing={setIsEditing} />}
    </>
  );
};

export default AccountDetails;
