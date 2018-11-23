// TODO

import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Profile.css';
import SeedTable from './SeedTable';

import Button from '@material-ui/core/Button';

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

        <h1 id="welcome">
          Welcome, { this.props.reduxState.user.username }!
        </h1>

        <p>Your ID is: { this.props.reduxState.user.id }</p>
        <div>
          <p>profile view --- remove</p>
          {/* display user's profile pic */}
          <div className="tablePosition">
          <img className="profilePic" src="/images/profile_pic01.jpg" alt="profile pic"/>
          <SeedTable />
          </div>
          <Button onClick={this.shareSeedsBtn}>Add Seeds</Button>
        </div>

      </section>
    );
  }
}

const mapStateToProps = reduxState => ({ reduxState });

export default connect(mapStateToProps)(Profile);
