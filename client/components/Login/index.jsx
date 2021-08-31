import React, { useContext } from 'react';
import AppContext from '../../context';
import MapViewer from '../MapViewer';

const Login = () => {
  const { setLoggedIn } = useContext(AppContext);

  return (
    <div>
      <MapViewer />
      <button onClick={() => { setLoggedIn(true); }} type="submit">Sign In</button>
    </div>
  );
};

export default Login;
