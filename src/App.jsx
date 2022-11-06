import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LegacyLogin from './LegacyLogin';
import AboutOthers from './AboutOthers';
import OhLife from './OhLife';
import GoodHabits from './GoodHabits';
import CreateAccount from './CreateAccount';
import CreateAccountSuccess from './CreateAccountSuccess';
import LogIn from './LogIn';

const App = () => {
  return (
    <Router>
      <Switch>
        {/* New pages */}
        <Route path="/create-account/success">
          <CreateAccountSuccess />
        </Route>
        <Route path="/create-account">
          <CreateAccount />
        </Route>
        <Route path="/log-in">
          <LogIn />
        </Route>

        {/* Legacy pages */}
        <Route path="/login">
          <LegacyLogin />
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
