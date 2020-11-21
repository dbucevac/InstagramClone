import React from 'react';
import Axios from '../apis/Axios';
import {Link} from "react-router-dom";
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
class Account extends React.Component{
    constructor(props){
        super(props);

        this.state = { fields:{id: -1, username: this.props.username, email: "", description:""}, errors:{username:'', email:''}};
        toast.configure()
    }

    componentDidMount(){
      this.getLoggedInUser()
      
    }

    getLoggedInUser(){
      Axios.get('/users/?username='+this.state.fields.username)
          .then(res => {
              this.setState({fields:res.data[0]})
          })
          .catch(error => {
              console.log(error)
          })
  }

    handleChange(field, e){         
        let fields = this.state.fields;
        fields[field] = e.target.value;        
        this.setState({fields});
    }

    handleValidationAccount(){
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
        this.setState({errors: errors});
        return formIsValid;
    }

    handleValidationPasswordChange(){
      let fields = this.state.fields;
      let errors = {};
      let formIsValid = true; 

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



    modifyAccount(e){
        e.preventDefault();
        if(this.handleValidationAccount()){
            Axios.put("/users/"+this.state.fields.id, this.state.fields)
            toast.success('Account information successfully modified!', {position: toast.POSITION.TOP_CENTER})

            if(this.state.fields.username !== this.props.username){
                setTimeout(()=>{
                    window.localStorage.removeItem("token");
                    window.location.reload();
                },2000)
            }else{
                setTimeout(()=>{
                    this.props.history.push("/profile");
                },2000)
            }

            
            
         }
         
    }

    deleteAccount(e){

            Axios.delete("/users/"+this.state.fields.id)
            toast.success('Account deleted!', {position: toast.POSITION.TOP_CENTER})
            setTimeout(()=>{
                window.localStorage.removeItem("token");
                window.location.reload();
            },2000)   
    }

    render(){
        return(
            <div className="container">
            <div className="row">
                <div className="col s12 m3"></div>
                <div className="col s12 m6">
                <div className="card white">
                    <div className="card-content center black-text">
                    <h5>Edit account information</h5>
                    <form style={{"width":"80%", "margin":"auto", "marginTop": "2.5rem"}}>
                        <input className="inputBtn" 
                        type="text" 
                        name="username" 
                        placeholder="username"
                        onChange={(e) => {
                        this.handleChange("username", e);}}
                        onFocus={()=>{toast.warn('Modification of username demands reverification of your account through sign in', {position: toast.POSITION.TOP_CENTER})}}
                        value={this.state.fields.username}></input>
                        <p style={{color: "red"}}>{this.state.errors["username"]}</p>

                        <input className="inputBtn" 
                        type="text" 
                        name="email" 
                        placeholder="email"
                        onChange={(e) => {
                        this.handleChange("email", e);}}
                        value={this.state.fields.email}></input>
                        <p style={{color: "red"}}>{this.state.errors["email"]}</p>

                        <textarea className="inputBtn" 
                        name="description" 
                        placeholder="description"
                        onChange={(e) => {
                        this.handleChange("description", e);}}
                        value={this.state.fields.description}
                        style={{"marginTop": "1rem"}}></textarea>

                        <button className="btn-small blue darken-2 sbmtBtn" 
                        onClick={(e) => {this.modifyAccount(e)}} style={{"width":"100%", "marginTop": "2rem"}}>Save</button>
                    </form>
                        <div className="span-login">
                            <span>Need to change your password? Click <Link to="/password-change" className="login-link"> here</Link></span>
                            <button className="btn-small red darken-2 sbmtBtn" 
                        onClick={(e) => {this.deleteAccount(e)}} style={{"width":"80%", "marginTop": "2rem"}}>Delete account</button>
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

export default Account;