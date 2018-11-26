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
      // marginTop: theme.spacing.unit * 4,
      margin: 'auto',
  },
  textField: {
      width: '300px',
      borderRadius: '5px',
      margin: theme.spacing.unit,
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

    backgroundColor: '#fff',
    borderRadius: '25px',
    textAlign: 'left', 
    paddingLeft: '20px', 
  }
})


class RequestSeeds extends Component {

  state = {
    quantity: '',
    message: '',
    user_id: null
  }

  // adds seed to user's seed inventory table
  handleRequest = (event) => {
    event.preventDefault();
    console.log('requesting seed', this.state);
    this.props.dispatch({ type: 'REQUEST_SEED', payload: this.state });
        this.setState({
            ...this.state,
            quantity: '',
            message: '',
        })
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
        {JSON.stringify(this.props.reduxState.request)}
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
          <form className={classes.form} onSubmit={this.handleSubmit}>
            {this.props.reduxState.request.map( item =>
            <div className={classes.request} key={item.id}>
              <Typography variant="h6">TO: {item.recipient}</Typography>
              <Typography variant="h6">FROM: {this.props.reduxState.user.username}</Typography>
              <Typography variant="h6">CATEGORY: {item.category}</Typography>
              <Typography variant="h6">DESCRIPTION: {item.description}</Typography>
            </div>
            )}
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
