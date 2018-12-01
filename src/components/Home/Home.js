import React, { Component } from 'react';
import { connect } from 'react-redux';
import seeds from './seeds.jpg';
import share_seeds from './share_seeds.jpg';
import AddSeeds from '../AddSeeds/AddSeeds';
import SearchBox from '../SearchBox/SearchBox';

// import LogOutButton from '../LogOutButton/LogOutButton';

// material ui
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    // flexGrow: 1,
    marginTop: '50px'
  },
  button: {
    width: '300px',
    padding: '10px',
    backgroundColor: '#239956',
    color: '#fff',
    margin: theme.spacing.unit,
  },
  paper: {
    textAlign: 'center',
    width: '500px',
    height: '500px',
    margin: 'auto',
    borderRadius: '25px',
    border: '2px solid #01632C',
  },
  textField: {
    width: '300px',
    borderRadius: '5px',
    margin: 0,
    backgroundColor: '#fff'
  },
  header: {
    color: '#fff', 
    fontWeight: 'bold', 
    backgroundColor: '#01632C', 
    marginBottom: '50px', 
    padding: '10px',
    borderRadius: '22px 22px 0px 0px',
  },
})

class Home extends Component {

  state = {
		latitude: null,
		longitude: null,
    viewForm: true
  }

  // componentDidMount = () => {
  //   this.getGeoLocation();
  // }

  shareSeedsBtn = () => {
    console.log('share seeds button clicked');
    // this.props.history.push('/addseeds');
    this.setState({ viewForm: !this.state.viewForm})
  }

  searchBtn = () => {
    // console.log('search button clicked', this.state);
    this.setState({
      latitude: this.props.reduxState.location.lat,
      longitude: this.props.reduxState.location.lng
    })
    console.log('search button clicked', this.state);
    this.props.history.push('/map');
  }

  useCurrentLocation = () => {
    console.log('use current location:', this.state);
    this.props.history.push('/map');    
  }

  // getGeoLocation = () => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         console.log(position.coords);
  //         this.setState({
  //           ...this.state,
  //           latitude: position.coords.latitude,
  //           longitude: position.coords.longitude
  //         })
  //       }
  //     )
  //   }
  //   else {
	// 		alert('Location services not supported by your browser');
  //   }
  // }

  render() {
    const { classes } = this.props;
    const toggleForm = this.state.viewForm;

    return (
      <section className={classes.root}>
        {/* <div style={{textAlign: 'center'}}>
          <h1>
            Welcome, { this.props.reduxState.user.username }!
          </h1>
        </div> */}
        <Grid container spacing={24}>
          
          {/* <LogOutButton className="log-in" /> */}
          <Grid item xs={12} sm={6}>
            <Paper 
              className={classes.paper}
              style={{ backgroundImage: `url(${seeds})`}}
            >
              <Typography
                className={classes.header}
                variant="h4"
              >
                FIND SEEDS
              </Typography>
              {/* <TextField 
                className={classes.textField}
                required
                id="search"
                label="Search"
                type="text"
                name="search"
                // value={this.state.search}
                // onChange={this.handleInputChangeFor('search')}
                variant="outlined"
              /> */}
              <SearchBox />
              <Button
                className={classes.button}
                onClick={this.searchBtn}
                variant="contained"
              >
                SEARCH
              </Button>
              <Button
                className={classes.button}            
                onClick={this.useCurrentLocation}
                variant="contained"
              >
                @ Current Location
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            {toggleForm ? (
            <Paper
              onClick={this.shareSeedsBtn}
              className={classes.paper}
              style={{ backgroundImage: `url(${share_seeds})`, cursor: 'pointer'}}
            >
              <Typography 
                className={classes.header} 
                variant="h4"
              >
                SHARE SEEDS
              </Typography>
              {/* <Button
                className={classes.button}
                variant="contained" 
                onClick={this.shareSeedsBtn}
                style={{ backgroundColor: '#239956', color: '#fff' }}
              >
                ADD SEEDS
              </Button> */}
            </Paper>
            ) : (
            <AddSeeds />
            )}
          </Grid>
        </Grid>
        {JSON.stringify(this.props.reduxState.location)}  
      </section>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = reduxState => ({ reduxState });

export default connect(mapStateToProps)(withStyles(styles)(Home));
