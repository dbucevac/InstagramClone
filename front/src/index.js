import React from 'react';
import ReactDOM from 'react-dom';
import Home from "./components/Home";
import Login from './components/authentication/Login';
import Signup from './components/authentication/Signup'
import NotFound from "./components/NotFound";
import {
  Route,
  Link,
  HashRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import { logout } from "./services/auth";
import './index.css';

class App extends React.Component {

  render() {
    let token = window.localStorage.getItem("token");
    let username = window.localStorage.getItem("username")
    if (token) {
      return (
        <div>
        {console.log(token + ' ' + username)}
          <Router>
            <nav>
              <div className="nav-wrapper white">
              <Link to="/" className="brand-logo"><i class="small material-icons logo-icon">camera_alt</i>InstaClone</Link>
              <ul id="nav-mobile" className="right">
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/logout" onClick={() => {
                  logout();
                }}>Logout</Link></li>
              </ul>
              </div>
            </nav>     
              <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login">
                  <Redirect to="/"></Redirect>
              </Route>
              <Route exact path="/signup">
                  <Redirect to="/"></Redirect>
              </Route>
                <Route component={NotFound} />
              </Switch>
          </Router>
        </div>
      );
    }else{
      return(
        <Router>  
              <Switch>
              <Route exact path="/login" component={Login}></Route>
              <Route path="/">
                <Redirect to="/login"></Redirect>
              </Route>
              </Switch>
        </Router>
      )
    }
  }
}

ReactDOM.render(
    <App />,
  document.getElementById('root')
);


