import React from 'react';
import Axios from '../apis/Axios';
import {Link} from 'react-router-dom';
import noImage from "../resources/noImage.jpg";

class CommentItem extends React.Component {

  constructor(props) {
    super(props);

    this.state = { 
      loggedInUserId: this.props.loggedinUserId,
      userId: this.props.userId,
      user:{},
      profileImageUrl:null,
      commentId: this.props.commentId,
      comment: {},
      postId: this.props.postId
    };
  }

  componentDidMount() {
    this.getUser();
      
  }

  //get user by id

  getUser(){
    Axios.get('/users/'+this.state.userId)
        .then(res => {
            this.setState({user: res.data});
            this.getComment()
            this.getProfilePicture()
            
        })
        .catch(error => {
            //console.log(error)
        })
    }

    //get users profile picture

    getProfilePicture(){

    Axios.get('/users/' + this.state.user.id + '/picture', {
    method: 'GET',
    responseType: 'blob' }).then(res => {

            const file = new Blob([res.data]);
            const fileURL = URL.createObjectURL(file);

            this.setState({profileImageUrl: fileURL});
    
        })
        .catch(error => {

            //console.log(error);
            //alert('Error occured please try again!');
        });
    }

    //get comment of concerned post

    getComment(){
        Axios.get('/users/'+this.state.user.id + '/posts/' + this.state.postId + '/comments/' + this.state.commentId)
            .then(res => {
                this.setState({comment: res.data});
            })
            .catch(error => {
                //console.log(error)
            })
        }

  render() {
    let profilePicture = this.state.profileImageUrl===null?noImage:this.state.profileImageUrl;
    let linkToProfile = this.state.userId===this.state.loggedInUserId?"/profile":"/users/" + this.state.user.id
    if(this.state.user.id !== undefined){
        return(
            <div style={{"display":"flex", "marginTop":".3rem","paddingBottom":".8rem","marginLeft":".5rem"}}>
                <Link to={linkToProfile} className="btn-floating blue accent-1 white-text profile-icon otherUserProfileIcon" title={this.state.user.username + " profile"}
            >
              <img className="otherUserProfileImage" src={profilePicture} alt={this.state.user.username}></img>
            </Link>
                <h6 style={{"textAlign":"center", "fontWeight":"bold", "marginRight":".5rem"}}>{this.state.user.username}</h6>
                <h6 style={{"width":"80%"}}>{this.state.comment.message}</h6>
            </div>
           
        )
    }else{
        return null
    }
  }
}

export default CommentItem;