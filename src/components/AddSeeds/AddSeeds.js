// TODO
// -figure out the location state


import React, { Component } from 'react';
import { connect } from 'react-redux';
import './AddSeeds.css';

import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';

const styles = theme => ({
  button: {
      width: 300,
      padding: 10,
      backgroundColor: '#239956',
      margin: theme.spacing.unit,
  },
  paper: {
      width: 400,
      borderRadius: 25,
      margin: "auto",
      marginTop: theme.spacing.unit * 10,
      backgroundColor: '#67C28F',
      border: '2px solid #01632C'
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
  header: {
    color: '#fff', 
    fontWeight: 'bold', 
    backgroundColor: '#01632C', 
    margin: '0', 
    padding: '10px',
    borderRadius: '22px 22px 0px 0px',
  },
  formControl: {
      width: 300,
      borderRadius: 5,
      margin: theme.spacing.unit,
      backgroundColor: '#fff'
  },
  // avatar: {
  //   margin: "auto",
  //   backgroundColor: '#01632C'
  // },
})


class AddSeeds extends Component {

  state = {
    seed_id: '',
    description: '',
    quantity: '',
    // location: '', // will be updated based on user's location or input address???
    user_id: null,
    lat: 0,
    lng: 0
  }

  componentDidMount() {
    this.getCategories();
    // set user id to current user
    this.setState({
      ...this.state,
      user_id: this.props.reduxState.user.id
    })
  }

  getCategories = () => {
    this.props.dispatch({ type: 'GET_CATEGORIES' });
    this.getGeoLocation();
  }

  // adds seed to user's seed inventory table
  handleSubmit = (event) => {
    event.preventDefault();
    console.log('adding seed', this.state);
    this.props.dispatch({ type: 'ADD_SEED', payload: this.state });
        this.setState({
            ...this.state,
            seed_id: '',
            description: '',
            quantity: '',
            location: '',
        })
  }

  // handles input changes
  handleChangeFor = (propertyName) => (event) => {
    this.setState({
        ...this.state,
        [propertyName]: event.target.value
    })
  }

  getGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // console.log('add seeds location:', position.coords);
          this.setState({
              ...this.state,
              lat: position.coords.latitude,
              lng: position.coords.longitude
          })
        }
      )
    }
    else {
			alert('Location services not supported by your browser');
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <section className="center">
        {/* {JSON.stringify(this.props.reduxState.category)} */}
        <h1 id="welcome">
          Welcome, { this.props.reduxState.user.username }!
        </h1>

        <Paper className={classes.paper}>
          <Typography 
            className={classes.header}
            variant="h4"
          >
            ADD SEEDS
          </Typography>
          <form className={classes.form} onSubmit={this.handleSubmit}>

            <FormControl className={classes.formControl}>    
              <InputLabel>Category</InputLabel>
                <Select
                  required
                  value={this.state.seed_id}
                  onChange={this.handleChangeFor('seed_id')}
                  inputProps={{
                    name: 'seed_id',
                    id: 'seed_id',
                  }}
                  variant="outlined"
                > 
                <MenuItem value=""><em>None</em></MenuItem>
                {this.props.reduxState.category.map( seed => 
                <MenuItem 
                  key={seed.id} 
                  value={seed.id}
                >
                  {seed.seed_category}
                </MenuItem>)}
              </Select>
            </FormControl>
              <br/>
            <TextField
              className={classes.textField}
              required
              id="description"
              label="Description"
              type="text"
              name="description"
              value={this.state.description}
              onChange={this.handleChangeFor('description')}
              margin="normal"
              variant="outlined"
            />
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
            {/* <TextField 
              className={classes.textField}
              required
              id="location"
              label="Location"
              type="text" 
              name="location"
              value={this.state.location}
              onChange={this.handleChangeFor('location')}
              margin="normal"
              variant="outlined"
            /> */}
            <Button 
              className={classes.button}
              type="submit" 
              name="submit"
              variant="contained" 
              style={{ backgroundColor: '#239956', color: '#fff' }}
            >
              Submit
            </Button>
          </form>
        </Paper>
      </section>
    );
  }
}

AddSeeds.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = reduxState => ({ reduxState });

export default connect(mapStateToProps)(withStyles(styles)(AddSeeds));
