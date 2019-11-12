import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
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
    </Router>
  );
}

function GrandCentral() {
  return <h2>Grand Central</h2>;
}

function AboutOthers() {
  return <h2>About</h2>;
}

function AnotherApp() {
  return <h2>Another App</h2>;
}

export default App;
