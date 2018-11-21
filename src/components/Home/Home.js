import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Home.css';

import LogOutButton from '../LogOutButton/LogOutButton';

class Home extends Component {
  // Renders the entire app on the DOM

  shareSeedsBtn = () => {
    console.log('share seeds button clicked');
    this.props.history.push('/addseeds');
  }

  searchBtn = () => {
    console.log('search button clicked');
    this.props.history.push('/map');
  }

  render() {
    return (
      <section className="center">

        <h1 id="welcome">
          Welcome, { this.props.user.username }!
        </h1>

        <p>Your ID is: { this.props.user.id }</p>
        {/* <LogOutButton className="log-in" /> */}

        <div className="displayBox">
          <h2>FIND SEEDS</h2>
          <input placeholder="Enter Your Location"></input>
          <button onClick={this.searchBtn}>SEARCH</button>
        </div>

        <div className="displayBox">
          <h2>SHARE SEEDS</h2>
          <button onClick={this.shareSeedsBtn}>SHARE SEEDS</button>
        </div>
        
      </section>
    );
  }
}

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(Home);
