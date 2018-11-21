import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Home.css';

import LogOutButton from '../LogOutButton/LogOutButton';

class Home extends Component {

  state = {
		latitude: 0,
		longitude: 0,
		// location: "",
  }

  componentDidMount = () => {
    this.getGeoLocation();
  }

  shareSeedsBtn = () => {
    console.log('share seeds button clicked');
    this.props.history.push('/addseeds');
  }

  searchBtn = () => {
    console.log('search button clicked');
    this.props.history.push('/map');
  }

  useCurrentLocation = () => {
    console.log('use current location:', this.state);
    // this.props.history.push('/map');    
  }

  getGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position.coords);
          this.setState({
              ...this.state,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
          })
        }
      )
    }
    else {
			alert('Location services not supported by your browser');
    }
  }

  render() {
    return (
      <section className="center">

        <h1 id="welcome">
          Welcome, { this.props.reduxState.user.username }!
        </h1>

        <p>Your ID is: { this.props.reduxState.user.id }</p>
        {/* <LogOutButton className="log-in" /> */}

        <div className="displayBox">
          <h2>FIND SEEDS</h2>
          <input placeholder="Enter Your Location"></input>
          <button
            className="currentLocationBtn" 
            onClick={this.useCurrentLocation}
          >
              @
          </button>
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

const mapStateToProps = reduxState => ({ reduxState });

export default connect(mapStateToProps)(Home);
