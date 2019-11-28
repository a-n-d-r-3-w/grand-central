import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import AboutOthers from './AboutOthers/index';
import './App.css';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/about-others">
          <AboutOthers />
        </Route>
        <Route path="/">
          <GrandCentral />
        </Route>
      </Switch>
    </Router>
  );
};

function GrandCentral() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Grand Central</Link>
          </li>
          <li>
            <Link to="/about-others">About Others</Link>
          </li>
        </ul>
      </nav>
      <h1>Grand Central</h1>
    </>
  );
}

export default App;
