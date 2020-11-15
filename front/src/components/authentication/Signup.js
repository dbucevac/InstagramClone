import React from 'react';
import {Link} from "react-router-dom";
import {signup} from '../../services/register';

class Signup extends React.Component{
    constructor(){
        super();

        this.state = { fields:{username: "", email: "", password: "", passwordConfirm: ""}, errors:{username:'', email:'', password:'', passwordConfirm:'', match:''}};
    }

    handleChange(field, e){         
        let fields = this.state.fields;
        fields[field] = e.target.value;        
        this.setState({fields});
    }

    handleValidation(){
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //Username
        if(!fields["username"]){
           formIsValid = false;
           errors["username"] = "Username cannot be empty";
        }
  
        if(typeof fields["username"] !== "undefined"){
           if(!fields["username"].match(/^[a-zA-Z0-9]*$/)){
              formIsValid = false;
              errors["username"] = "Space characters aren't allowed";
           }        
        }
   
        //Email
        if(!fields["email"]){
           formIsValid = false;
           errors["email"] = "Email cannot be empty";
        }
  
        if(typeof fields["email"] !== "undefined"){
            let lastAtPos = fields["email"].lastIndexOf('@');
            let lastDotPos = fields["email"].lastIndexOf('.');

            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
               formIsValid = false;
               errors["email"] = "Email is not valid";
             }
        } 
       //Password & Password Confirm

       if(!fields["password"]){
        formIsValid = false;
        errors["password"] = "Password cannot be empty";
        }

       if(typeof fields["password"] !== "undefined"){
            if(!fields["password"].match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)){
                formIsValid = false;
                errors["password"] = "Password is not valid";
            }   
        }

        if(!fields["passwordConfirm"]){
            formIsValid = false;
            errors["passwordConfirm"] = "Password confirmation cannot be empty";
        }
    
        if(typeof fields["passwordConfirm"] !== "undefined"){
            if(!fields["passwordConfirm"].match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)){
                formIsValid = false;
                errors["passwordConfirm"] = "Password confirmation is not valid";
            }   
        }

        if(fields["password"]!==fields["passwordConfirm"]){
            formIsValid = false;
            errors["match"] = "Password and password confirmation don't match";
        }


       this.setState({errors: errors});
       return formIsValid;
   }



    doSignup(e){
        e.preventDefault();
        if(this.handleValidation()){
            signup(this.state.fields.username, this.state.fields.email, this.state.fields.password, this.state.fields.passwordConfirm);
            this.props.history.push("/login");
            alert("You've been successfully registered!You can log into your account")
         }
    }


    render(){
        return(
            <div className="container">
            <div className="row">
                <div className="col s12 m3"></div>
                <div className="col s12 m6">
                <div className="card white signup-card">
                    <div className="card-content center black-text">
                    <h3 className="center">InstaClone</h3>
                    <h6 className="signup-subtitle">Sign up to see photos and videos from your friends.</h6>
                    <form>
                        <input className="inputBtn" 
                        type="text" 
                        name="username" 
                        placeholder="username"
                        onChange={(e) => {
                        this.handleChange("username", e);}}></input>
                        <p style={{color: "red"}}>{this.state.errors["username"]}</p>

                        <input className="inputBtn" 
                        type="text" 
                        name="email" 
                        placeholder="email"
                        onChange={(e) => {
                        this.handleChange("email", e);}}></input>
                        <p style={{color: "red"}}>{this.state.errors["email"]}</p>

                        <input className="inputBtn"
                         type="password" 
                         name="password" 
                         placeholder="password"
                         onChange={(e) => {
                        this.handleChange("password", e);}}></input>
                        <p style={{color: "red"}}>{this.state.errors["password"]}</p>

                        <input className="inputBtn"
                         type="password" 
                         name="passwordConfirm" 
                         placeholder="confirm password"
                         onChange={(e) => {
                        this.handleChange("passwordConfirm", e);}}></input>
                        <p style={{color: "red"}}>{this.state.errors["passwordConfirm"]}</p>
                        <p style={{color: "red"}}>{this.state.errors["match"]}</p>

                        <button className="btn-small blue darken-2 sbmtBtn" 
                        onClick={(e) => {this.doSignup(e)}}>Sign Up</button>
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