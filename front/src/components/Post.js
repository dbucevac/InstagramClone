import React from 'react'

class Home extends React.Component {
  render() {
    return (
    <div className="post">
        <div className="card post-card">
            <h5>Darko</h5>
            <div className="card-image">
                <img src="https://images.unsplash.com/photo-1482686115713-0fbcaced6e28?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=747&q=80"/>
            </div>
            
            <h6 style={{"verticalAlign":"center"}}><i className="small material-icons" style={{"color":"red"}}>favorite</i>569 Likes</h6>
            <h6>{this.props.caption}</h6>
            <h6>messages</h6>
            <ul>
                <li>Provera</li>
            </ul>
        </div>
    </div>
    )
  }
}

export default Home;