import React from 'react';
import Axios from '../apis/Axios';
import FollowItem from './FollowItem';

class Suggestions extends React.Component {

  constructor(props) {
    super(props);

    this.state = { 
      loggedInUsername: this.props.username,
      loggedInUser: {},
      suggestions:[],
    };
  }

  componentDidMount() {
    this.getLoggedInUser();
    
  }

  //get logged in user by username

  getLoggedInUser(){
    Axios.get('/users/?username='+this.state.loggedInUsername)
        .then(res => {
            this.setState({loggedInUser: res.data[0]});
            this.getSuggestions()
       
        })
        .catch(error => {
            //console.log(error)
        })
}

  //get suggested members to follow for logged in user

    getSuggestions(){
    Axios.get('/users/'+this.state.loggedInUser.id + '/suggestions')
        .then(res => {
            this.setState({suggestions: res.data})
        })
        .catch(error => {
            //console.log(error)
        })
  }

  render() {   
      let label = this.state.suggestions.length>0?"Suggested members based on your profile":"We couldn't find any suggestion based on your profile."
          
   return(
     <div>
     <div className="container">
            <div className="row">
            <div className="col s3"></div>
              <div className="col s6">
                <h5 className="center">{label}</h5>
              </div>       
            <div className="col s3"></div>
      </div>      
      </div>
      <div className="followList">
        {this.state.suggestions.map(sugestion=>(
           <FollowItem key={sugestion.id} userId={sugestion.id} loggedinUserId={this.state.loggedInUser.id}/>
        ))}
      </div>   
     </div>
    
    ) 
    
  }
}

export default Suggestions;