import React from 'react';
import Axios from '../apis/Axios';
import noImage from "../resources/noImage.jpg";

class OtherUserProfile extends React.Component {

  constructor(props) {
    super(props);

    this.state = { 
      loggedInUsername: this.props.username,
      loggedInUser:{},
      userId: this.props.match.params.id,
      user: {},
      posts:[],
      profileImageUrl:null,
      images:[],
      postsWithImage:[],
      followedByLoggedInUser: false
    };
  }

  componentDidMount() {
    this.getUser();
    this.getLoggedInUser();
    
  }


getUser(){
    Axios.get('/users/'+this.state.userId)
        .then(res => {
            //console.log(res.data)
            this.setState({user: res.data});
            this.getUsersPosts();
            this.getProfilePicture()
            
        })
        .catch(error => {
            console.log(error)
        })
}


getUsersPosts() {
    Axios.get('/users/' + this.state.user.id + '/posts')
        .then(res => {

            this.setState({posts: res.data});
            this.getPostImages()
        })
        .catch(error => {

            console.log(error);
            //alert('Error occured please try again!');
         });
}

getPostImages(){

  this.state.posts.map(post =>{
    Axios.get('/users/' + this.state.user.id + '/posts/' + post.id + '/picture', {
    method: 'GET',
    responseType: 'blob' }).then(res => {

            const file = new Blob([res.data]);
            const fileURL = URL.createObjectURL(file);
 
            this.setState({images: this.state.images.concat(fileURL)});
            this.setState({postsWithImage: this.state.postsWithImage.concat({postId:post.id, imgUrl:fileURL})});
        })
        .catch(error => {

            console.log(error);
            //alert('Error occured please try again!');
         });

  })
}

getLoggedInUser(){
  Axios.get('/users/?username='+this.state.loggedInUsername)
      .then(res => {
          this.setState({loggedInUser: res.data[0]});
          console.log(res.data)
          this.getStatusOfFollowing()
      })
      .catch(error => {
          console.log(error)
      })
}

getStatusOfFollowing(){
  Axios.get('/users/'+this.state.loggedInUser.id + '/followings')
      .then(res => {

          var followings = res.data;
          followings.map(follow =>{
            if(follow.id === this.state.user.id){
              this.setState({followedByLoggedInUser:true})
            }
          })
          
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

followUnfollow(){
  Axios.post('/users/' + this.state.loggedInUser.id + '/follow/' + this.state.user.id)
  .then(
    this.setState({followedByLoggedInUser: !this.state.followedByLoggedInUser})
  )
  .catch(error => {
    console.log(error)
})
}






goToPostImage(postId) {
    this.props.history.push("/posts/" + postId);
  }

  render() {
    let profilePicture = this.state.profileImageUrl===null?noImage:this.state.profileImageUrl;
    let followStatus = this.state.followedByLoggedInUser?<button className="waves-effect btn-small grey darken-1" style={{"marginLeft": "2rem"}} onClick={() => {this.followUnfollow()}}>Unfollow</button>:
    <button className="waves-effect btn-small blue darken-1" style={{"marginLeft": "2rem"}} onClick={() => {this.followUnfollow()}}>Follow</button>
    if(this.state.user.username !==this.state.loggedInUsername && this.state.user.id !== undefined){
      return( 
        <div>  
          <div className="container">
            <div className="row">
            <div className="col s2"></div>
              <div className="col s3">
                <img className="profilePictureAvatar" src={profilePicture} alt={this.state.user.username}/>
              </div>
              <div className="col s5 profileInfo">
              <h3>{this.state.user.username}
              {followStatus}
              </h3>
              <div className="profileStatistics">
                <h6>{this.state.posts.length} posts</h6>
                <h6>500 followers</h6>
                <h6>10 following</h6>
              </div>
              <div>
              <h6>Fuck you! Pobedicemo!</h6>
              </div>
              </div>
              <div className="col s2"></div>
            </div>
          </div>
          <div className="gallery">
          {console.log(this.state.followedByLoggedInUser)}
            {this.state.postsWithImage.map(post=>(
              <img key={post.postId} src={post.imgUrl} className="galleryItem" alt={this.state.user.username + " picture"} onClick={() => this.goToPostImage(post.postId)}/>
            ))}
          </div>
        </div>  
      )
    }else{
      return null
    }
    
  }
}

export default OtherUserProfile;