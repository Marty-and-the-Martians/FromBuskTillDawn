import React, { useContext } from 'react';
import AppContext from '../../context';

const AccountDetails = () => {
  const context = useContext(AppContext);

  return (
    <div> Account Settings Go Here </div>
  );
};

export default AccountDetails;
