import React from 'react';
import Axios from '../apis/Axios';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import noImage from "../resources/noImage.jpg";
import CommentItem from './CommentItem';

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
      numLikes: 0,
      comments:[],
      commentsWithUsers:[],
      commentSectionDisplayed:false,
      comment:''
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
          this.getComments()
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

getComments() {
  Axios.get('/users/' + +this.state.userId + '/posts/' + this.state.postId + '/comments')
      .then(res => {

          this.setState({comments: res.data});
          this.getCommentsWithUsers()
      })
      .catch(error => {

          console.log(error);
          //alert('Error occured please try again!');
       });
}

getCommentsWithUsers(){
  this.state.comments.map(comment =>{
  Axios.get('/users/comment/' + comment.id)
      .then(res => {
        
          this.setState({commentsWithUsers: this.state.commentsWithUsers.concat({commentId:comment.id, userId:res.data.id})});
      })
      .catch(error => {

          console.log(error);
          //alert('Error occured please try again!');
       });
  })
}

displayCommentSection(){
  if(this.state.comments.length>0){
    this.setState({commentSectionDisplayed: !this.state.commentSectionDisplayed})
  }
  
}

valueInputChange(event) {
  let control = event.target;

  let name = control.name;
  let value = control.value;

  let change = {};
  change[name] = value;
  this.setState(change);
}

sendComment(e){
  e.preventDefault();
  var txt = this.state.comment;
  var message = {message: txt};
  Axios.post('/users/' + +this.state.loggedInUserId + '/posts/' + this.state.postId + '/comments', message)
  .then(res =>{
    this.setState({comments:this.state.comments.concat(res.data)})

  })
  .catch(error=>{
    console.log(error)
  })
}

  render() {
    let profilePicture = this.state.profileImageUrl===null?noImage:this.state.profileImageUrl;
    let liked = this.state.likedByLoggedInUser?"red":"lightGrey";
    let likes = this.state.numLikes > 0? this.state.numLikes + " Likes": " Likes";
    let commentSectionDisplayed = this.state.commentSectionDisplayed?"block":"none";
    let commentLabelDisplayed = this.state.commentSectionDisplayed?"Hide comments":"Comments";
    return (
    <div className="post">
        <div className="card post-card">
            <h5 className="postHeader">
            <Link to={"/users/" + this.state.userId} className="btn-floating blue accent-1 white-text profile-icon otherUserProfileIcon" title={this.state.user.username + " profile"}
            >
              <img className="otherUserProfileImage" src={profilePicture} alt={this.state.user.username}></img>
            </Link>
            {this.state.user.username}</h5>
            <div className="card-image">
                <img src={this.props.image} alt={this.state.user.username}/>
            </div>
            
            <h6 style={{"verticalAlign":"center", "display": "flex", "marginLeft": ".5rem"}}><i className="small material-icons" style={{"color":liked, "cursor":"pointer"}} onClick={() => {this.likeUnlike()}}>favorite</i><span style={{"marginTop": ".4rem", "marginLeft": ".4rem"}}>{likes}</span></h6>
            <h6 className="postCaption">{this.state.post.caption}</h6>
            <h6 style={{"marginLeft": ".5rem", "color": "grey", "cursor":"pointer"}} onClick={()=>{this.displayCommentSection()}}>{commentLabelDisplayed}</h6>
            
            <div class="row" style={{"marginTop":"1rem"}}>
              <form class="col s12" style={{"display":"flex"}} onSubmit={(e)=>{this.sendComment(e)}}>
                  <textarea className="browser-default" style={{"width":"100%", "border": "1px solid lightGrey", "padding": ".5rem .5rem"}} 
                  name="comment" placeholder="Write a comment" 
                  onChange={(e) => {this.valueInputChange(e);}}></textarea>
                  <input type="submit" value="Send" style={{"cursor":"pointer"}}></input>
                  {/*<i className="small material-icons" style={{"cursor":"pointer", "marginTop":".5rem"}} title="Send" onClick={()=>{this.sendComment()}}>send</i>*/}
              </form>
            </div>

            <ul style={{"display":commentSectionDisplayed}} >
            {this.state.commentsWithUsers.map(item => (
                  <li><CommentItem key={item.commentId} userId={item.userId} commentId={item.commentId} loggedinUserId={this.state.loggedInUserId} postId={this.state.post.id}
                  /></li>
              ))}
            </ul>
        </div>
    </div>
    )
  }
}

export default withRouter(PostItem);