// TODO
// fix user info display
// add edit user info
// allow user to set/change location?

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import './Profile.css';
import SeedTable from './SeedTable';
import Messages from '../Messages/Messages';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';
import Edit from '@material-ui/icons/Edit';

const styles = theme => ({
  button: {
    padding: '10px',
    backgroundColor: '#239956',
    color: '#fff',
    width: '200px'
  },
  header: {
    fontWeight: 'bold', 
    padding: '10px',
  },
  avatar: {
    margin: 'auto',
    width: '200px',
    height: '200px',
    backgroundColor: '#ddd',
    border: '5px solid #239956',
  },
  info: {
    marginBottom: '10px'
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  } 
})

class Profile extends Component {

  state = {
    view: true
  }

  shareSeedsBtn = () => {
    console.log('share seeds button clicked');
    this.props.history.push('/addseeds');
  }

  toggleView = () => {
    console.log('profile state', this.state);
    this.setState({ view: !this.state.view})
  }

  render() {
    const { classes } = this.props;
    const toggleView = this.state.view;
    return (
      <section className="container">
        <Avatar 
          className={classes.avatar}
          alt={ this.props.reduxState.user.username }
          src={ this.props.reduxState.user.profile_pic }
        />
        <div className="info">
          <Typography
            className={classes.header}
            variant="h4"
          >
            {this.props.reduxState.user.first_name} {this.props.reduxState.user.last_name}
          </Typography>
          
          <div>
            
          <Typography
            style={{display: 'inline'}}
            className={classes.info}
            variant="h6"
          >
            {this.props.reduxState.user.formatted_address}
          </Typography>
          <IconButton style={{margin: '0px 0px 5px 5px'}}>
            <Edit fontSize="small"/>
          </IconButton>

          {/* <Button variant="contained" color="default">
            Edit Profile
            <Edit className={classes.rightIcon} fontSize="small"/>
          </Button> */}
          </div>
          <Button
            className={classes.button} 
            onClick={() => this.toggleView()}
          >
            {this.state.view ? 'View Requests' : 'View Seeds'}
          </Button>
        </div>
        {toggleView ? (
        <SeedTable />
        ) : (
        <Messages />
        )}
      </section>
    );
  }
}

const mapStateToProps = reduxState => ({ reduxState });

export default connect(mapStateToProps)(withStyles(styles)(Profile));
