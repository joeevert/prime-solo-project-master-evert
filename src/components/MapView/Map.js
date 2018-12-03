/* global google */
import React from 'react';
import { connect } from 'react-redux';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import MapMarker from './MapMarker'
import TextField from '@material-ui/core/TextField';

const { SearchBox } = require("react-google-maps/lib/components/places/SearchBox");

const Map = withScriptjs(withGoogleMap((props) => {

  return (
      <GoogleMap
        defaultZoom={14}
        center={ props.location }
        >
        {/* Marker shows your location */}
        {/* <Marker
          position={{lat: props.reduxState.location.lat, lng: props.reduxState.location.lng}}
          // onClick={() => this.markerClick(item.id)}
          // icon={seedMarker} 
        >
        </Marker> */}
        <SearchBox
          ref={props.onSearchBoxMounted}
          bounds={props.bounds}
          controlPosition={google.maps.ControlPosition.TOP_RIGHT}
          onPlacesChanged={props.onPlacesChanged}
        >
          <TextField
            id="location"
            label="Enter Location"
            type="text"
            name="location"
            // value={props.location}
            // margin="normal"
            variant="outlined"
            style={{
              margin: '15px',
              width: '300px',
              borderRadius: '5px',
              backgroundColor: '#fff',
            }}
          />
        </SearchBox>
        <MapMarker />
        {/* {props.reduxState.allSeeds.map( marker => 
        <MapMarker
          key={marker.id} 
          position={{lat: Number(marker.latitude), lng: Number(marker.longitude)}}
          content={marker.description}
        />
        )} */}
      </GoogleMap>
    )
  })
)

const mapStateToProps = reduxState => ({ reduxState });

export default connect(mapStateToProps)(Map);

