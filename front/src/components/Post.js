import React from 'react';
import Axios from '../apis/Axios';
import {Link} from 'react-router-dom';
import noImage from "../resources/noImage.jpg";
import CommentItem from './CommentItem';

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
      numLikes: 0,
      comments:[],
      commentsWithUsers:[],
      commentSectionDisplayed:false,
      comment:''
    };

  }

  componentDidMount() {
    this.getUser();
    this.getLoggedInUser()
  }

  //get user by post id

getUser(){
  Axios.get('/users/post/' + this.state.postId)
  .then(res => {
    
      this.setState({user: res.data});
      this.getUsersPost()
      this.getProfilePicture()
  })
  .catch(error => {

      //console.log(error);
      //alert('Error occured please try again!');
   });
}

//get logged in user by username

getLoggedInUser(){
  Axios.get('/users/?username='+this.state.loggedInUsername)
      .then(res => {
          this.setState({loggedInUser: res.data[0]});
          
      })
      .catch(error => {
          //console.log(error)
      })
}

//get profile picture of the user

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

  //get the post of the user

getUsersPost() {
    Axios.get('/users/' + this.state.user.id + '/posts/' + this.state.postId)
        .then(res => {

            this.setState({post: res.data});
            this.getPostImage()
            this.getLikeList()
            this.getNumberOfLikes()
            this.getComments()
        })
        .catch(error => {

            //console.log(error);
            //alert('Error occured please try again!');
         });
}

//get image linked to the post

getPostImage(){

    Axios.get('/users/' + this.state.user.id + '/posts/' + this.state.postId + '/picture', {
    method: 'GET',
    responseType: 'blob' }).then(res => {

            const file = new Blob([res.data]);
            const fileURL = URL.createObjectURL(file);
 
            this.setState({postImageUrl: fileURL});
        })
        .catch(error => {

            //console.log(error);
            //alert('Error occured please try again!');
         });
}

//get likes linked to the post

getLikeList(){
  Axios.get('/users/'+this.state.user.id + '/posts/' + this.state.postId + '/likes')
      .then(res => {
          
        this.setState({likes:res.data})
        this.getStatusOfLiking()
      })
      .catch(error => {
          //console.log(error)
      })
}


//get information if the given post was liked by the logged in user

getStatusOfLiking(){

  this.state.likes.map(like =>{
    Axios.get('/users/like/' + like.id)
    .then(res => {

            if (this.state.loggedInUser.id === res.data.id) {
            this.setState({likedByLoggedInUser: true})
            }
        })
        .catch(error => {

            //console.log(error);
            //alert('Error occured please try again!');
         });

  })
}

//get total number of likes

getNumberOfLikes(){
  Axios.get('/users/'+this.state.user.id + '/posts/' + this.state.postId + '/likes')
      .then(res => {
          var data = res.data;
          var numLikes = data.length
          this.setState({numLikes: numLikes});
      })
      .catch(error => {
          //console.log(error)
      })
}

//method for liking and unliking the post as logged in user

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
      //console.log(error)
  })

}

//get comments of a post

getComments() {
  Axios.get('/users/' + +this.state.user.id + '/posts/' + this.state.postId + '/comments')
      .then(res => {

          this.setState({comments: res.data});
          this.getCommentsWithUsers()
      })
      .catch(error => {

          //console.log(error);
          //alert('Error occured please try again!');
       });
}

//method for getting user based on his comment and storing them together in the state

getCommentsWithUsers(){
  this.state.comments.map(comment =>{
  Axios.get('/users/comment/' + comment.id)
      .then(res => {
        
          this.setState({commentsWithUsers: this.state.commentsWithUsers.concat({commentId:comment.id, userId:res.data.id})});
      })
      .catch(error => {

          //console.log(error);
          //alert('Error occured please try again!');
       });
  })
}

//method for toggling the state of comment section

displayCommentSection(){
  if(this.state.commentsWithUsers.length>0){
    this.setState({commentSectionDisplayed: !this.state.commentSectionDisplayed})
  }
  
}

//setting the typed in value in the state of the concerned field

valueInputChange(event) {
  let control = event.target;

  let name = control.name;
  let value = control.value;

  let change = {};
  change[name] = value;
  this.setState(change);
}

//method for publishing a comment on a post as logged in user

sendComment(e){
  e.preventDefault();
  var txt = this.state.comment;
  var message = {message: txt};
  Axios.post('/users/' + +this.state.loggedInUser.id + '/posts/' + this.state.postId + '/comments', message)
  .then(res =>{
    this.setState({commentsWithUsers:this.state.commentsWithUsers.concat({commentId:res.data.id, userId:this.state.loggedInUser.id})})
    this.setState({comment: ''})
  })
  .catch(error=>{
    //console.log(error)
  })
}


  render() {
    let profilePicture = this.state.profileImageUrl===null?noImage:this.state.profileImageUrl;
    let profileLink = this.state.loggedInUsername===this.state.user.username?"/profile":"/users/"+this.state.user.id
    let liked = this.state.likedByLoggedInUser?"red":"lightGrey";
    let likes = this.state.numLikes > 0? this.state.numLikes + " Likes": " Likes"
    let commentSectionDisplayed = this.state.commentSectionDisplayed?"block":"none";
    let commentLabelDisplayed = this.state.commentSectionDisplayed?"Hide comments":"Comments";
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
                <h6 style={{"marginLeft": ".5rem", "color": "grey", "cursor":"pointer"}} onClick={()=>{this.displayCommentSection()}}>{commentLabelDisplayed}</h6>
                
                <div className="row" style={{"marginTop":"1rem"}}>
                  <form className="col s12" style={{"display":"flex", "padding":"0 0"}} onSubmit={(e)=>{this.sendComment(e)}}>
                      <textarea className="browser-default" style={{"width":"100%", "border": "1px solid lightGrey", "padding": ".5rem .5rem"}} 
                      name="comment" placeholder="Write a comment" 
                      onChange={(e) => {this.valueInputChange(e);}} value={this.state.comment}></textarea>
                      <input type="submit" value="Send" style={{"cursor":"pointer"}}></input>
                  </form>
                </div>
                
                <ul style={{"display":commentSectionDisplayed}} >
                  {this.state.commentsWithUsers.map(item => (
                        <li key={item.commentId}><CommentItem  userId={item.userId} commentId={item.commentId} loggedinUserId={this.state.loggedInUser.id} postId={this.state.post.id}
                        /></li>
                    ))}
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