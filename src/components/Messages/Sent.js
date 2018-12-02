import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import moment from 'moment';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

// material UI
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core';

import Cancel from '@material-ui/icons/Cancel';


const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#239956',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = ({
  button: {
    width: 300,
    padding: 10,
  }
});

class Sent extends Component {

  // deletes table row and message from message table
  cancelRequest = (id) => {
    console.log('in cancelRequest, id:', id);
    confirmAlert({
      title: 'Confirm to Cancel Request',
      message: 'Are you sure about this?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.props.dispatch({ type: 'CANCEL_REQUEST', payload: id})
        },
        {
          label: 'No',
        }
      ]
    })
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
            <CustomTableCell>Status</CustomTableCell>
            {/* <CustomTableCell>Actions</CustomTableCell> */}
            <CustomTableCell />
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
              {message.status ? 
              <strong style={{color: '#fff', backgroundColor: '#01632C', padding: '10px', borderRadius: '5px'}}>
                Confirmed!
              </strong> : 'Not Confirmed'}
            </CustomTableCell>
            <CustomTableCell>
              <Tooltip title="Cancel Request" placement="right">
                <IconButton
                  color="secondary"
                  onClick={() => this.cancelRequest(message.id)}
                >
                  <Cancel fontSize="medium"/>
                </IconButton>
              </Tooltip>
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
