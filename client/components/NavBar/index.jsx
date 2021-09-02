import React, { useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

import AppContext from '../../context';
import useStyles from '../hooks/useStyles';

const NavBar = () => {
  const {
    btnPath, setBtnPath, btnText, setBtnText, loggedIn, accountDeetsShowing, setAccountDeetsShowing,
  } = useContext(AppContext);
  const classes = useStyles();

  const location = useLocation();

  useEffect(() => {
    if (!loggedIn && !accountDeetsShowing) { setBtnText('Login'); setBtnPath('/login'); }
    if (loggedIn && !accountDeetsShowing) { setBtnText('My Account'); setBtnPath('/account'); }
    if (loggedIn && accountDeetsShowing) { setBtnText('Home'); setBtnPath('/'); }
  }, [location.pathname, loggedIn]);

  const handleClick = () => {
    if (loggedIn) {
      setAccountDeetsShowing(!accountDeetsShowing);
    }
  };

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
        <Button variant="contained">
          <Link onClick={handleClick} to={btnPath}>
            {btnText}
          </Link>
        </Button>

      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
