import React, { Component } from 'react';
import Map from './Map'

class MapContainer extends Component {

  state = {
    location: this.props.location,
		activeMarker: null
  }
  
  componentDidUpdate() {
    console.log('MapContainer state', this.props.location);
  }
  
  render() {
    return (
      <div>
        <section style={{display: 'flex'}}>
          <Map
            // location={ { lat: this.state.currentLatLng.lat, lng: this.state.currentLatLng.lng } }
            location={this.props.location}
            // googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyBE58Bqi3Gp-oWwWISPHICoQVsuKnNPusg&v=3.exp&libraries=geometry,drawing,places`}
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=&v=3.exp&libraries=geometry,drawing,places`}

            loadingElement={ <div style={ { height: `100%` } } />}
            containerElement={ <div style={ { height: `600px`, width: `75%` } } />}
            mapElement={ <div style={ { height: `100%` } } />}
            activeMarker={this.state.activeMarker}
          />
          <div style={{height: '600px', width: '25%', backgroundColor: '#ddd'}}>
            <h4>SEEDS AVAILABLE</h4>
          </div>
        </section>
      </div>
    );
  }
}

export default MapContainer;
