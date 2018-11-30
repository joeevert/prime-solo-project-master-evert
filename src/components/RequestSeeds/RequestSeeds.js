import React, { Component } from 'react';
import { connect } from 'react-redux';
// import './AddSeeds.css';

import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  button: {
      width: '300px',
      padding: '10px',
      backgroundColor: '#239956',
      margin: theme.spacing.unit,
  },
  paper: {
      width: '400px',
      borderRadius: '25px',
      margin: 'auto',
      // marginTop: theme.spacing.unit * 10,
      backgroundColor: '#67C28F',
      border: '2px solid #01632C'
  },
  form: {
      textAlign: "center",
      padding: 15,
      margin: 'auto',
  },
  textField: {
      width: '300px',
      borderRadius: '5px',
      margin: '0px 0px 10px 0px',
      backgroundColor: '#fff'
  },
  header: {
    color: '#fff', 
    fontWeight: 'bold', 
    backgroundColor: '#01632C', 
    margin: '0', 
    padding: '10px',
    borderRadius: '22px 22px 0px 0px',
  },
  request: {
    width: '300px',
    margin: 'auto',
  },
  populatedItems: {
    width: '280px',
    padding: '10px',
    textAlign: 'left', 
    borderRadius: '5px',
    margin: '0px 0px 10px 0px',
    backgroundColor: '#fff',
  }
})

class RequestSeeds extends Component {

  state = {
    line_item: '',
    received_by: '',
    sent_by: '',
    quantity: '',
    message: '',
  }

  // adds seed to user's seed inventory table
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
    this.props.history.push('/map'); // back to map or somewhere else???
  }

  // handles input changes
  handleChangeFor = (propertyName) => (event) => {
    this.setState({
        ...this.state,
        [propertyName]: event.target.value
    })
  }

  render() {
    const { classes } = this.props;
    return (
      <section className="center">
        {/* {JSON.stringify(this.props.reduxState.request)} */}
        {/* {JSON.stringify(this.props.reduxState.user)} */}
        {/* <p>state: {JSON.stringify(this.state)}</p> */}

        <h1 id="welcome">
          Welcome, { this.props.reduxState.user.username }!
        </h1>

        <Paper className={classes.paper}>
          <Typography 
            className={classes.header}
            variant="h4"
          >
            REQUEST SEEDS
          </Typography>
          <form className={classes.form} onSubmit={this.handleRequest}>
            
            <div className={classes.request}>
              <Typography className={classes.populatedItems} variant="h6">To: {this.props.reduxState.request.recipient}</Typography>
              {/* <Typography className={classes.populatedItems} variant="h6">ID: {this.props.reduxState.request.user_id}</Typography> */}
              <Typography className={classes.populatedItems} variant="h6">Category: {this.props.reduxState.request.category}</Typography>
              <Typography className={classes.populatedItems} variant="h6">Description: {this.props.reduxState.request.description}</Typography>
            </div> 
            <TextField 
              className={classes.textField}
              required
              id="quantity"
              label="Quantity"
              type="number" 
              name="quantity"
              value={this.state.quantity}
              onChange={this.handleChangeFor('quantity')}
              margin="normal"
              variant="outlined"
            />
            <TextField 
              className={classes.textField}
              required
              id="message"
              label="Message"
              type="text" 
              name="message"
              value={this.state.message}
              onChange={this.handleChangeFor('message')}
              margin="normal"
              variant="outlined"
            />
            <Button 
              className={classes.button}
              type="submit" 
              name="submit"
              variant="contained" 
              style={{ backgroundColor: '#239956', color: '#fff' }}
            >
              Submit Request
            </Button>
          </form>
        </Paper>
      </section>
    );
  }
}

RequestSeeds.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = reduxState => ({ reduxState });

export default connect(mapStateToProps)(withStyles(styles)(RequestSeeds));
