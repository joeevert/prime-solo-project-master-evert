import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Marker, InfoWindow } from 'react-google-maps';

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
    return (
      <div className="App">
        <Marker
          position={this.props.position}
          onClick={this.markerClick} 
        >
          {this.state.isOpen &&
          <InfoWindow>
            <div>
              <p>{this.props.content}</p>
              <button onClick={this.infoButton}>test</button>
              <p>lat: {this.props.position.lat}</p>
              <p>lng: {this.props.position.lng} </p>
            </div>
          </InfoWindow> }
        </Marker>

        {/* HARD CODED MARKERS FOR TESTING */}
        {/* <Marker
          position={ { lat: 44.977, lng: -93.263 } }
          onClick={this.markerClick}  
        >
          { this.state.isOpen && 
          <InfoWindow>
            <div>
              <p>AAAAAAAAAA</p>
              <button>test</button>
              <p>lat: 44.977</p>
              <p>lng: -93.263 </p>
            </div>
          </InfoWindow> }
        </Marker>

        <Marker
          position={ { lat: 44.975, lng: -93.255 } }
          onClick={this.markerClick}  
        >
          { this.state.markerVisible && 
          <InfoWindow>
            <div>
              <p>BBBBBBBBBB</p>
              <button>test</button>
              <p>lat: 44.975</p>
              <p>lng: -93.255 </p>
            </div>
          </InfoWindow> }
        </Marker> */}
      </div>
    );
  }
}

const mapStateToProps = reduxState => ({ reduxState });

export default connect(mapStateToProps)(MapMarker);
