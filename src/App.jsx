import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Login';
import AboutOthers from './AboutOthers';
import OhLife from './OhLife';
import Quotes from './Quotes';
import './App.css';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/about-others">
          <AboutOthers />
        </Route>
        <Route path="/ohlife">
          <OhLife />
        </Route>
        <Route path="/quotes">
          <Quotes />
        </Route>
        <Route path="/">
          <GrandCentral />
        </Route>
      </Switch>
    </Router>
  );
};

function GrandCentral() {
  return <h1>Home</h1>;
}

export default App;
