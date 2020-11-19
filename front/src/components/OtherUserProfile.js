import React from 'react';
import Axios from '../apis/Axios';
import noImage from "../resources/noImage.jpg";

class OtherUserProfile extends React.Component {

  constructor(props) {
    super(props);

    this.state = { 
      loggedInUsername: this.props.username,
      userId: this.props.match.params.id,
      user: {},
      posts:[],
      profileImageUrl:null,
      images:[],
      postsWithImage:[]

    };
  }

  componentDidMount() {
    this.getUser();
    
  }


getUser(){
    Axios.get('/users/'+this.state.userId)
        .then(res => {
            console.log(res.data)
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


goToPostImage(postId) {
    this.props.history.push("/posts/" + postId);
  }

  render() {
    let profilePicture = this.state.profileImageUrl===null?noImage:this.state.profileImageUrl;
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
              <i className="small material-icons logo-icon" title="Follow" style={{"verticalAlign":"text-top", "color": "grey"}}>add</i>
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