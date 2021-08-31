import React, { useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AppContext from '../../context';

const NavBar = () => {
  const {
    btnPath, setBtnPath, btnText, setBtnText, loggedIn, accountDeetsShowing, setAccountDeetsShowing,
  } = useContext(AppContext);

  const location = useLocation();

  useEffect(() => {
    if (!loggedIn && !accountDeetsShowing) { setBtnText('Sign up or Sign in'); setBtnPath('/signin'); }
    if (loggedIn && !accountDeetsShowing) { setBtnText('My Account'); setBtnPath('/account'); }
    if (loggedIn && accountDeetsShowing) { setBtnText('Home'); setBtnPath('/'); }
  }, [location.pathname, loggedIn]);

  const handleClick = () => {
    if (loggedIn) {
      setAccountDeetsShowing(!accountDeetsShowing);
    }
  };

  return (
    <Link onClick={handleClick} to={btnPath}>
      {btnText}
    </Link>
  );
};

export default NavBar;
