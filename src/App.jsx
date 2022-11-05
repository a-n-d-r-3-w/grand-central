import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Login';
import AboutOthers from './AboutOthers';
import OhLife from './OhLife';
import GoodHabits from './GoodHabits';
import CreateAccount from './CreateAccount';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/create-account">
          <CreateAccount />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/about-others">
          <AboutOthers />
        </Route>
        <Route path="/ohlife">
          <OhLife />
        </Route>
        <Route path="/good-habits">
          <GoodHabits />
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
