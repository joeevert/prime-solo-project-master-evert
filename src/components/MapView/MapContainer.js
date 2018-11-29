import React, { Component } from 'react';
import { connect } from 'react-redux'
import Map from './Map';
import MapSeedList from './MapSeedList';
import './MapContainer.css';

class MapContainer extends Component {

  state = {
    location: this.props.location,
  }
  
  componentDidMount() {
    console.log('MapContainer state', this.props.location);
  }
  
  render() {
    return (
      <div>
        {/* {JSON.stringify(this.props.reduxState.allSeeds)} */}

        <section style={{display: 'flex'}}>
          <Map
            location={this.props.location}
            // googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyBE58Bqi3Gp-oWwWISPHICoQVsuKnNPusg&v=3.exp&libraries=geometry,drawing,places`}
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=&v=3.exp&libraries=geometry,drawing,places`}

            loadingElement={ <div style={ { height: `100%` } } />}
            containerElement={ <div style={ { height: `750px`, width: `65%` } } />}
            mapElement={ <div style={ { height: `100%` } } />}
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
