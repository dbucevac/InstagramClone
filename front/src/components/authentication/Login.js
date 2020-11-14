import React from "react";
import {
    Link
  } from "react-router-dom";
import {login} from '../../services/auth';
import phoneImage from '../../resources/phone.png'

class Login extends React.Component {
  constructor() {
    super();

    this.state = { username: "", password: "" };
  }

  valueInputChange(event) {
    let control = event.target;

    let name = control.name;
    let value = control.value;

    let change = {};
    change[name] = value;
    this.setState(change);
  }


  doLogin(){
    login(this.state);
    
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
                <div className="card medium white">
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
                        type="submit"
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