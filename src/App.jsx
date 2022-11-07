import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import LegacyLogin from './LegacyLogin';
import LegacyAboutOthers from './LegacyAboutOthers';
import LegacyOhLife from './LegacyOhLife';
import LegacyGoodHabits from './LegacyGoodHabits';

import CreateAccount from './CreateAccount';
import CreateAccountSuccess from './CreateAccountSuccess';
import LogIn from './LogIn';

const App = () => {
  return (
    <Router>
      <Switch>
        {/* Pages for new apps. */}
        <Route path="/create-account/success">
          <CreateAccountSuccess />
        </Route>
        <Route path="/create-account">
          <CreateAccount />
        </Route>
        <Route path="/log-in">
          <LogIn />
        </Route>

        {/* Pages for legacy apps. */}
        <Route path="/legacy/login">
          <LegacyLogin />
        </Route>
        <Route path="/legacy/about-others">
          <LegacyAboutOthers />
        </Route>
        <Route path="/legacy/ohlife">
          <LegacyOhLife />
        </Route>
        <Route path="/legacy/good-habits">
          <LegacyGoodHabits />
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
