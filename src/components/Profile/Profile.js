// TODO
// fix user info display
// add edit user info
// allow user to set/change location?

import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Profile.css';
import SeedTable from './SeedTable';

import Typography from '@material-ui/core/Typography';

class Profile extends Component {

  state = {
    
  }

  shareSeedsBtn = () => {
    console.log('share seeds button clicked');
    this.props.history.push('/addseeds');
  }

  render() {
    return (
      <section className="container">
        {/* <h1 id="welcome">
          Welcome, { this.props.reduxState.user.username }!
        </h1> */}
        <div className="flexContainer">
          <div>
            <img className="profilePic" src={ this.props.reduxState.user.profile_pic } alt="profile pic"/>
            <div className="info">
              <Typography variant="h6">First Name: {this.props.reduxState.user.first_name}</Typography>
              <Typography variant="h6">Last Name: {this.props.reduxState.user.last_name}</Typography>
            </div>
          </div>
          <SeedTable />
        </div>
      </section>
    );
  }
}

const mapStateToProps = reduxState => ({ reduxState });

export default connect(mapStateToProps)(Profile);
