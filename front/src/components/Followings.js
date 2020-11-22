import React from 'react';
import Axios from '../apis/Axios';
import FollowItem from './FollowItem';

class Followings extends React.Component {

  constructor(props) {
    super(props);

    this.state = { 
      loggedInUsername: this.props.username,
      loggedInUser: {},
      userId: this.props.match.params.id,
      followings:[],
    };
  }

  componentDidMount() {
    this.getLoggedInUser();
    this.getFollowings()
    
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

  //get users followings

  getFollowings(){
    Axios.get('/users/'+this.state.userId + '/followings')
        .then(res => {
            this.setState({followings: res.data})
        })
        .catch(error => {
            //console.log(error)
        })
  }

  render() {   
   return(
     <div>
     <div className="container">
            <div className="row">
            <div className="col s3"></div>
              <div className="col s6">
                <h3 className="center">Following</h3>
              </div>       
            <div className="col s3"></div>
      </div>      
      </div>
      <div className="followList">
        {this.state.followings.map(following=>(
           <FollowItem key={following.id} userId={following.id} loggedinUserId={this.state.loggedInUser.id}/>
        ))}
      </div>   
     </div>
    
    ) 
    
  }
}

export default Followings;