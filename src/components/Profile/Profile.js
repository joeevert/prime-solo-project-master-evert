// TODO
// fix user info display
// add edit user info
// allow user to set/change location?

import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Profile.css';
import SeedTable from './SeedTable';
import Messages from '../Messages/Messages';
import SearchBox from '../SearchBox/SearchBox';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import Edit from '@material-ui/icons/Edit';
import Save from '@material-ui/icons/Save';
import Cancel from '@material-ui/icons/Cancel';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  button: {
    padding: '10px',
    backgroundColor: '#239956',
    color: '#fff',
    width: '200px'
  },
  editButton: {
    padding: '10px',
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
  textField: {
    width: '300px',
    borderRadius: '5px',
    // margin: theme.spacing.unit,
    backgroundColor: '#fff'
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  } 
})

class Profile extends Component {

  state = {
    view: true,
    locationEdit: true,
    open: false,
    id: this.props.reduxState.user.id,
    username: this.props.reduxState.user.username,
    first_name: this.props.reduxState.user.first_name,
    last_name: this.props.reduxState.user.last_name,
    formatted_address: null,
    profile_pic: this.props.reduxState.user.profile_pic,
    lat: null,
		lng: null,
  }

  shareSeedsBtn = () => {
    console.log('share seeds button clicked');
    this.props.history.push('/addseeds');
  }

  toggleView = () => {
    console.log('profile state', this.state);
    this.setState({ view: !this.state.view})
  }

  locationEdit = () => {
    console.log('profile state', this.state);
    this.setState({ 
      locationEdit: !this.state.locationEdit,
    })
  }

  editProfile = () => {
    console.log('edit profile', this.state.open);
    this.setState({ open: true});
  }

  handleEditProfileSave = () => {
    this.setState({ open: false });
    let userEdit = {
      id: this.state.id,
      username: this.state.username,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      profile_pic: this.state.profile_pic
    }
    this.props.dispatch({ type: 'EDIT_PROFILE', payload: userEdit })
  }

  updateLocation = () => {
    console.log('updating location');
    // this.setState({ locationEdit: !this.state.locationEdit})
    this.setState({ 
      locationEdit: !this.state.locationEdit,
      formatted_address: this.props.reduxState.location.formatted_address,
      lat: this.props.reduxState.location.lat,
      lng: this.props.reduxState.location.lng
    })
    let userUpdatedLocation = {
      id: this.state.id,
      username: this.state.username,
      formatted_address: this.props.reduxState.location.formatted_address,
      lat: this.props.reduxState.location.lat,
      lng: this.props.reduxState.location.lng
    }
    this.props.dispatch({ type: 'EDIT_LOCATION', payload: userUpdatedLocation })

  }

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  handleEditProfileClose = () => {
    this.setState({ open: false });
  }

  render() {
    const { classes } = this.props;
    const toggleView = this.state.view;
    const locationEdit = this.state.locationEdit;

    return (
      <section className="container">
      {/* {JSON.stringify(this.props.reduxState.user)} */}
      {/* {JSON.stringify(this.state)} */}

        <div className="info">
          <Avatar 
            className={classes.avatar}
            alt={this.props.reduxState.user.username}
            src={this.props.reduxState.user.profile_pic}
          />
          <Typography
            className={classes.header}
            variant="h4"
          >
            {this.props.reduxState.user.first_name} {this.props.reduxState.user.last_name}
          </Typography>


          {locationEdit ? (
          <div>
            <Typography
              className={classes.info}
              variant="h6"
              style={{display: 'inline'}}
            >
              {this.props.reduxState.user.formatted_address}
            </Typography>
            <Tooltip title="Edit Location" placement="right">
              <IconButton
                onClick={this.locationEdit}
                color="default"
                style={{margin: '0px 0px 5px 5px'}}
              >
                <Edit fontSize="small"/>
              </IconButton>
            </Tooltip>
          </div>
          ) : (
          <div>
            <SearchBox style={{display: 'inline'}}/>
              <Button
                onClick={this.updateLocation}
                color="default"
              >
                Save Location
                <Save fontSize="small" className={classes.rightIcon}/>
              </Button>
          </div>
          )}
          <Button 
            className={classes.editButton}
            onClick={this.editProfile}
          >
            Edit Profile
            <Edit fontSize="small" className={classes.rightIcon}/>
          </Button>
          <div>

          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
              <DialogTitle style={{textAlign: 'center'}} id="alert-dialog-title">{"Edit Profile"}</DialogTitle>
              <div style={{textAlign: 'center'}}>
                <TextField
                  className={classes.textField}
                  id="username"
                  label="Username"
                  type="text"
                  name="username"
                  value={this.state.username}
                  placeholder={this.props.reduxState.user.username}
                  onChange={this.handleInputChangeFor('username')}
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  id="first_name"
                  label="First Name"
                  type="text"
                  name="first_name"
                  value={this.state.first_name}
                  placeholder={this.props.reduxState.user.first_name}
                  onChange={this.handleInputChangeFor('first_name')}
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  id="last_name"
                  label="Last Name"
                  type="text"
                  name="last_name"
                  value={this.state.last_name}
                  placeholder={this.props.reduxState.user.last_name}
                  onChange={this.handleInputChangeFor('last_name')}
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  id="profile_pic"
                  label="Profile Pic"
                  type="profile_pic"
                  name="profile_pic"
                  value={this.state.profile_pic}
                  placeholder={this.props.reduxState.user.profile_pic}
                  onChange={this.handleInputChangeFor('profile_pic')}
                  margin="normal"
                  variant="outlined"
                />
                </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleEditProfileClose} color="secondary">
                Cancel
              </Button>
              <Button onClick={this.handleEditProfileSave} color="primary" autoFocus>
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
