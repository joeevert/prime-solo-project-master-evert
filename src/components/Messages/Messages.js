import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import Sent from './Sent';
import Received from './Received';

// material UI
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core';

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
        backgroundColor: '#67C28F'
    },
    tab: {
      display: 'inline-block',
      backgroundColor: '#01632C',
      color: '#fff',
      padding: '15px',
      cursor: 'pointer'
    },
    toggleTab: {
      display: 'inline-block',
      backgroundColor: '#239956',
      color: '#fff',
      padding: '15px',
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
      <div style={{ width: '85%', margin: 'auto'}}>
        <p>RECEIVED: {JSON.stringify(this.props.reduxState.inbox.received)}</p>
        <Typography variant="h6" style={{textAlign: 'center'}}>SEED REQUESTS</Typography>
        <Typography className={this.state.toggleTab ? classes.tab : classes.toggleTab} onClick={this.sentView}>SENT</Typography>
        <Typography className={this.state.toggleTab ? classes.toggleTab : classes.tab} onClick={this.receivedView}>RECEIVED</Typography>
        <Paper>
        {/* <p>SENT: {JSON.stringify(this.props.reduxState.inbox.sent)}</p> */}

        {toggleRequests ? (
          <Sent />
        ) : (
          <Received />
        )}
        </Paper>
      </div> 
    );
  }
}

const mapStateToProps = reduxState => ({ reduxState });

export default connect(mapStateToProps)(withStyles(styles)(withRouter(Messages)));
