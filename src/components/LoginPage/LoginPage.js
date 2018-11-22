import React, { Component } from 'react';
import { connect } from 'react-redux';

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
  },
  form: {
      backgroundColor: "white",
      textAlign: "center",
      padding: 15,
      marginTop: theme.spacing.unit * 4,
  },
  textField: {
      width: 300,
      backgroundColor: "rgba(255, 255, 255, 0.3)",
      borderRadius: 5,
      margin: theme.spacing.unit,
  },
  avatar: {
    margin: "auto",
    backgroundColor: theme.palette.secondary.main,
  },
});


class LoginPage extends Component {
  state = {
    username: '',
    password: '',
  };

  login = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  } // end login

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    const { classes } = this.props;
    return (

      <div>

        {this.props.errors.loginMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.loginMessage}
          </h2>
        )}

        <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockIcon />
        </Avatar>
        <form className={classes.form} onSubmit={this.login}>
          <Typography component="h1" variant="h5">
            Log In
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
              type="submit"
              name="submit"
              // value="Log In"
              variant="contained"
              color="primary"
              className={classes.button}

            >
              Log In
            </Button>
          </div>
        </form>
        </Paper>
        <div className="center">
          <Button
            onClick={() => {this.props.dispatch({type: 'SET_TO_REGISTER_MODE'})}}
            className={classes.button}
          >
            Register
          </Button>
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(withStyles(styles)(LoginPage));
// export default connect(mapStateToProps)(withStyles(styles)(ProjectPage))