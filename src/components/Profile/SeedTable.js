import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import moment from 'moment';

// material ui
import Typography from '@material-ui/core/Typography';
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
    float: 'right',
    padding: '10px',
    backgroundColor: '#239956',
    color: '#fff',
    marginTop: '20px'
  },
  paper: {
      width: '350px',
      height: '350px',
      borderRadius: '25px',
      // margin: "auto",
      // marginTop: theme.spacing.unit * 10,
      padding: '35px',
      backgroundColor: '#67C28F'
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
    console.log('in deleteSeed, id:', id);
    this.props.dispatch({ type: 'DELETE_SEED', payload: id})
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
      <div style={{marginTop:'50px'}}>
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
                    {/* <Button
                      color="primary"
                      variant="contained" 
                      onClick={() => this.editSeed()}
                      style={{marginRight: '15px'}}
                    >
                      EDIT
                    </Button> */}
                    <Button
                      color="secondary"
                      variant="contained" 
                      onClick={() => this.deleteSeed(seed.id)}
                    >
                      DELETE
                    </Button>
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
      </div> 
    );
  }
}

const mapStateToProps = reduxState => ({ reduxState });

export default connect(mapStateToProps)(withStyles(styles)(withRouter(SeedTable)));
