/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Redirect } from 'react-router-dom';

// Material UI Imports
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import AppContext from '../../../context';
import useStyles from '../../hooks/useStyles';

const LoginForm = ({ setShowSignUpForm }) => {
  const [loginErrors, setLoginErrors] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { setLoggedIn, setCurrentUser } = useContext(AppContext);
  const { register, handleSubmit } = useForm();

  const classes = useStyles();

  const handleLogin = (data) => {
    axios
      .post('/api/login', data)
      .then((res) => {
        window.sessionStorage.token = res.data.token;
        const tokens = (res.data.token).split('.');
        setCurrentUser(JSON.parse(atob(tokens[1])));
      })
      .then(() => { setSubmitted(true); setLoggedIn(true); })
      .catch((err) => {
        const errKeys = Object.keys(err.response.data);
        setLoginErrors(err.response.data[errKeys[0]]);
      });
  };

  if (submitted) {
    return <Redirect to="/" />;
  }

  return (
    <Container className={classes.logins}>
      {loginErrors
        ? (
          <Typography variant="h5" component="h4">
            {`Invalid credentials: ${loginErrors}`}
          </Typography>
        )
        : (
          <Typography variant="h5" component="h4">
            Login For Buskers!
          </Typography>
        )}
      <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmit(handleLogin)}>
        <TextField required label="Email" {...register('email')} />
        <TextField required label="Password" type="password" {...register('password')} />
        <Button type="submit" variant="contained"> Log In! </Button>
        <Typography>
        <Button onClick={() => { setShowSignUpForm(true); }}>Not a Member? Sign Up!</Button>
        </Typography>
      </form>
    </Container>
  );
};

export default LoginForm;
