import React from 'react';
import Post from './Post';
import Axios from '../apis/Axios';

class Profile extends React.Component {

  constructor(props) {
    super(props);

    this.state = { 
      username: this.props.username,
      loggedInUser: {},
      posts:[],
      image:null
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
            console.log(res);
            this.setState({posts: res.data});
            this.getImage()
        })
        .catch(error => {
            // handle error
            console.log(error);
            alert('Error occured please try again!');
         });
}

getImage() {
    Axios.get('/users/' + this.state.loggedInUser.id + '/posts/' + 6 + '/picture')
        .then(res => {
            // handle success
            console.log(res);
            this.setState({image: res.data});
        })
        .catch(error => {
            // handle error
            console.log(error);
            alert('Error occured please try again!');
         });
}

handle

  render() {

    return(     
      <div className="container">
      <div className="row">
        <div className="col s12">
        
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

export default Profile;