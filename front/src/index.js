import React from 'react';
import ReactDOM from 'react-dom';
import Axios from './apis/Axios';
import Home from "./components/Home";
import Login from './components/authentication/Login';
import Signup from './components/authentication/Signup'
import NotFound from "./components/NotFound";
import UploadFile from './components/UploadFile';
import UploadProfilePicture from './components/UploadProfilePicture';
import Profile from './components/Profile';
import OtherUserProfile from './components/OtherUserProfile'
import Account from './components/Account';
import PasswordChage from './components/PasswordChange';
import Post from './components/Post';
import Followers from './components/Followers';
import Followings from './components/Followings';
import Suggestions from './components/Suggestions';
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

  constructor(props){
    super(props);
    this.state={
      users:[],
      search:'',
      searchResultDisplayed: false
    }
  }

  componentDidMount(){
    this.getUsers()
    
  }

  //Get all users

  getUsers(){
    Axios.get('/users')
        .then(res => {
          let loggedinUser = window.localStorage.getItem("username")
          var users = res.data;
          users.map(user=>{
            if(loggedinUser !== user.username){
              this.setState({users:this.state.users.concat(user)})
            }
          })   
        })
        .catch(error => {
            //console.log(error)
        })
  }

   //Method for updating the search field with typed in value

  updateSearch(event){
    this.setState({search:event.target.value})
    this.setState({searchResultDisplayed: true})
  }

  render() {
    let token = window.localStorage.getItem("token");
    let username = window.localStorage.getItem("username")
    let filteredUsers = this.state.users.filter(
      (user)=>{
        return user.username.toLowerCase().indexOf(this.state.search.toLowerCase())!=-1;
      }
    );
    let searchResult = this.state.searchResultDisplayed?"block":"none";
    if (token) {
      return (
        <div onClick={()=>{this.setState({searchResultDisplayed:false})}}>
          <Router>
          <div className="navbar-fixed">
            <nav>
              <div className="nav-wrapper white">
              <Link to="/" className="brand-logo"><i className="small material-icons logo-icon">camera_alt</i>InstaClone</Link>  
              <ul id="nav-mobile" className="right">
                  <li style={{"position":"relative", "display":"inline-block"}}>
                    <form style={{"marginRight":"2rem"}}>
                        <input id="search" type="search" placeholder="Search" style={{"width":"15rem"}} autoComplete="off"
                        value={this.state.search} onChange={(e)=>{this.updateSearch(e)}}></input>
                        <div className="dropdown-content" style={{"display":searchResult}} >
                        {filteredUsers.map(user => (
                            <Link to={"/users/"+user.id} key={user.id} onClick={()=>{this.setState({search:''})}}>{user.username}</Link>
                        ))}                        
                        </div>
                    </form>
                    
                  </li>
                  <li><Link to="/uploadpicture"><i className="small material-icons logo-icon" title="Post a photo">add_box</i></Link></li>
                  <li><Link to="/"><i className="small material-icons logo-icon" title="Home">home</i></Link></li>
                  <li><Link to="/suggestions"><i className="small material-icons logo-icon" title="Suggestions">group_add</i></Link></li>
                  <li><Link to="/profile" className="btn-floating pink accent-1 white-text profile-icon" title={username + " profile"}>{username.charAt(0).toUpperCase()}</Link></li>
                  <li><Link to="" onClick={() => {
                  logout();
                }}><i className="small material-icons logo-icon" title="Log out">power_settings_new</i></Link></li>
              </ul>
              </div>
            </nav>
            </div>     
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
                <Route exact path="/password-change" render={(props) => (
                  <PasswordChage {...props} username={username} />)}>
                </Route>
                <Route exact path="/posts/:id" render={(props) => (
                  <Post {...props} username={username} />)}>
                </Route>
                <Route exact path="/users/:id" render={(props) => (
                  <OtherUserProfile {...props} username={username} />)}>
                </Route>
                <Route exact path="/users/:id/followers" render={(props) => (
                  <Followers {...props} username={username} />)}>
                </Route>
                <Route exact path="/users/:id/following" render={(props) => (
                  <Followings {...props} username={username} />)}>
                </Route>
                <Route exact path="/suggestions" render={(props) => (
                  <Suggestions {...props} username={username} />)}>
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


