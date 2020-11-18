import React from 'react';
import Axios from '../apis/Axios';
import {Link} from 'react-router-dom';
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
        })
        .catch(error => {
            console.log(error)
        })
}


getLoggedInUsersPosts() {
    Axios.get('/users/' + this.state.loggedInUser.id + '/posts')
        .then(res => {
            // handle success
            this.setState({posts: res.data});
            this.getPostImages()
        })
        .catch(error => {
            // handle error
            console.log(error);
            //alert('Error occured please try again!');
         });
}

getPostImages(){

  this.state.posts.map(post =>{
    Axios.get('/users/' + this.state.loggedInUser.id + '/posts/' + post.id + '/picture', {
    method: 'GET',
    responseType: 'blob' }).then(res => {
            // handle success
            const file = new Blob([res.data]);
            const fileURL = URL.createObjectURL(file);
 
            this.setState({images: this.state.images.concat(fileURL)});
            this.setState({postsWithImage: this.state.postsWithImage.concat({postId:post.id, imgUrl:fileURL})});
        })
        .catch(error => {
            // handle error
            console.log(error);
            //alert('Error occured please try again!');
         });

  })
}

goToPostImage(postId) {
    this.props.history.push("/posts/" + postId);
  }

  render() {

    return( 
    <div>  
      <div className="container">
        <div className="row bla">
        <div className="col s2"></div>
          <div className="col s3">
            <Link to="/uploadprofilepicture"><img className="profilePictureAvatar" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"/></Link>
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
          {console.log(this.state.postsWithImage)}
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