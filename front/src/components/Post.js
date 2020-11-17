import React from 'react';
import Axios from '../apis/Axios';

class Post extends React.Component {

    constructor(props) {
    super(props);

    this.state = { 
      username: this.props.username,
      loggedInUser: {},
      postId: this.props.match.params.id,
      post: {},
      profileImageUrl:null,
    };
  }

  componentDidMount() {
    this.getLoggedInUser();
    
  }

getLoggedInUser(){
    Axios.get('/users/?username='+this.state.username)
        .then(res => {
            this.setState({loggedInUser: res.data[0]});
            this.getLoggedInUsersPost();
        })
        .catch(error => {
            console.log(error)
        })
}


getLoggedInUsersPost() {
    Axios.get('/users/' + this.state.loggedInUser.id + '/posts/' + this.state.postId)
        .then(res => {
            // handle success
            this.setState({post: res.data});
            this.getPostImage()
        })
        .catch(error => {
            // handle error
            //console.log(error);
            //alert('Error occured please try again!');
         });
}

getPostImage(){

    Axios.get('/users/' + this.state.loggedInUser.id + '/posts/' + this.state.postId + '/picture', {
    method: 'GET',
    responseType: 'blob' }).then(res => {
            // handle success
            const file = new Blob([res.data]);
            const fileURL = URL.createObjectURL(file);
 
            this.setState({profileImageUrl: fileURL});
        })
        .catch(error => {
            // handle error
            //console.log(error);
            //alert('Error occured please try again!');
         });
}

  render() {
    return (
    <div className="post">
        <div className="card post-card">
            <h5>{this.state.username}</h5>
            <div className="card-image">
                <img src={this.state.profileImageUrl} alt={this.state.username + " picture"}/>
            </div>
            
            <h6 style={{"verticalAlign":"center"}}><i className="small material-icons" style={{"color":"red"}}>favorite</i>569 Likes</h6>
            <h6>{this.state.post.caption}</h6>
            <h6>messages</h6>
            <ul>
                <li>Provera</li>
            </ul>
        </div>
    </div>
    )
  }
}

export default Post;