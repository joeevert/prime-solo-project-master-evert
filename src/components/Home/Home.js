import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Home.css';

// import LogOutButton from '../LogOutButton/LogOutButton';

import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  button: {
      width: 300,
      padding: 10,
      backgroundColor: '#239956',
      margin: theme.spacing.unit,
  },
  paper: {
      width: 400,
      height: 400,
      borderRadius: 25,
      margin: "auto",
      marginTop: theme.spacing.unit * 10,
      backgroundColor: '#67C28F',
      border: '2px solid #01632C'
  },
  form: {
      textAlign: "center",
      padding: 15,
      marginTop: theme.spacing.unit * 4,
  },
  textField: {
      width: 300,
      borderRadius: 5,
      margin: theme.spacing.unit,
      backgroundColor: '#fff'
  },
  header: {
    color: '#fff', 
    fontWeight: 'bold', 
    backgroundColor: '#01632C', 
    margin: '0', 
    padding: '10px',
    borderRadius: '22px 22px 0px 0px',
  },
  formControl: {
      width: 300,
      borderRadius: 5,
      margin: theme.spacing.unit,
      backgroundColor: '#fff'
  },
})

class Home extends Component {

  state = {
		latitude: 0,
		longitude: 0,
		// location: "",
  }

  componentDidMount = () => {
    this.getGeoLocation();
  }

  shareSeedsBtn = () => {
    console.log('share seeds button clicked');
    this.props.history.push('/addseeds');
  }

  searchBtn = () => {
    console.log('search button clicked');
    this.props.history.push('/map');
  }

  useCurrentLocation = () => {
    console.log('use current location:', this.state);
    // this.props.history.push('/map');    
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
    const { classes } = this.props;
    return (
      <section className="center">

        <h1 id="welcome">
          Welcome, { this.props.reduxState.user.username }!
        </h1>

        {/* <LogOutButton className="log-in" /> */}

        <Paper className={classes.paper}>
          <Typography
            className={classes.header}
            variant="h4"
          >
            FIND SEEDS
          </Typography>
          <TextField 
            className={classes.textField}
            required
            id="search"
            label="Search"
            type="text"
            name="search"
            // value={this.state.search}
            // onChange={this.handleInputChangeFor('search')}
            margin="normal"
            variant="outlined"
          />
          <Button
            className={classes.button}            
            onClick={this.useCurrentLocation}
            variant="contained"
            style={{ backgroundColor: '#239956', color: '#fff' }}
          >
            @ Current Location
          </Button>
          <Button
            className={classes.button}
            onClick={this.searchBtn}
            variant="contained"
            style={{ backgroundColor: '#239956', color: '#fff' }}
          >
            SEARCH
          </Button>
        </Paper>

        <Paper className={classes.paper}>
          <Typography 
            className={classes.header} 
            variant="h4"
          >
            SHARE SEEDS
          </Typography>
          <Button
            className={classes.button}
            variant="contained" 
            onClick={this.shareSeedsBtn}
            style={{ backgroundColor: '#239956', color: '#fff' }}
          >
            SHARE SEEDS
          </Button>
        </Paper>
        
      </section>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = reduxState => ({ reduxState });

export default connect(mapStateToProps)(withStyles(styles)(Home));
