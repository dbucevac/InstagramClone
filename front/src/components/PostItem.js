import React from 'react';
import Axios from '../apis/Axios';
import {Link} from 'react-router-dom';
import noImage from "../resources/noImage.jpg"

class PostItem extends React.Component {

  constructor(props) {
    super(props);

    this.state = { 
      userId: this.props.userId,
      postId: this.props.postId,
      user: {},
      post:{},
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
            this.getPost()
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
          // handle success
          const file = new Blob([res.data]);
          const fileURL = URL.createObjectURL(file);

          this.setState({profileImageUrl: fileURL});
  
      })
      .catch(error => {
          // handle error
          console.log(error);
          //alert('Error occured please try again!');
       });
}

getPost(){
  Axios.get('/users/'+this.state.userId + '/posts/' + this.state.postId)
      .then(res => {
          this.setState({post: res.data});
      })
      .catch(error => {
          console.log(error)
      })
}




  render() {
    let profilePicture = this.state.profileImageUrl===null?noImage:this.state.profileImageUrl;
    return (
    <div className="post">
        <div className="card post-card">
            <h5 className="postHeader">
            <Link to="/userprofile" className="btn-floating blue accent-1 white-text profile-icon otherUserProfileIcon" title={this.state.user.username + " profile"}>
              <img className="otherUserProfileImage" src={profilePicture}></img>
            </Link>
            {this.state.user.username}</h5>
            <div className="card-image">
                <img src={this.props.image}/>
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
  }
}

export default PostItem;