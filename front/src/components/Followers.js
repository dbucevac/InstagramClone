import React from 'react';
import Axios from '../apis/Axios';
import FollowItem from './FollowItem';

class Followers extends React.Component {

  constructor(props) {
    super(props);

    this.state = { 
      loggedInUsername: this.props.username,
      loggedInUser: {},
      userId: this.props.match.params.id,
      followers:[],
    };
  }

  componentDidMount() {
    this.getLoggedInUser();
    this.getFollowers()
    
  }

  getLoggedInUser(){
    Axios.get('/users/?username='+this.state.loggedInUsername)
        .then(res => {
            this.setState({loggedInUser: res.data[0]});
            

            
        })
        .catch(error => {
            console.log(error)
        })
}

  getFollowers(){
    Axios.get('/users/'+this.state.userId + '/followers')
        .then(res => {
            this.setState({followers: res.data})
        })
        .catch(error => {
            console.log(error)
        })
  }

  render() {   
   return(
     <div>
     <div className="container">
            <div className="row">
            <div className="col s3"></div>
              <div className="col s6">
                <h3 className="center">Followers</h3>
              </div>       
            <div className="col s3"></div>
      </div>      
      </div>
      <div className="followList">
        {this.state.followers.map(follower=>(
           <FollowItem userId={follower.id} loggedinUserId={this.state.loggedInUser.id}/>
        ))}
      </div>   
     </div>
    
    ) 
  
  
    
  }
}

export default Followers;