import React, { Component } from 'react';
import { connect } from 'react-redux';

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
    avatar: {
      margin: "auto",
      backgroundColor: '#01632C'
    },
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

  // edit table row cells
  editSeed = (id) => {
    console.log('in editSeed, id:', id);
    this.props.dispatch({ type: 'EDIT_SEED', payload: id})
  }

  render() {
    const { classes } = this.props;
    return (      
        <Paper>
        {JSON.stringify(this.props.reduxState.seed)}

          <Typography variant="h6">Seeds:</Typography>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <CustomTableCell>Category</CustomTableCell>
                <CustomTableCell>Description</CustomTableCell>
                <CustomTableCell>Quantity</CustomTableCell>
                <CustomTableCell>Actions</CustomTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.reduxState.seed.map( seed =>
                <TableRow key={seed.id}>
                  <CustomTableCell>{seed.category}</CustomTableCell>
                  <CustomTableCell>{seed.description}</CustomTableCell>
                  <CustomTableCell>{seed.quantity}</CustomTableCell>
                  <CustomTableCell>
                    <Button
                      color="primary"
                      variant="contained" 
                      onClick={() => this.editSeed()}>
                      EDIT
                    </Button>
                    <Button
                      color="secondary"
                      variant="contained" 
                      onClick={() => this.deleteSeed()}>
                      DELETE
                    </Button>
                  </CustomTableCell>
                </TableRow>
                )}
            </TableBody>
          </Table>
        </Paper>
    );
  }
}

const mapStateToProps = reduxState => ({ reduxState });

export default connect(mapStateToProps)(withStyles(styles)(SeedTable));
