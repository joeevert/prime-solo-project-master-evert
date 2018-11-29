import React from 'react';
import { connect } from 'react-redux';
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';
import MapMarker from './MapMarker'

const Map = withScriptjs(withGoogleMap((props) => {

  return (
      <GoogleMap
        defaultZoom={14}
        center={ props.location }
        >

        <MapMarker 
          position={props.location}
          content="YOU ARE HERE"
        />

        {/* {JSON.stringify(props.reduxState.allSeeds)} */}

        {props.reduxState.allSeeds.map( marker => 
        <MapMarker
          key={marker.id} 
          position={{lat: Number(marker.latitude), lng: Number(marker.longitude)}}
          content={marker.description}
        />
        )}
      </GoogleMap>
    )
  })
)

const mapStateToProps = reduxState => ({ reduxState });

export default connect(mapStateToProps)(Map);

