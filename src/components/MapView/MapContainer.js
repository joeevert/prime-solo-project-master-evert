import React, { Component } from 'react';
import { connect } from 'react-redux'
import Map from './Map';
import MapSeedList from './MapSeedList';
import './MapContainer.css';

// material ui

// const styles = ({
//   button: {
//     width: '300px',
//     padding: '10px',
//     backgroundColor: '#239956',
//     color: '#fff',
//     margin: 0,
//   },
// })

class MapContainer extends Component {
  
  state = {
    lat: this.props.reduxState.location.lat, 
    lng: this.props.reduxState.location.lng
  }

  componentDidMount() {
    console.log('MapContainer state:', this.state);
    this.props.dispatch({ type: 'GET_ALL_SEEDS' });
    this.checkLocation();
  }
  
  checkLocation = () => {
    if ( this.state.lat === undefined || this.state.lng === undefined) {
      this.getGeoLocation();
    }
  }

  getGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position.coords);
          this.setState({
            ...this.state,
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        }
      )
    }
    else {
			alert('Location services not supported by your browser');
    }
  }

  searchBtn = () => {
    // console.log('search button clicked', this.state);
    this.setState({
      lat: this.props.reduxState.location.lat,
      lng: this.props.reduxState.location.lng
    })
    console.log('search button clicked', this.state);
  }

  render() {
    return (
      <div>
        {/* {JSON.stringify(this.props.reduxState.allSeeds)} */}
        <section style={{display: 'flex'}}>
          <Map
            location={ {lat: this.state.lat, lng: this.state.lng} }

            // googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${YOUR API KEY}&v=3.exp&libraries=geometry,drawing,places`}
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=&v=3.exp&libraries=geometry,drawing,places`}

            loadingElement={<div style={{height: `100%`}}/>}
            containerElement={<div style={{height: `750px`, width: `65%`}}/>}
            mapElement={<div style={{height: `100%`}}/>}
          />
          <div className="seedList">
            <MapSeedList />
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = reduxState => ({ reduxState });

export default connect(mapStateToProps)(MapContainer);
