import React, { useEffect } from 'react';
import axios from 'axios';

const removeToken = () => {
  axios.delete('/api/legacy/login');
};

const LegacyLogin = () => {
  useEffect(() => {
    removeToken();
  }, []);

  return (
    <main className="container">
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
          <form action="/api/legacy/login" method="post">
            <div className="mb-3">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="selected-app"
                  id="good-habits-radio"
                  value="legacy/good-habits"
                  defaultChecked
                />
                <label className="form-check-label" htmlFor="good-habits-radio">
                  Good Habits
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="selected-app"
                  id="about-others-radio"
                  value="legacy/about-others"
                />
                <label
                  className="form-check-label"
                  htmlFor="about-others-radio"
                >
                  About Others
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="selected-app"
                  id="ohlife-radio"
                  value="legacy/ohlife"
                />
                <label className="form-check-label" htmlFor="ohlife-radio">
                  OhLife
                </label>
              </div>
            </div>
            <div className="mb-3">
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter password"
              />
            </div>
            <button className="btn btn-primary">Log in</button>
          </form>
        </div>
        <div className="col-sm"></div>
      </div>
    </main>
  );
};

export default LegacyLogin;
