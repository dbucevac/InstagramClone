import React from 'react';
import Axios from '../apis/Axios';
import {Link} from 'react-router-dom';
import pictureUpload from "../resources/PictureUpload.jpg"

class Profile extends React.Component {

  constructor(props) {
    super(props);

    this.state = { 
      username: this.props.username,
      loggedInUser: {},
      posts:[],
      profileImageUrl:null,
      images:[],
      postsWithImage:[]

    };
  }

  componentDidMount() {
    this.getLoggedInUser();
    
  }


getLoggedInUser(){
    Axios.get('/users/?username='+this.state.username)
        .then(res => {
            this.setState({loggedInUser: res.data[0]});
            this.getLoggedInUsersPosts();
            this.getProfilePicture()
            
        })
        .catch(error => {
            console.log(error)
        })
}


getLoggedInUsersPosts() {
    Axios.get('/users/' + this.state.loggedInUser.id + '/posts')
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
    Axios.get('/users/' + this.state.loggedInUser.id + '/posts/' + post.id + '/picture', {
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

  Axios.get('/users/' + this.state.loggedInUser.id + '/picture', {
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
    let profilePicture = this.state.profileImageUrl===null?pictureUpload:this.state.profileImageUrl;
    return( 
    <div>  
      <div className="container">
        <div className="row">
        <div className="col s2"></div>
          <div className="col s3">
            <Link to="/uploadprofilepicture"><img className="profilePictureAvatar" src={profilePicture} alt={this.state.username}/></Link>
          </div>
          <div className="col s5 profileInfo">
          <h3>{this.state.username}
          <Link to="/account"><i className="small material-icons logo-icon" title="Edit Profile" style={{"verticalAlign":"text-top", "color": "grey"}}>edit</i></Link>
          </h3>
          <div className="profileStatistics">
            <h6>{this.state.posts.length} posts</h6>
            <Link to="/followers"><h6>500 followers</h6></Link>
            <Link to="/following"><h6>10 following</h6></Link>
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
          <img key={post.postId} src={post.imgUrl} className="galleryItem" alt={this.state.username + " picture"} onClick={() => this.goToPostImage(post.postId)}/>
        ))}
      </div>
    </div>
      
    
    )
  }
}

export default Profile;