// TODO
// fix user info display
// add edit user info
// allow user to set/change location?

import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Profile.css';
import SeedTable from './SeedTable';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';

import { withStyles } from '@material-ui/core/styles';
import Messages from '../Messages/Messages';

const styles = ({
  button: {
    padding: '10px',
    backgroundColor: '#239956',
    color: '#fff',
    width: '200px'
  },
  header: {
    color: '#fff', 
    fontWeight: 'bold', 
    backgroundColor: '#01632C', 
    marginBottom: '10px', 
    padding: '10px',
  },
  card: {
    width: '600px',
    textAlign: 'left',
    margin: 'auto',
    marginBottom: '15px'
    // overflow: 'scroll',
  },
  avatar: {
    margin: '20px',
    width: '200px',
    height: '200px',
    backgroundColor: '#ddd'
  }, 
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
        <div className="flexContainer">
          <div>
            <Avatar 
                className={classes.avatar}
                alt={ this.props.reduxState.user.username }
                src={ this.props.reduxState.user.profile_pic }
              />
            <div className="info">
              <Typography 
                variant="h6">{this.props.reduxState.user.first_name} {this.props.reduxState.user.last_name}
              </Typography>
              <Button
                className={classes.button} 
                onClick={() => this.toggleView()}
              >
                {this.state.view ? 'View Requests' : 'View Seeds'}
              </Button>
            </div>
          </div>
          {toggleView ? (
          <SeedTable />
          ) : (
          <Messages />
          )}
        </div>
      </section>
    );
  }
}

const mapStateToProps = reduxState => ({ reduxState });

export default connect(mapStateToProps)(withStyles(styles)(Profile));
