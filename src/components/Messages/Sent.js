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

class Sent extends Component {

  // deletes table row and message from message table
  cancelRequest = (id) => {
    console.log('in deleteMessage, id:', id);
    this.props.dispatch({ type: 'DELETE_MESSAGE', payload: id})
  }

  render() {
    const { classes } = this.props;
    return (
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell>Sent To</CustomTableCell>
            <CustomTableCell>Date</CustomTableCell>
            <CustomTableCell>Request</CustomTableCell>
            <CustomTableCell>Message</CustomTableCell>
            <CustomTableCell>Actions</CustomTableCell>
          </TableRow>
        </TableHead>
        {this.props.reduxState.inbox.sent ? (
        <TableBody>
          {this.props.reduxState.inbox.sent.map( message =>
          <TableRow key={message.id}>
            <CustomTableCell>{message.username}</CustomTableCell>
            <CustomTableCell>{moment(message.date).format("MMM Do, YYYY")}</CustomTableCell>
            <CustomTableCell>{message.quantity} {message.description} Seeds</CustomTableCell>
            <CustomTableCell>{message.message}</CustomTableCell>
            <CustomTableCell>
              <Button
                color="secondary"
                variant="contained" 
                onClick={() => this.cancelRequest(message.id)}
              >
                CANCEL
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

export default connect(mapStateToProps)(withStyles(styles)(withRouter(Sent)));
