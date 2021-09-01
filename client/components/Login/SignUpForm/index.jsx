/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

const SignUpForm = ({ setShowSignUpForm }) => {
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
    <div>
      {signUpErrors
        ? (
          <div>Invalid credentials: {loginErrors}</div>
        )
        : null}
      <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmit(handleSignUp)}>
        <label>
          Desired Username:
          <input type="text" {...register('name')} />
        </label>
        <label>
          Zipcode:
          <input type="text" {...register('zipcode')} />
        </label>
        <label>
          Email Address:
          <input type="text" {...register('email')} />
        </label>
        <label>
          Password:
          <input type="text" {...register('password')} />
        </label>
        <label>
          Confirm Password:
          <input type="text" {...register('password2')} />
        </label>
        <input type="submit" value="Sign Up!" />
      </form>
    </div>
  );
};

export default SignUpForm;
