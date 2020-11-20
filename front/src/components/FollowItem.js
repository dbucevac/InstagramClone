import React from 'react';
import Axios from '../apis/Axios';
import {Link} from 'react-router-dom';
import noImage from "../resources/noImage.jpg";

class FollowItem extends React.Component {

  constructor(props) {
    super(props);

    this.state = { 
      loggedInUserId: this.props.loggedinUserId,
      userId: this.props.userId,
      user:{},
      profileImageUrl:null
    };
  }

  componentDidMount() {
    this.getUser();
      
  }

  getUser(){
    Axios.get('/users/'+this.state.userId)
        .then(res => {
            this.setState({user: res.data});
            this.getProfilePicture()
        })
        .catch(error => {
            console.log(error)
        })
    }

    getProfilePicture(){

    Axios.get('/users/' + this.state.userId + '/picture', {
    method: 'GET',
    responseType: 'blob' }).then(res => {

            const file = new Blob([res.data]);
            const fileURL = URL.createObjectURL(file);

            this.setState({profileImageUrl: fileURL});
    
        })
        .catch(error => {

            console.log(error);
            //alert('Error occured please try again!');
        });
    }

  render() {
    let profilePicture = this.state.profileImageUrl===null?noImage:this.state.profileImageUrl;
    let linkToProfile = this.state.userId===this.state.loggedInUserId?"/profile":"/users/" + this.state.user.id
    if(this.state.user.id !== undefined){
        return(
            <div className="followItem">
                <Link to={linkToProfile}>
                    <img className="profilePictureAvatar" src={profilePicture} alt={this.state.user.username}/>
                </Link>
                <h5 style={{"textAlign":"center"}}>{this.state.user.username}</h5>
            </div>
           
        )
    }else{
        return null
    }
  }
}

export default FollowItem;