/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import useStyles from '../../hooks/useStyles';

const SignUpForm = ({ setShowSignUpForm }) => {
  const classes = useStyles();
  const [signUpErrors, setSignUpErrors] = useState('');
  const { register, handleSubmit } = useForm();

  const handleSignUp = (data) => {
    axios
      .post('/api/register', data)
      .then(() => { setShowSignUpForm(false); })
      .catch((err) => {
        const errKeys = Object.keys(err.response.data);
        setSignUpErrors(err.response.data[errKeys[0]]);
      });
  };

  return (
    <Container className={classes.logins}>
      {signUpErrors
        ? (
          <Typography variant="h5" component="h4">{`Invalid credentials: ${signUpErrors}`}</Typography>
        )
        : null}
      <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmit(handleSignUp)}>
        <TextField required label="Desired Username" {...register('name')} />
        <TextField required label="Zipcode" {...register('zipcode')} />
        <TextField required label="Email" {...register('email')} />
        <TextField required label="Password" type="password" {...register('password')} />
        <TextField required label="Confirm Password" type="password" {...register('password2')} />
        <Button variant="contained" type="submit">Sign Up!</Button>
      </form>
    </Container>
  );
};

export default SignUpForm;
