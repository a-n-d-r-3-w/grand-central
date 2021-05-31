import React from 'react';
import LoginButton from './LoginButton';

const Auth0Login = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm"></div>
        <div className="col-sm">
          <h1>Hello.</h1>
        </div>
        <div className="col-sm"></div>
      </div>
      <div className="row">
        <div className="col-sm"></div>
        <div className="col-sm">
          <LoginButton />
        </div>
        <div className="col-sm"></div>
      </div>
    </div>
  );
}

export default Auth0Login;
