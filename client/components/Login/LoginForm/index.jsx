/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Redirect } from 'react-router-dom';
import AppContext from '../../../context';

const LoginForm = ({ setShowSignUpForm }) => {
  const [loginErrors, setLoginErrors] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { setLoggedIn } = useContext(AppContext);
  const { register, handleSubmit } = useForm();

  const handleLogin = (data) => {
    axios
      .post('/api/login', data)
      .then(() => { setSubmitted(true); setLoggedIn(true); })
      .then(/* need to fetch or decode user info from the res user info */)
      .catch((err) => {
        const errKeys = Object.keys(err.response.data);
        setLoginErrors(err.response.data[errKeys[0]]);
      });
  };

  if (submitted) {
    return <Redirect to="/home" />;
  }

  return (
    <>
      {loginErrors
        ? (
          <div> Invalid credentials: {loginErrors} </div>
        )
        : null}
      <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmit(handleLogin)}>
        <label>
          Email:
          <input type="text" {...register('email')} />
        </label>
        <label>
          Password:
          <input type="text" {...register('password')} />
        </label>
        <input type="submit" value="Log in!" />
        <div>
          Not a member?
          {' '}
          <em onClick={() => { setShowSignUpForm(true); }}>Sign Up</em>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
