import React from 'react';
import PostItem from './PostItem';
import Axios from '../apis/Axios';

class Home extends React.Component {

  constructor(props) {
    super(props);

    this.state = { 
      username: this.props.username,
      loggedInUser: {},
      postsOfFollowingUsers:[],
      usersWithPosts:[],
      postsOfFollowingUsersWithImage:[]
    };
  }

  componentDidMount() {
    this.getLoggedInUser();
    
  }

getLoggedInUser(){
    Axios.get('/users/?username='+this.state.username)
        .then(res => {
            this.setState({loggedInUser: res.data[0]});
            this.getFollowingUsersPosts()
        })
        .catch(error => {
            console.log(error)
        })
}

getFollowingUsersPosts() {
  Axios.get('/users/' + this.state.loggedInUser.id + '/followings/posts')
      .then(res => {

          this.setState({postsOfFollowingUsers: res.data});
          this.getFollowingUsers()
      })
      .catch(error => {

          console.log(error);
          //alert('Error occured please try again!');
       });
}

getFollowingUsers(){
  this.state.postsOfFollowingUsers.map(post =>{
  Axios.get('/users/post/' + post.id)
      .then(res => {
        
          this.setState({usersWithPosts: this.state.usersWithPosts.concat({postId:post.id, userId:res.data.id})});
          this.getFollowingUsersPostsWithImage()
      })
      .catch(error => {

          console.log(error);
          //alert('Error occured please try again!');
       });
  })
}

getFollowingUsersPostsWithImage(){

  this.state.usersWithPosts.map(post =>{
    Axios.get('/users/' + post.userId + '/posts/' + post.postId + '/picture', {
    method: 'GET',
    responseType: 'blob' }).then(res => {

            const file = new Blob([res.data]);
            const fileURL = URL.createObjectURL(file);

            if (!this.state.postsOfFollowingUsersWithImage.some(p=>p.postId === post.postId)) {
            this.setState({postsOfFollowingUsersWithImage: this.state.postsOfFollowingUsersWithImage.concat({postId:post.postId, imgUrl:fileURL, userId:post.userId })});
            }
        })
        .catch(error => {

            console.log(error);
            //alert('Error occured please try again!');
         });

  })
}

  render() {

    return(     
      <div className="container">
      <div className="row">
        <div className="col s12">  
       {this.state.postsOfFollowingUsersWithImage.map(post => (
                <PostItem key={post.postId} userId={post.userId} postId={post.postId} image={post.imgUrl}
                />
            ))}
        </div>
      </div>
      <div className="row">
        <div className="col s12">
        </div>
      </div>
        
      </div>
    )
  }
}

export default Home;