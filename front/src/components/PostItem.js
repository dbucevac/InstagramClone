import React from 'react';
import Axios from '../apis/Axios';
import {Link} from 'react-router-dom';

class PostItem extends React.Component {

  constructor(props) {
    super(props);

    this.state = { 
      userId: this.props.userId,
      postId: this.props.postId,
      user: {},
      post:{}
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
        })
        .catch(error => {
            console.log(error)
        })
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
    return (
    <div className="post">
        <div className="card post-card">
            <h5 className="postHeader">
            <Link to="/userprofile" className="btn-floating blue accent-1 white-text profile-icon otherUserProfileIcon" title={this.state.user.username + " profile"}>
              <img className="otherUserProfileImage" src="https://images.unsplash.com/photo-1510913415497-e34c432bd039?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"></img>
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