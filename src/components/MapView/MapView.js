import React, { Component } from 'react';
import { connect } from 'react-redux';
import MapContainer from './MapContainer';

class MapView extends Component {

  state = {
		latitude: 0,
		longitude: 0,
		// location: "",
  }

  componentDidMount() {
    this.getGeoLocation();
    console.log('Home state CDM:', this.state);
    this.props.dispatch({ type: 'GET_ALL_SEEDS' });
  }

  // componentDidUpdate() {
  //   this.getGeoLocation();
  //   console.log('Home state C.D.U.:', this.state.latitude, this.state.longitude);
  // }

  // get user's location
  // getGeoLocation() {
	// 	if (navigator.geolocation) {
	// 		navigator.geolocation.getCurrentPosition(this.setPosition);
  //   }
  //   else {
	// 		alert('Location services not supported by your browser');
	// 	}
  // }

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
  
  // setPosition = (position) => {
	// 	this.setState({
  //       ...this.state,
  //       latitude: position.coords.latitude,
  //       longitude: position.coords.longitude
  //   })
	// }

  render() {
    return (
      <div className="App">
        <MapContainer
          location={ {lat: this.state.latitude, lng: this.state.longitude} }
				/>
      </div>
    );
  }
}

const mapStateToProps = reduxState => ({ reduxState });

export default connect(mapStateToProps)(MapView);
