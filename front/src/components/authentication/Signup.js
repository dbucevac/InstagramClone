import React from 'react';
import {Link} from "react-router-dom";
import {signup} from '../../services/register';

class Signup extends React.Component{
    constructor(){
        super();

        this.state = { username: "", email: "", password: "", passwordConfirm: "" };
    }

    valueInputChange(event) {
        let control = event.target;
    
        let name = control.name;
        let value = control.value;
    
        let change = {};
        change[name] = value;
        this.setState(change);
    }

    doSignup(){
        signup(this.state);
    }


    render(){
        return(
            <div className="container">
            <div className="row">
                <div className="col s12 m3"></div>
                <div className="col s12 m6">
                <div className="card large white">
                    <div className="card-content center black-text">
                    <h3 className="center">InstaClone</h3>
                    <h6 className="signup-subtitle">Sign up to see photos and videos from your friends.</h6>
                    <form>
                        <input className="inputBtn" 
                        type="text" 
                        name="username" 
                        placeholder="username"
                        onChange={(e) => {
                        this.valueInputChange(e);}}></input>

                        <input className="inputBtn" 
                        type="text" 
                        name="email" 
                        placeholder="email"
                        onChange={(e) => {
                        this.valueInputChange(e);}}></input>

                        <input className="inputBtn"
                         type="password" 
                         name="password" 
                         placeholder="password"
                         onChange={(e) => {
                        this.valueInputChange(e);}}></input>

                        <input className="inputBtn"
                         type="password" 
                         name="passwordConfirm" 
                         placeholder="confirm password"
                         onChange={(e) => {
                        this.valueInputChange(e);}}></input>

                        <button className="btn-small blue darken-2 sbmtBtn" 
                        onClick={() => {this.doSignup()}}>Sign Up</button>
                    </form>
                        <div className="span-login">
                            <span>Have an account?<Link to="/login" className="login-link"> Log In</Link></span>
                        </div>
                    </div>
                </div>
                </div>
                <div className="col s12 m3"></div>
            </div>
        
      </div>
        )
    }
}

export default Signup;