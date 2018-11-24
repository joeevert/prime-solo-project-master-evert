import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Marker, InfoWindow } from 'react-google-maps';

// material UI
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  button: {
      width: 200,
      padding: 10,
      margin: theme.spacing.unit,
  },
  div: {
      width: 350,
      height: 350,
      borderRadius: 25,
      margin: "auto",
      marginTop: theme.spacing.unit * 10,
      padding: 35,
      backgroundColor: '#67C28F'
  }
});

class MapMarker extends Component {

  state = {
    isOpen: false,
  }

  markerClick = () => {
    console.log('markerClick', this.state);
    this.setState({
      isOpen: !this.state.isOpen
    })
  }
  
  infoButton = () => {
    console.log('infoButton');
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="App">
        <Marker
          position={this.props.position}
          onClick={this.markerClick} 
        >
          {this.state.isOpen &&
          <InfoWindow>
            <div>
              <Typography>
                {this.props.content}
              </Typography>
              <Button
                size= "small" 
                className={classes.button}
                onClick={this.infoButton}
                style={{ backgroundColor: '#239956', color: '#fff' }}
              >
                Make Request
              </Button>
              <p>lat: {this.props.position.lat}</p>
              <p>lng: {this.props.position.lng} </p>
            </div>
          </InfoWindow> }
        </Marker>
      </div>
    );
  }
}

const mapStateToProps = reduxState => ({ reduxState });

export default connect(mapStateToProps)(withStyles(styles)(MapMarker));
