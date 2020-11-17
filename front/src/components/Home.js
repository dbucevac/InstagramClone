import React from 'react';
import PostItem from './PostItem';
import Axios from '../apis/Axios';

class Home extends React.Component {

  constructor(props) {
    super(props);

    this.state = { 
      username: this.props.username,
      loggedInUser: {},
      followingUsers:[],
      postsOfFollowingUsers:[]
    };
  }

  componentDidMount() {
    this.getLoggedInUser();
    
  }

  //#region API calls

getLoggedInUser(){
    Axios.get('/users/?username='+this.state.username)
        .then(res => {
            this.setState({loggedInUser: res.data[0]});
            this.getFollowingUsersPosts();
        })
        .catch(error => {
            console.log(error)
        })
}


getFollowingUsersPosts() {
    Axios.get('/users/' + this.state.loggedInUser.id + '/followings/posts')
        .then(res => {
            // handle success
            console.log(res);
            this.setState({postsOfFollowingUsers: res.data});
        })
        .catch(error => {
            // handle error
            console.log(error);
            alert('Error occured please try again!');
         });
}

  render() {
    console.log(this.state.postsOfFollowingUsers)
    return(     
      <div className="container">
      <div className="row">
        <div className="col s12">
        {this.state.postsOfFollowingUsers.map(post => (
                <PostItem key={post.id} caption={post.caption}
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