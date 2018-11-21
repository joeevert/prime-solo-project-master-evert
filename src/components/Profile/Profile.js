// TODO

import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Profile.css';


class Profile extends Component {

  state = {
    
  }

  render() {
    return (
      <section className="container">

        <h1 id="welcome">
          Welcome, { this.props.reduxState.user.username }!
        </h1>

        <p>Your ID is: { this.props.reduxState.user.id }</p>

        <div>
          <p>profile view --- remove</p>
          {/* display user's profile pic */}
          <div className="tablePosition">
          <img className="profilePic" src="/images/profile_pic01.jpg" alt="profile pic"/>
          <table className="seedTable">
            <thead>
              <tr>
                <th>Seed Name</th>
                <th>Description</th>
                <th>Quantity</th>
                {/* <th>Image</th> */}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Pepper</td>
                <td>This is a pepper!</td>
                <td>100</td>
                <td>
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
              <tr>
                <td>Tomato</td>
                <td>This is a tomato!</td>
                <td>200</td>
                <td>
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
          </div>
          <button>Add Seeds</button>
        </div>

      </section>
    );
  }
}

const mapStateToProps = reduxState => ({ reduxState });

export default connect(mapStateToProps)(Profile);
