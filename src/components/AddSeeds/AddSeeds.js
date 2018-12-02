import React, { Component } from 'react';
import { connect } from 'react-redux';
import share_seeds from './share_seeds.jpg';
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
    width: '300px',
    padding: '10px',
    backgroundColor: '#239956',
    color: '#fff',
    margin: theme.spacing.unit,
  },
  paper: {
    width: '500px',
    height: '500px',
    borderRadius: '25px',
    margin: 'auto',
    // backgroundColor: '#67C28F',
    border: '2px solid #01632C'
  },
  form: {
    padding: '15px',
    marginTop: theme.spacing.unit * 4,
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
    // margin: '0', 
    padding: '10px',
    borderRadius: '22px 22px 0px 0px',
  },
  formControl: {
    minWidth: '300px',
    borderRadius: '5px',
    margin: theme.spacing.unit,
    backgroundColor: '#fff',
  },
})


class AddSeeds extends Component {

  state = {
    seed_id: '',
    description: '',
    quantity: '',
    user_id: null,
    editProfile: false
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

  render() {
    const { classes } = this.props;
    return (
      <section className="center">
        {/* {JSON.stringify(this.props.reduxState.category)} */}

        <Paper 
          className={classes.paper}
          style={{ backgroundImage: `url(${share_seeds})`, cursor: 'pointer'}}
        >
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
            <Button 
              className={classes.button}
              type="submit" 
              name="submit"
              variant="contained"
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
