// TODO
// fix user info display
// add edit user info
// allow user to set/change location?

import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Profile.css';
import SeedTable from './SeedTable';

import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  button: {
      padding: 10,
      backgroundColor: '#239956',
      margin: theme.spacing.unit,
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

  shareSeedsBtn = () => {
    console.log('share seeds button clicked');
    this.props.history.push('/addseeds');
  }

  render() {
    const { classes } = this.props;
    return (
      <section className="container">
        {/* <h1 id="welcome">
          Welcome, { this.props.reduxState.user.username }!
        </h1> */}
        <div className="flexContainer">
          <div>
            <Avatar 
                className={classes.avatar}
                alt={ this.props.reduxState.user.username }
                src={ this.props.reduxState.user.profile_pic }
                style={{display: 'inline-block', marginRight:'20px'}}
              />
            <div className="info">
              <Typography variant="h6">First Name: {this.props.reduxState.user.first_name}</Typography>
              <Typography variant="h6">Last Name: {this.props.reduxState.user.last_name}</Typography>
            </div>
          </div>
          <SeedTable />
        </div>
      </section>
    );
  }
}

const mapStateToProps = reduxState => ({ reduxState });

export default connect(mapStateToProps)(withStyles(styles)(Profile));
