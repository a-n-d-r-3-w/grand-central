import React, { useEffect } from 'react';
import axios from 'axios';

const removeToken = () => {
  axios.delete('/api/login');
};

const Login = () => {
  useEffect(() => {
    removeToken();
  }, []);

  return (
    <div class="container">
      <div class="row">
        <div class="col-sm"></div>
        <div class="col-sm">
          <h1>Hello.</h1>
        </div>
        <div class="col-sm"></div>
      </div>
      <div class="row">
        <div class="col-sm"></div>
        <div class="col-sm">
          <form action="/api/login" method="post">
            <div class="mb-3">
              <div class="form-check">
                <input class="form-check-input" type="radio" name="selected-app" id="about-others-radio" value="about-others" checked />
                <label class="form-check-label" for="about-others-radio">About Others</label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="selected-app" id="ohlife-radio" value="ohlife" />
                <label class="form-check-label" for="ohlife-radio">OhLife</label>
              </div>
            </div>
            <div class="mb-3">
              <input type="password" name="password" class="form-control" placeholder="Enter password" />
            </div>
            <button class="btn btn-primary">Log in</button>
          </form>
        </div>
        <div class="col-sm"></div>
      </div>
    </div>
  );
}

export default Login;
