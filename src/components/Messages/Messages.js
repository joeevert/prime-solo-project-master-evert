import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import Sent from './Sent';
import Received from './Received';
import Paper from '@material-ui/core/Paper';


// material ui
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  button: {
    width: 300,
    padding: 10,
    margin: theme.spacing.unit,
  },
  paper: {
    marginTop:'50px', 
    overflow: 'scroll'
  },
  tab: {
    display: 'inline-block',
    backgroundColor: '#01632C',
    color: '#fff',
    padding: '10px',
    cursor: 'pointer'
  },
  toggleTab: {
    display: 'inline-block',
    backgroundColor: '#239956',
    color: '#fff',
    padding: '10px',
    cursor: 'pointer'
  }
});

class Messages extends Component {

  state = {
    toggleRequests: true,
    toggleTab: false,
  }

  componentDidMount() {
    this.getInbox();
  }

  getInbox = () => {
    this.props.dispatch({ type: 'GET_INBOX' });
  }

  sentView = () => {
    console.log('sent view', this.state);
    this.setState({
      toggleRequests: true,
      toggleTab: false
    })
  }

  receivedView = () => {
    console.log('received view', this.state);
    this.setState({
      toggleRequests: false,
      toggleTab: true
    })
  }

  render() {
    const { classes } = this.props;
    const toggleRequests = this.state.toggleRequests;

    return (
      <Paper className={classes.paper}>      
        <Typography variant="h6" style={{textAlign: 'center'}}>SEED REQUESTS</Typography>
        <Typography
          onClick={this.sentView} 
          className={this.state.toggleTab ? classes.tab : classes.toggleTab}
        >
          SENT
        </Typography>
        <Typography 
          onClick={this.receivedView}
          className={this.state.toggleTab ? classes.toggleTab : classes.tab}
        >
          RECEIVED
        </Typography>
        {toggleRequests ? (
          <Sent />
        ) : (
          <Received />
        )}
      </Paper> 
    );
  }
}

const mapStateToProps = reduxState => ({ reduxState });

export default connect(mapStateToProps)(withStyles(styles)(withRouter(Messages)));
