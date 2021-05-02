import React, { useEffect } from 'react';
import axios from 'axios';

const removeToken = () => {
  axios.delete('/api/login');
};

const Login = () => {
  useEffect(() => {
    removeToken();
  }, []);

  return <div class="container">
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
            <input type="password" name="password" class="form-control" placeholder="Enter password" />
          </div>
          <button class="btn btn-primary">Log in</button>
        </form>
      </div>
      <div class="col-sm"></div>
    </div>
  </div>
  ;
}

export default Login;
