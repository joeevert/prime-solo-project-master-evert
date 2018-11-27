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

  componentDidMount() {
    this.getReceivedMessages();
  }

  // dispatch to rootSaga
  getReceivedMessages = () => {
    this.props.dispatch({ type: 'GET_RECEIVED_REQUESTS' });
  }

  // deletes table row and message from message table
  deleteMessage = (id) => {
    console.log('in deleteMessage, id:', id);
    this.props.dispatch({ type: 'DELETE_MESSAGE', payload: id})
  }

  render() {
    const { classes } = this.props;
    return (
        <Table className={classes.table}>
        <TableHead>
            <TableRow>
            <CustomTableCell>Request From</CustomTableCell>
            <CustomTableCell>Date</CustomTableCell>
            <CustomTableCell>Request</CustomTableCell>
            <CustomTableCell>Message</CustomTableCell>
            <CustomTableCell>Actions</CustomTableCell>
            </TableRow>
        </TableHead>
        {/* <TableBody>
            {this.props.reduxState.receivedRequests.map( message =>
            <TableRow key={message.id}>
                <CustomTableCell>{message.username}</CustomTableCell>
                <CustomTableCell>{moment(message.date).format("MMM Do, YYYY")}</CustomTableCell>
                <CustomTableCell>{message.quantity} {message.description} Seeds</CustomTableCell>
                <CustomTableCell>{message.message}</CustomTableCell>
                <CustomTableCell>
                <Button
                    color="secondary"
                    variant="contained" 
                    onClick={() => this.deleteMessage(message.id)}
                >
                    DELETE
                </Button>
                </CustomTableCell>
            </TableRow>
            )}
        </TableBody> */}
        </Table>
    );
  }
}

const mapStateToProps = reduxState => ({ reduxState });

export default connect(mapStateToProps)(withStyles(styles)(withRouter(Received)));
