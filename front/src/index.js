import React from 'react';
import ReactDOM from 'react-dom';
import Home from "./components/Home";
import Login from './components/authentication/Login';
import Signup from './components/authentication/Signup'
import NotFound from "./components/NotFound";
import UploadFile from './components/UploadFile';
import UploadProfilePicture from './components/UploadProfilePicture';
import Profile from './components/Profile';
import OtherUserProfile from './components/OtherUserProfile'
import Account from './components/Account';
import Post from './components/Post';
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
              <Link to="/" className="brand-logo"><i className="small material-icons logo-icon">camera_alt</i>InstaClone</Link>  
              <ul id="nav-mobile" className="right">
                  <li >
                    <form style={{"marginRight":"2rem"}}>
                        <input id="search" type="search" placeholder="Search"></input>
                    </form>
                  </li>
                  <li><Link to="/uploadpicture"><i className="small material-icons logo-icon" title="Post a photo">add_box</i></Link></li>
                  <li><Link to="/"><i className="small material-icons logo-icon" title="Home">home</i></Link></li>
                  <li><Link to="/profile" className="btn-floating pink accent-1 white-text profile-icon" title={username + " profile"}>{username.charAt(0).toUpperCase()}</Link></li>
                  <li><Link to="" onClick={() => {
                  logout();
                }}><i className="small material-icons logo-icon" title="Log out">power_settings_new</i></Link></li>
              </ul>
              </div>
            </nav>     
              <Switch>
              <Route exact path="/" render={(props) => (
                  <Home {...props} username={username} />)}>
                </Route>
                <Route exact path="/uploadpicture" render={(props) => (
                  <UploadFile {...props} username={username} />)}>
                </Route>
                <Route exact path="/uploadprofilepicture" render={(props) => (
                  <UploadProfilePicture {...props} username={username} />)}>
                </Route>
                <Route exact path="/profile" render={(props) => (
                  <Profile {...props} username={username} />)}>
                </Route>
                <Route exact path="/account" render={(props) => (
                  <Account {...props} username={username} />)}>
                </Route>
                <Route exact path="/posts/:id" render={(props) => (
                  <Post {...props} username={username} />)}>
                </Route>
                <Route exact path="/users/:id" render={(props) => (
                  <OtherUserProfile {...props} username={username} />)}>
                </Route>
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
              <Route exact path="/signup" component={Signup}></Route>
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


