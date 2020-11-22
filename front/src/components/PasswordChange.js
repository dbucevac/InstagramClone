import React from 'react';
import Axios from '../apis/Axios';
import {Link} from "react-router-dom";
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
class PasswordChange extends React.Component{
    constructor(props){
        super(props);

        this.state = { loggedInUsername: this.props.username, loggedInUser:{}, fields:{password: "", passwordConfirm: ""}, errors:{password:'', passwordConfirm:''}};
        toast.configure()
    }

    componentDidMount(){
      this.getLoggedInUser()
      
    }

    getLoggedInUser(){
      Axios.get('/users/?username='+this.state.loggedInUsername)
          .then(res => {
              this.setState({loggedInUser:res.data[0]})
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



    changePassword(e){
        e.preventDefault();
        if(this.handleValidationPasswordChange()){
            Axios.put("/users/"+this.state.loggedInUser.id + "?chpass", this.state.fields)
            toast.success('Password successfully changed!', {position: toast.POSITION.TOP_CENTER})

            setTimeout(()=>{
                    this.props.history.push("/profile");
                },2000)  
            
         }
         
    }


    render(){
        return(
            <div className="container">
            <div className="row">
                <div className="col s12 m3"></div>
                <div className="col s12 m6">
                <div className="card white">
                    <div className="card-content center black-text">
                    <h5>Change password</h5>
                    <form style={{"width":"80%", "margin":"auto", "marginTop": "2.5rem"}}>
                        
                        <input className="inputBtn"
                         type="password" 
                         name="password" 
                         placeholder="new password"
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
                        onClick={(e) => {this.changePassword(e)}} style={{"width":"100%", "marginTop": "2rem"}}>Save</button>
                    </form>
                    </div>
                </div>
                </div>
                <div className="col s12 m3"></div>
            </div>
        
      </div>
        )
    }
}

export default PasswordChange;