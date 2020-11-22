import React from 'react';
import Axios from '../apis/Axios';
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

class UploadFile extends React.Component {

    constructor(props) {
        super(props);

        this.state = { 
        username: this.props.username,
        loggedInUser: {},
        selectedFile: null,
        errors:{file:''}
        };
        toast.configure()
    }

    componentDidMount() {
        this.getLoggedInUser();
        
    }

    //setting the selected file value in the state of the concerned field

    onFileChange = event => { 
        
        this.setState({ selectedFile: event.target.files[0] }); 
        
    }; 

    //setting the typed in value in the state of the concerned field

    valueInputChange(event) {
        let control = event.target;

        let name = control.name;
        let value = control.value;

        let change = {};
        change[name] = value;
        this.setState(change);
    }

    //get logged in user by username

    getLoggedInUser(){
        Axios.get('/users/?username='+this.state.username)
            .then(res => {
                this.setState({loggedInUser: res.data[0]});
            })
            .catch(error => {
                //console.log(error)
        })
    }

    //method for handling file validation which sets the state of error message based on the uploaded file


    handleValidation(){
        let file = this.state.selectedFile;
        let errors = {};
        let formIsValid = true;
        let validFileFormats = ["image/png", "image/jpeg", "image/gif"]

        if(file === null){
            formIsValid = false;
            errors["file"] = "No picture selected";
         }
         if(file !== null){
            if(file.size>2000000){
                formIsValid = false;
                errors["file"] = "Picture is too big (2MB max)"
            }
         }
         if(file !== null){
            if(!validFileFormats.includes(file.type)){
                formIsValid = false;
                errors["file"] = "Only the following file formats are supported: PNG, JPEG, GIF"
            }
         }
        
        this.setState({errors: errors});
        return formIsValid;
        
    }

    //profile picture upload

    onFileUpload = (e) => { 
        e.preventDefault()
        if(this.handleValidation()){
        
        const file = new FormData(); 
        
        file.append(
        "file",
        this.state.selectedFile
        )

        var userId = this.state.loggedInUser.id;
            
        Axios.post("/users/" + userId + "/picture", file);
        toast.success('Your profile picture is uploaded!', {position: toast.POSITION.TOP_CENTER})
        setTimeout(()=>{
            this.props.history.push('/')
        },2000)

        }

    }; 

  render() {
      
    return(     
        <div className="container">
        <div className="row">
            <div className="col s12 m3"></div>
            <div className="col s12 m6">
            <div className="card white file-upload-card">
                <div className="card-content center black-text">
                <h4 className="center">Set your profile picture</h4>
                <form>
                        <p style={{color: "red"}}>{this.state.errors["file"]}</p>
                        <input className="file-field" 
                        type="file" 
                        name="file" 
                        onChange={this.onFileChange}></input>

                    <button className="btn-small blue darken-2 sbmtBtn" 
                    onClick={(e)=>{this.onFileUpload(e);}}>Upload</button>
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

export default UploadFile;