import React from "react";
import {Link} from "react-router-dom";
import {login} from '../../services/auth';
import phoneImage from '../../resources/phone.png'

class Login extends React.Component {
  constructor() {
    super();

    this.state = { username: "", password: "" };
  }

  //setting the typed in value in the state of the concerned field

  valueInputChange(event) {
    let control = event.target;

    let name = control.name;
    let value = control.value;

    let change = {};
    change[name] = value;
    this.setState(change);
  }

  //method for logging in the user which uses an external method defined in the services package

  doLogin(){
    login(this.state);
    this.props.history.push('/'); 
  }

  render() {
    return (
        <div className="container">
            <div className="row">
                <div className="col s12 m6">
                <div className="phone-image">
                    <img src={phoneImage}/>
                </div>
                </div>
                <div className="col s12 m6">
                <div className="card medium white login-card">
                    <div className="card-content center black-text">
                    <h3 className="center">InstaClone</h3>
                    <form>
                        <input className="inputBtn" 
                        type="text" 
                        name="username" 
                        placeholder="username"
                        onChange={(e) => {
                        this.valueInputChange(e);}}></input>

                        <input className="inputBtn"
                         type="password" 
                         name="password" 
                         placeholder="password"
                         onChange={(e) => {
                        this.valueInputChange(e);}}></input>

                        <button className="btn-small blue darken-2 sbmtBtn" 
                        onClick={() => {this.doLogin()}}>Log In</button>
                    </form>
                        <div className="span-signup">
                            <span>Don't have an account?<Link to="/signup" className="signup-link"> Sign Up</Link></span>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        
      </div>
    );
  }
}

export default Login;