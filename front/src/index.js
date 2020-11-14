import React from 'react';
import ReactDOM from 'react-dom';
import Home from "./components/Home";
import Login from './components/authentication/Login'
import NotFound from "./components/NotFound";
import {
  Route,
  Link,
  HashRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import './index.css';

class App extends React.Component {

  render() {
    
      return (
        <div>
          <Router>
            <nav>
              <div className="nav-wrapper white">
              <Link to="/" className="brand-logo">InstaClone</Link>
              <ul id="nav-mobile" className="right">
                  <li><Link to="/login">Login</Link></li>
                  <li><Link to="/signup">Sign Up</Link></li>
              </ul>
              </div>
            </nav>     
              <Switch>
              <Route exact path="/login" component={Login}></Route>
              <Route path="/">
                <Redirect to="/login"></Redirect>
              </Route>
              </Switch>
          </Router>
        </div>
      );
  }
}

ReactDOM.render(
    <App />,
  document.getElementById('root')
);


