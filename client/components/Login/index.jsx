import React, { useContext } from 'react';
import AppContext from '../../context';

const Login = () => {
  const { setLoggedIn } = useContext(AppContext);

  return (
    <div>
      <button onClick={() => { setLoggedIn(true); }} type="submit">Sign In</button>
    </div>
  );
};

export default Login;
