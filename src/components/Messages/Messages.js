import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import moment from 'moment';

// material UI
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
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
    paper: {
        width: 350,
        height: 350,
        borderRadius: 25,
        margin: "auto",
        marginTop: theme.spacing.unit * 10,
        padding: 35,
        backgroundColor: '#67C28F'
    },
    form: {
        textAlign: "center",
        padding: 15,
        marginTop: theme.spacing.unit * 4,
    },
    textField: {
        width: 300,
        borderRadius: 5,
        margin: theme.spacing.unit,
        backgroundColor: '#fff'
    },
    tabs: {
      display: 'inline-block',
      backgroundColor: '#01632C',
      color: '#fff',
      padding: '15px'
    }
  });

class Messages extends Component {

  componentDidMount() {
  }

  // deletes table row and message from message table
  deleteMessage = (id) => {
    console.log('in deleteMessage, id:', id);
    this.props.dispatch({ type: 'DELETE_MESSAGE', payload: id})
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Typography variant="h6" style={{textAlign: 'center'}}>SEED REQUESTS</Typography>
        <Typography className={classes.tabs}>SENT</Typography>
        <Typography className={classes.tabs}>RECEIVED</Typography>
        <Paper>
        {/* {JSON.stringify(this.props.reduxState.message)} */}
        <div>
        
        </div>

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
            <TableBody>
              {/* {this.props.reduxState.messages.map( message =>
                <TableRow key={message.id}>
                  <CustomTableCell>{message.category}</CustomTableCell>
                  <CustomTableCell>{moment(message.date).format("MMM Do, YYYY")}</CustomTableCell>
                  <CustomTableCell>{message.request}</CustomTableCell>
                  <CustomTableCell>{message.message}</CustomTableCell>
                  <CustomTableCell>
                    <Button
                      color="primary"
                      variant="contained" 
                      onClick={() => this.editSeed()}
                    >
                      EDIT
                    </Button>
                    <Button
                      color="secondary"
                      variant="contained" 
                      onClick={() => this.deleteMessage(message.id)}
                    >
                      DELETE
                    </Button>
                  </CustomTableCell>
                </TableRow>
                )} */}
            </TableBody>
          </Table>
        </Paper>
      </div> 
    );
  }
}

const mapStateToProps = reduxState => ({ reduxState });

export default connect(mapStateToProps)(withStyles(styles)(withRouter(Messages)));
