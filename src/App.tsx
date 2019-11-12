import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import './App.css';

const App: React.FC = () => {
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
