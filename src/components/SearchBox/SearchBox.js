import React from 'react';
import { connect } from 'react-redux';

// material ui
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    textField: {
      width: '300px',
      borderRadius: '5px',
      margin: theme.spacing.unit,
      backgroundColor: '#fff'
    }
  });


const { compose, withProps, lifecycle } = require("recompose");
const {
  withScriptjs,
} = require("react-google-maps");
const { StandaloneSearchBox } = require("react-google-maps/lib/components/places/StandaloneSearchBox");

const SearchBox = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBE58Bqi3Gp-oWwWISPHICoQVsuKnNPusg&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
  }),
  lifecycle({
    
    componentWillMount() {
      const refs = {}

      this.setState({
        places: [],
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();

          this.setState({
            
            places,
          });
          console.log('places[0].geometry', this.state.places[0].geometry.location.lat());
          console.log('places[0].geometry', this.state.places[0].geometry.location.lng());
          console.log('places[0].formatted_address', this.state.places[0].formatted_address);
          

          // bundling up user's location
          let userLocation = {
            lat: this.state.places[0].geometry.location.lat(),
            lng: this.state.places[0].geometry.location.lng(),
            formatted_address: this.state.places[0].formatted_address
          }
          this.props.dispatch({ type: 'SET_LOCATION', payload: userLocation });
        },
      })
    },
  }),
  withScriptjs  
)(props =>
  <div data-standalone-searchbox="">
    <StandaloneSearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      onPlacesChanged={props.onPlacesChanged}
    >
      <TextField
        required
        id="location"
        label="Location"
        type="location"
        name="location"
        value={props.location}
        margin="normal"
        variant="outlined"
        style={{
            width: '300px',
            borderRadius: '5px',
            backgroundColor: '#fff'
        }}
      />
    </StandaloneSearchBox>
    {/* <ol>
      {props.places.map(({ place_id, formatted_address, geometry: { location } }) =>
        <li key={place_id}>
          {formatted_address}
          {" at "}
          ({location.lat()}, {location.lng()})
        </li>
      )}
    </ol> */}
  </div>
);

const mapStateToProps = reduxState => ({ reduxState });

export default connect(mapStateToProps)(withStyles(styles)(SearchBox));
