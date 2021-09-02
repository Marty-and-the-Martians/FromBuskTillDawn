import React, { useState } from 'react';
import MapViewer from '../MapViewer';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import SplitPane from '../SplitPane';

const Login = () => {
  const [showSignUpForm, setShowSignUpForm] = useState(false);

  return (
    <SplitPane
      left={<MapViewer />}
      right={(
        showSignUpForm ? (
          <SignUpForm setShowSignUpForm={setShowSignUpForm} />
        ) : (
          <LoginForm setShowSignUpForm={setShowSignUpForm} />
        )
      )}
    />
  );
};

export default Login;
