import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Home.css';

// import LogOutButton from '../LogOutButton/LogOutButton';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';


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
          <Typography component="h1" variant="h5">FIND SEEDS</Typography>
          <TextField 
            // className={classes.textField}
            required
            id="search"
            label="Search"
            type="text"
            name="search"
            // value={this.state.search}
            // onChange={this.handleInputChangeFor('search')}
            margin="normal"
            variant="outlined"
          />
          <Button
            className="currentLocationBtn" 
            onClick={this.useCurrentLocation}
            variant="contained"
            color="primary"
          >
            @
          </Button>
          <Button 
            onClick={this.searchBtn}
            variant="contained"
            color="primary"
          >
            SEARCH
          </Button>
        </div>

        <div className="displayBox">
          <Typography component="h1" variant="h5">SHARE SEEDS</Typography>
          <Button 
            onClick={this.shareSeedsBtn}
          >
            SHARE SEEDS
          </Button>
        </div>
        
      </section>
    );
  }
}

const mapStateToProps = reduxState => ({ reduxState });

export default connect(mapStateToProps)(Home);
