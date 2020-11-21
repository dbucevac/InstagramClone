import React from 'react';
import Axios from '../apis/Axios';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import noImage from "../resources/noImage.jpg"

class PostItem extends React.Component {

  constructor(props) {
    super(props);

    this.state = { 
      loggedInUserId: this.props.loggedinUserId,
      userId: this.props.userId,
      postId: this.props.postId,
      user: {},
      post:{},
      profileImageUrl:null,
      likedByLoggedInUser: false,
      likes: [],
      numLikes: 0

    };
    this.goToOtherUserProfile = this.goToOtherUserProfile.bind(this);
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

          const file = new Blob([res.data]);
          const fileURL = URL.createObjectURL(file);

          this.setState({profileImageUrl: fileURL});
  
      })
      .catch(error => {

          console.log(error);
          //alert('Error occured please try again!');
       });
}

getPost(){
  Axios.get('/users/'+this.state.userId + '/posts/' + this.state.postId)
      .then(res => {
          this.setState({post: res.data});
          this.getLikeList()
          this.getNumberOfLikes()
      })
      .catch(error => {
          console.log(error)
      })
}

getLikeList(){
  Axios.get('/users/'+this.state.userId + '/posts/' + this.state.postId + '/likes')
      .then(res => {
          
        this.setState({likes:res.data})
        this.getStatusOfLiking()
      })
      .catch(error => {
          console.log(error)
      })
}

getStatusOfLiking(){

  this.state.likes.map(like =>{
    Axios.get('/users/like/' + like.id)
    .then(res => {

            if (this.state.loggedInUserId === res.data.id) {
            this.setState({likedByLoggedInUser: true})
            }
        })
        .catch(error => {

            console.log(error);
            //alert('Error occured please try again!');
         });

  })
}

getNumberOfLikes(){
  Axios.get('/users/'+this.state.userId + '/posts/' + this.state.postId + '/likes')
      .then(res => {
          var data = res.data;
          var numLikes = data.length
          this.setState({numLikes: numLikes});
      })
      .catch(error => {
          console.log(error)
      })
}

likeUnlike(){

    Axios.post('/users/' + this.state.loggedInUserId + '/posts/' + this.state.postId + '/likes')
    .then(res =>{

      this.setState({likedByLoggedInUser: !this.state.likedByLoggedInUser})
      if(this.state.likedByLoggedInUser){
        this.setState(prevState =>({numLikes: prevState.numLikes +1}))
      }else{
        this.setState(prevState =>({numLikes: prevState.numLikes -1}))
      }         

    })
    .catch(error => {
      console.log(error)
  })

}

goToOtherUserProfile(userId) {
  console.log()
  this.props.history.push("/users/" + userId);
}


  render() {
    let profilePicture = this.state.profileImageUrl===null?noImage:this.state.profileImageUrl;
    let liked = this.state.likedByLoggedInUser?"red":"lightGrey";
    let likes = this.state.numLikes > 0? this.state.numLikes + " Likes": " Likes"
    return (
    <div className="post">
        <div className="card post-card">
            <h5 className="postHeader">
            <Link to={"/users/" + this.state.userId} className="btn-floating blue accent-1 white-text profile-icon otherUserProfileIcon" title={this.state.user.username + " profile"}
            onClick={() => this.goToOtherUserProfile(this.state.user.id)}>
              <img className="otherUserProfileImage" src={profilePicture} alt={this.state.user.username}></img>
            </Link>
            {this.state.user.username}</h5>
            <div className="card-image">
                <img src={this.props.image} alt={this.state.user.username}/>
            </div>
            
            <h6 style={{"verticalAlign":"center", "display": "flex", "marginLeft": ".5rem"}}><i className="small material-icons" style={{"color":liked, "cursor":"pointer"}} onClick={() => {this.likeUnlike()}}>favorite</i><span style={{"marginTop": ".4rem", "marginLeft": ".4rem"}}>{likes}</span></h6>
            <h6 className="postCaption">{this.state.post.caption}</h6>
            <h6>Comments</h6>
            <ul>
                <li>Provera</li>
            </ul>
        </div>
    </div>
    )
  }
}

export default withRouter(PostItem);