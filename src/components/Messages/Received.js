import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import moment from 'moment';

// material UI
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#239956',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
    button: {
        width: 300,
        padding: 10,
        margin: theme.spacing.unit,
    },
    tabs: {
      display: 'inline-block',
      backgroundColor: '#01632C',
      color: '#fff',
      padding: '15px',
      cursor: 'pointer'
    }
  });

class Received extends Component {

  // confirms request
  confirm = (id) => {
    console.log('in confirm, id:', id);

    this.props.dispatch({ type: 'CONFIRM_REQUEST', payload: id})
  }

  // handles request submit
  handleRequest = (event) => {
    event.preventDefault();
    console.log('requesting seed', this.state);
    const seedRequest = {
      ...this.state,
        line_item: this.props.reduxState.request.id,
        received_by: this.props.reduxState.request.user_id,
        sent_by: this.props.reduxState.user.id,
    }
    this.props.dispatch({ type: 'SUBMIT_REQUEST', payload: seedRequest });
  }

  render() {
    const { classes } = this.props;
    return (
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell>Requested From</CustomTableCell>
            <CustomTableCell>Date Requested</CustomTableCell>
            <CustomTableCell>Request</CustomTableCell>
            <CustomTableCell>Message</CustomTableCell>
            <CustomTableCell>Status</CustomTableCell>
            <CustomTableCell>Actions</CustomTableCell>
          </TableRow>
        </TableHead>
        {this.props.reduxState.inbox.received ? (
        <TableBody>
          {this.props.reduxState.inbox.received.map( message =>
          <TableRow key={message.id}>
            <CustomTableCell>{message.username}</CustomTableCell>
            <CustomTableCell>{moment(message.date).format("MMM Do, YYYY")}</CustomTableCell>
            <CustomTableCell>{message.quantity} {message.description} Seeds</CustomTableCell>
            <CustomTableCell>{message.message}</CustomTableCell>
            <CustomTableCell>{(message.status.toString())}</CustomTableCell>

            <CustomTableCell>
              <Button
                // color="secondary"
                variant="contained" 
                onClick={() => this.confirm(message.id)}
              >
                CONFIRM
              </Button>
            </CustomTableCell>
          </TableRow> 
          )}
        </TableBody>
        ) : (
        <TableBody />)}
      </Table>
    );
  }
}

const mapStateToProps = reduxState => ({ reduxState });

export default connect(mapStateToProps)(withStyles(styles)(withRouter(Received)));
