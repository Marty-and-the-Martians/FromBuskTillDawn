import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import AppContext from '../../context';
import useStyles from '../hooks/useStyles';

const NavBar = () => {
  const [loggedOut, setLoggedOut] = useState(false);
  const {
    setLoggedIn, btnPath, setBtnPath, btnText, setBtnText, loggedIn,
    accountDeetsShowing, setAccountDeetsShowing, setCurrentUser,
  } = useContext(AppContext);
  const classes = useStyles();

  const location = useLocation();

  const handleClick = () => {
    if (loggedIn) {
      setAccountDeetsShowing(!accountDeetsShowing);
    }
  };

  const handleLogout = () => {
    Cookies.remove('token');
    setLoggedIn(false);
    setLoggedOut(true);
    setCurrentUser({});
  };

  useEffect(() => {
    if (!loggedIn && !accountDeetsShowing) { setBtnText('Login'); setBtnPath('/login'); }
    if (loggedIn && !accountDeetsShowing) { setBtnText('My Account'); setBtnPath('/account'); }
    if (loggedIn && accountDeetsShowing) { setBtnText('Home'); setBtnPath('/'); }
  }, [location.pathname, loggedIn]);

  return (
    <AppBar position="static">
      <Toolbar className={classes.header}>
        <Typography variant="h4" component="h1">
          {'Busk til\' Dawn'}
        </Typography>

        {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Button color="inherit"> </Button>
        */}
        <ButtonGroup variant="contained" aria-label="text primary button group">
          <Button>
            <Link onClick={handleClick} to={btnPath}>
              {btnText}
            </Link>
          </Button>
          {loggedIn
            ? <Button onClick={handleLogout}>Logout</Button>
            : null }
        </ButtonGroup>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
