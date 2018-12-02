import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import moment from 'moment';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'

// material ui
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';


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
    float: 'right',
    padding: '10px',
    backgroundColor: '#239956',
    color: '#fff',
    marginTop: '20px'
  },
  paper: {
    marginTop:'50px', 
    overflow: 'scroll'
  },
  form: {
      textAlign: 'center',
      padding: '15px',
      marginTop: theme.spacing.unit * 4,
  },
  textField: {
      width: '300px',
      borderRadius: '5px',
      margin: theme.spacing.unit,
      backgroundColor: '#fff'
  }
});

class SeedTable extends Component {

  componentDidMount() {
    this.getSeeds();
  }

  // dispatch to rootSaga
  getSeeds = () => {
    this.props.dispatch({ type: 'GET_SEEDS' });
  }

  // deletes table row and seed from user's inventory
  deleteSeed = (id) => {
    // console.log('in deleteSeed, id:', id);
    confirmAlert({
      title: 'Confirm to Delete',
      message: 'Are you sure to do this?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.props.dispatch({ type: 'DELETE_SEED', payload: id})
        },
        {
          label: 'No',
        }
      ]
    })
  }  

  // edit table cells in row
  editSeed = (id) => {
    console.log('in editSeed, id:', id);
    this.props.dispatch({ type: 'EDIT_SEED', payload: id})
  }

  shareSeedsBtn = () => {
    console.log('share seeds button clicked');
    this.props.history.push('/addseeds');
  }

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" style={{textAlign: 'center'}}>MY SEEDS</Typography>
        {/* {JSON.stringify(this.props.reduxState.seed)} */}
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <CustomTableCell>Category</CustomTableCell>
                <CustomTableCell>Description</CustomTableCell>
                <CustomTableCell>Quantity</CustomTableCell>
                <CustomTableCell>Date Added</CustomTableCell>
                {/* <CustomTableCell>Actions</CustomTableCell> */}
                <CustomTableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.reduxState.seed.map( seed =>
                <TableRow key={seed.id}>
                  <CustomTableCell>{seed.category}</CustomTableCell>
                  <CustomTableCell>{seed.description}</CustomTableCell>
                  <CustomTableCell>{seed.quantity}</CustomTableCell>
                  <CustomTableCell>{moment(seed.date_added).format("MMM Do, YYYY")}</CustomTableCell>
                  <CustomTableCell>
                    <Tooltip title="Edit Seed" placement="left">
                      <IconButton
                        color="default"
                        onClick={() => this.editSeed(seed.id)}
                      >
                        <Edit fontSize="small"/>
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Seed" placement="right">
                      <IconButton
                        color="secondary"
                        onClick={() => this.deleteSeed(seed.id)} 
                      >
                        <Delete fontSize="small"/>
                      </IconButton>
                    </Tooltip>
                  </CustomTableCell>
                </TableRow>
                )}
            </TableBody>
          </Table>
        <Button
          className={classes.button} 
          onClick={this.shareSeedsBtn}
        >
          Add Seeds
        </Button> 
      </Paper> 
    );
  }
}

const mapStateToProps = reduxState => ({ reduxState });

export default connect(mapStateToProps)(withStyles(styles)(withRouter(SeedTable)));
