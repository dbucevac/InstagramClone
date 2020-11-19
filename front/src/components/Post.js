import React from 'react';
import Axios from '../apis/Axios';
import {Link} from 'react-router-dom';
import noImage from "../resources/noImage.jpg";

class Post extends React.Component {

    constructor(props) {
    super(props);

    this.state = { 
      loggedInUsername: this.props.username,
      user: {},
      postId: this.props.match.params.id,
      post: {},
      profileImageUrl:null,
      postImageUrl:null
    };

  }

  componentDidMount() {
    this.getUser();
    
  }

getUser(){
  Axios.get('/users/post/' + this.state.postId)
  .then(res => {
    
      this.setState({user: res.data});
      this.getUsersPost()
      this.getProfilePicture()
  })
  .catch(error => {

      console.log(error);
      //alert('Error occured please try again!');
   });
}

getProfilePicture(){

    Axios.get('/users/' + this.state.user.id + '/picture', {
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

getUsersPost() {
    Axios.get('/users/' + this.state.user.id + '/posts/' + this.state.postId)
        .then(res => {

            this.setState({post: res.data});
            this.getPostImage()
        })
        .catch(error => {

            console.log(error);
            //alert('Error occured please try again!');
         });
}

getPostImage(){

    Axios.get('/users/' + this.state.user.id + '/posts/' + this.state.postId + '/picture', {
    method: 'GET',
    responseType: 'blob' }).then(res => {

            const file = new Blob([res.data]);
            const fileURL = URL.createObjectURL(file);
 
            this.setState({postImageUrl: fileURL});
        })
        .catch(error => {

            console.log(error);
            //alert('Error occured please try again!');
         });
}



  render() {
    let profilePicture = this.state.profileImageUrl===null?noImage:this.state.profileImageUrl;
    let profileLink = this.state.loggedInUsername===this.state.user.username?"/profile":"/users/"+this.state.user.id
    if(this.state.post.id !== undefined){
      return (    
        <div className="post">
            <div className="card post-card">
                <h5 className="postHeader">
                <Link to={profileLink} className="btn-floating blue accent-1 white-text profile-icon otherUserProfileIcon" title={this.state.user.username + " profile"}>
                  <img className="otherUserProfileImage" src={profilePicture}></img>
                </Link>
                {this.state.user.username}
                </h5>
                <div className="card-image">
                    <img src={this.state.postImageUrl} alt={this.state.user.username + " picture"}/>
                </div> 
                <h6 style={{"verticalAlign":"center"}}><i className="small material-icons" style={{"color":"red"}}>favorite</i>569 Likes</h6>
                <h6 className="postCaption">{this.state.post.caption}</h6>
                <h6>messages</h6>
                <ul>
                    <li>Provera</li>
                </ul>
            </div>
        </div>
      )
    }else{
      
        return null
    }
    
  }
}

export default Post;