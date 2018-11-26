import React, { Component } from 'react';
import { connect } from 'react-redux';
import MapContainer from './MapContainer';

class MapView extends Component {

  state = {
		latitude: 0,
		longitude: 0,
  }

  componentDidMount() {
    this.getGeoLocation();
    console.log('Home state CDM:', this.state);
    this.props.dispatch({ type: 'GET_ALL_SEEDS' });
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
