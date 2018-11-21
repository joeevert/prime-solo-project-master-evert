// TODO
// -setup reducer and sagas for adding seed
// -figure out the location state
// -improve styling

import React, { Component } from 'react';
import { connect } from 'react-redux';
import './AddSeeds.css';

class AddSeeds extends Component {

  state = {
    seed_name: '',
    description: '',
    quantity: '',
    // location: '', // will be updated based on user's location or input address???
  }

  // adds seed to user's seed inventory table
  handleSubmit = (event) => {
    event.preventDefault();
    console.log('adding seed', this.state);
    this.props.dispatch({ type: 'ADD_SEED', payload: this.state });
        this.setState({
            ...this.state,
            seed_name: '',
            description: '',
            quantity: ''
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
    return (
      <section className="center">

        <h1 id="welcome">
          Welcome, { this.props.reduxState.user.username }!
        </h1>

        <p>Your ID is: { this.props.reduxState.user.id }</p>

        <div className="addSeeds">
          <h2>ADD SEEDS</h2>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text" 
              placeholder="Seed Name"
              name="seed_name"
              value={this.state.seed_name}
              onChange={this.handleChangeFor('seed_name')}
            />
            <input 
              type="text" 
              placeholder="Description"
              name="description"
              value={this.state.description}
              onChange={this.handleChangeFor('description')}
            />
            <input 
              type="number" 
              placeholder="Quantity"
              name="quantity"
              value={this.state.quantity}
              onChange={this.handleChangeFor('quantity')}
            />
            <input 
              type="text" 
              placeholder="Location"
              name="location"
              value={this.state.location}
              onChange={this.handleChangeFor('location')}
            />
            {/* <input placeholder="Image"/> */}
            <input type="submit"/>
          </form>
        </div>

      </section>
    );
  }
}

const mapStateToProps = reduxState => ({ reduxState });

export default connect(mapStateToProps)(AddSeeds);
