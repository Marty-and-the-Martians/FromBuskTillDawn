import React, { useState } from 'react';
import MapViewer from '../MapViewer';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

const Login = () => {
  const [showSignUpForm, setShowSignUpForm] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <MapViewer />
      {showSignUpForm
        ? <SignUpForm setShowSignUpForm={setShowSignUpForm} />
        : <LoginForm setShowSignUpForm={setShowSignUpForm} /> }
    </div>
  );
};

export default Login;
