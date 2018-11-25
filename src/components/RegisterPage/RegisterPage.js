import React, { Component } from 'react';
import {connect} from 'react-redux';

import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import LockIcon from '@material-ui/icons/LockOutlined';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  button: {
      width: 300,
      padding: 10,
      margin: theme.spacing.unit,
  },
  paper: {
      width: 350,
      height: 350,
      borderRadius: 25,
      margin: "auto",
      marginTop: theme.spacing.unit * 10,
      padding: 35,
      backgroundColor: '#67C28F',
      border: '2px solid #01632C',
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
  avatar: {
    margin: "auto",
    backgroundColor: '#01632C'
  },
});

class RegisterPage extends Component {
  state = {
    username: '',
    password: '',
    latitude: null,
    longitude: null,
  };

  componentDidMount() {
    this.getGeoLocation();
  }

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'REGISTER',
        payload: {
          username: this.state.username,
          password: this.state.password,
          latitude: Number(this.state.latitude),
          longitude: Number(this.state.longitude)
        },
      });
    } else {
      this.props.dispatch({type: 'REGISTRATION_INPUT_ERROR'});
    }
  } // end registerUser

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  getGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // console.log('add seeds location:', position.coords);
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
      <div>
        {this.props.errors.registrationMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.registrationMessage}
          </h2>
        )}
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          <form className={classes.form} onSubmit={this.registerUser}>
            <Typography 
                variant="h4"
                style={{color: '#fff', fontWeight: 'bold'}}
            >
              Register User
            </Typography>
            <div>
              <TextField
                className={classes.textField}
                required
                id="username"
                label="Username"
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleInputChangeFor('username')}
                margin="normal"
                variant="outlined"
              />
            </div>
            <div>
              <TextField
                className={classes.textField}
                required
                id="password"
                label="Password"
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
                margin="normal"
                variant="outlined"
              />
            </div>
            <div>
              <Button
                className={classes.button}
                type="submit"
                name="submit"
                // value="Register"
                variant="contained"
                style={{ backgroundColor: '#239956', color: '#fff' }}
              >
                Register
              </Button>
            </div>
          </form>
        </Paper>
        <div className="center">
          <Button
            className={classes.button}
            type="button"
            onClick={() => {this.props.dispatch({type: 'SET_TO_LOGIN_MODE'})}}
          >
            Log In
          </Button>
        </div>
      </div>
    );
  }
}

RegisterPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(withStyles(styles)(RegisterPage));

