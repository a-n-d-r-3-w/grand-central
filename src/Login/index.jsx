import React, { useEffect } from 'react';
import axios from 'axios';
import LogoutButton from '../Auth0Login/LogoutButton';
import Profile from '../Auth0Login/Profile';

const removeToken = () => {
  axios.delete('/api/login');
};

const Login = () => {
  useEffect(() => {
    removeToken();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm"></div>
        <div className="col-sm">
          <h1>Hello.</h1>
          <Profile />
          <LogoutButton />
        </div>
        <div className="col-sm"></div>
      </div>
      <div className="row">
        <div className="col-sm"></div>
        <div className="col-sm">
          <form action="/api/login" method="post">
            <div className="mb-3">
              <div className="form-check">
                <input className="form-check-input" type="radio" name="selected-app" id="about-others-radio" value="about-others" defaultChecked />
                <label className="form-check-label" htmlFor="about-others-radio">About Others</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="selected-app" id="ohlife-radio" value="ohlife" />
                <label className="form-check-label" htmlFor="ohlife-radio">OhLife</label>
              </div>
            </div>
            <div className="mb-3">
              <input type="password" name="password" className="form-control" placeholder="Enter password" />
            </div>
            <button className="btn btn-primary">Log in</button>
          </form>
        </div>
        <div className="col-sm"></div>
      </div>
    </div>
  );
}

export default Login;
