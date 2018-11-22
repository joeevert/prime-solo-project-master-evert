// TODO
// -setup reducer and sagas for adding seed
// -figure out the location state
// -improve styling

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
      height: 400,
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
  }
  // avatar: {
  //   margin: "auto",
  //   backgroundColor: '#01632C'
  // },
})


class AddSeeds extends Component {

  state = {
    seed_category: '',
    description: '',
    quantity: '',
    location: '', // will be updated based on user's location or input address???
  }

  componentDidMount() {
    this.getCategories();
  }

  getCategories = () => {
    this.props.dispatch({ type: 'GET_CATEGORIES' });
  }

  // adds seed to user's seed inventory table
  handleSubmit = (event) => {
    event.preventDefault();
    console.log('adding seed', this.state);
    this.props.dispatch({ type: 'ADD_SEED', payload: this.state });
        this.setState({
            ...this.state,
            seed_category: '',
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

  render() {
    const { classes } = this.props;
    return (
      <section className="center">
        {JSON.stringify(this.props.reduxState.category)}
        <h1 id="welcome">
          Welcome, { this.props.reduxState.user.username }!
        </h1>

        <Paper className={classes.paper}>
          <Typography 
            className={classes.header}
            variant="h4"
            // style={{color: '#fff', fontWeight: 'bold', backgroundColor: '#01632C', margin: '0', padding: '10px'}}
          >
            ADD SEEDS
          </Typography>
          <form className={classes.form} onSubmit={this.handleSubmit}>

            <FormControl>    
              <InputLabel>Category</InputLabel>
                <Select
                  value={this.state.seed_category}
                  onChange={this.handleChangeFor('seed_category')}
                  inputProps={{
                    name: 'category_id',
                    id: '',
                  }}>
                  {/* <MenuItem value=""><em>None</em></MenuItem> */}
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

            {/* <TextField
              className={classes.textField}
              type="text" 
              placeholder="Seed Category"
              name="seed_category"
              value={this.state.seed_name}
              onChange={this.handleChangeFor('seed_category')}
            /> */}
            <TextField
              className={classes.textField}
              type="text" 
              placeholder="Description"
              name="description"
              value={this.state.description}
              onChange={this.handleChangeFor('description')}
            />
            <TextField 
              className={classes.textField}
              type="number" 
              placeholder="Quantity"
              name="quantity"
              value={this.state.quantity}
              onChange={this.handleChangeFor('quantity')}
            />
            <TextField 
              className={classes.textField}
              type="text" 
              placeholder="Location"
              name="location"
              value={this.state.location}
              onChange={this.handleChangeFor('location')}
            />
            {/* <input placeholder="Image"/> */}

            <Button type="submit" variant="contained" className={classes.button}>
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
