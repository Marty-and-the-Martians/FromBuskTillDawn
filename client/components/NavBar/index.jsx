import React, { useContext, useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import AppContext from '../../context';
import useStyles from '../hooks/useStyles';

const NavBar = () => {
  const {
    setLoggedIn,
    btnPath,
    setBtnPath,
    btnText,
    setBtnText,
    loggedIn,
    accountDeetsShowing,
    setAccountDeetsShowing,
    setCurrentUser,
    currentPerformerProfile,
    setcurrentPerformerProfile,
  } = useContext(AppContext);
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const handleClick = () => {
    if (loggedIn) {
      setAccountDeetsShowing(!accountDeetsShowing);
    }
  };

  const handleLogout = () => {
    window.sessionStorage.removeItem('token');
    setLoggedIn(false);
    setCurrentUser({});
  };

  const handleProfileLeave = () => {
    setcurrentPerformerProfile('');
    history.push('/');
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
          {currentPerformerProfile
            ? <Button onClick={handleProfileLeave}>Back</Button>
            : <Button><Link onClick={handleClick} to={btnPath}>{btnText}</Link></Button>}
          {loggedIn
            ? <Button onClick={handleLogout}>Logout</Button>
            : null }
        </ButtonGroup>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
