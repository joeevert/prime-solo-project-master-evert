// TODO
// fix user info display
// add edit user info
// allow user to set/change location?

import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Profile.css';
import SeedTable from './SeedTable';
import Messages from '../Messages/Messages';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import Edit from '@material-ui/icons/Edit';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';

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
    display: 'inline',
    marginLeft: '50px'
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
    view: true,
    open: false
  }

  shareSeedsBtn = () => {
    console.log('share seeds button clicked');
    this.props.history.push('/addseeds');
  }

  toggleView = () => {
    console.log('profile state', this.state);
    this.setState({ view: !this.state.view})
  }

  editProfile = () => {
    console.log('edit profile', this.state.editProfileWindow);
    this.setState({ open: true});
    
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const toggleView = this.state.view;
    return (
      <section className="container">
        <div className="info">
          <Avatar 
            className={classes.avatar}
            alt={ this.props.reduxState.user.username }
            src={ this.props.reduxState.user.profile_pic }
          />
          <Typography
            className={classes.header}
            variant="h4"
          >
            {this.props.reduxState.user.first_name} {this.props.reduxState.user.last_name}
          </Typography>
          <Tooltip title="Edit Profile" placement="right">
            <IconButton 
              style={{margin: '0px 0px 5px 5px'}}
              onClick={this.editProfile}
            >
              <Edit fontSize="small"/>
            </IconButton>
          </Tooltip>
          <div>
          <Typography
            style={{display: 'inline'}}
            className={classes.info}
            variant="h6"
          >
            {this.props.reduxState.user.formatted_address}
          </Typography>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
              <DialogTitle style={{textAlign: 'center'}} id="alert-dialog-title">{"Edit Profile"}</DialogTitle>
              <DialogContentText id="alert-dialog-description">
                Let Google help apps determine location. This means sending anonymous location data to
                Google, even when no apps are running.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="secondary">
                Cancle
              </Button>
              <Button onClick={this.handleClose} color="primary" autoFocus>
                Save
              </Button>
            </DialogActions>
          </Dialog>
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
