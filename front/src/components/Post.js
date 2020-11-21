import React from 'react';
import Axios from '../apis/Axios';
import {Link} from 'react-router-dom';
import noImage from "../resources/noImage.jpg";

class Post extends React.Component {

    constructor(props) {
    super(props);

    this.state = { 
      loggedInUsername: this.props.username,
      loggedInUser:{},
      user: {},
      postId: this.props.match.params.id,
      post: {},
      profileImageUrl:null,
      postImageUrl:null,
      likedByLoggedInUser: false,
      likes: [],
      numLikes: 0
    };

  }

  componentDidMount() {
    this.getUser();
    this.getLoggedInUser()
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

getLoggedInUser(){
  Axios.get('/users/?username='+this.state.loggedInUsername)
      .then(res => {
          this.setState({loggedInUser: res.data[0]});
          console.log(res.data)
          this.getLikeList()
      })
      .catch(error => {
          console.log(error)
      })
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
            this.getLikeList()
            this.getNumberOfLikes()
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

getLikeList(){
  Axios.get('/users/'+this.state.user.id + '/posts/' + this.state.postId + '/likes')
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

            if (this.state.loggedInUser.id === res.data.id) {
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
  Axios.get('/users/'+this.state.user.id + '/posts/' + this.state.postId + '/likes')
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

    Axios.post('/users/' + this.state.loggedInUser.id + '/posts/' + this.state.postId + '/likes')
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



  render() {
    let profilePicture = this.state.profileImageUrl===null?noImage:this.state.profileImageUrl;
    let profileLink = this.state.loggedInUsername===this.state.user.username?"/profile":"/users/"+this.state.user.id
    let liked = this.state.likedByLoggedInUser?"red":"lightGrey";
    let likes = this.state.numLikes > 0? this.state.numLikes + " Likes": " Likes"
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
                <h6 style={{"verticalAlign":"center", "display": "flex", "marginLeft": ".5rem"}}><i className="small material-icons" style={{"color":liked, "cursor":"pointer"}} onClick={() => {this.likeUnlike()}}>favorite</i><span style={{"marginTop": ".4rem", "marginLeft": ".4rem"}}>{likes}</span></h6>
                <h6 className="postCaption">{this.state.post.caption}</h6>
                <h6>Comments</h6>
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