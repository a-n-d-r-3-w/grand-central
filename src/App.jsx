import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import AboutOthers from './AboutOthers/index';
import AboutOthersAccount from './AboutOthers/AboutOthersAccount';
import './App.css';

const App = () => {
  return (
    <Router>
      <CssBaseline />
      <Container maxWidth="sm">
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Grand Central</Link>
              </li>
              <li>
                <Link to="/about-others">About Others</Link>
              </li>
              <li>
                <Link to="/another-app">Another App</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/about-others">
              <AboutOthers />
            </Route>
            <Route path="/another-app">
              <AnotherApp />
            </Route>
            <Route path="/">
              <GrandCentral />
            </Route>
          </Switch>
        </div>
      </Container>
    </Router>
  );
};

function GrandCentral() {
  return <h1>Grand Central</h1>;
}

function AnotherApp() {
  return <h1>Another App</h1>;
}

export default App;
