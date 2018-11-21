import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';

// TODO
// -update the Links for Messages and Profile
// -fix the logout button's position
// -fix Links to match wireframe styling

const Nav = (props) => (
  <div className="nav">

    <Link to="/home">
      <h2 className="nav-title">SEED SHARE</h2>
    </Link>

    <div>

      <Link className="nav-link" to="/home">
        {/* Show this link if they are logged in or not,
        but call this link 'Home' if they are logged in,
        and call this link 'Login / Register' if they are not */}
        {props.user.id ? 'Home' : 'Login / Register'}
      </Link>

      {/* Show the link to the info page and the logout button if the user is logged in */}
      {props.user.id && (
        <>
          <Link className="nav-link" to="/addseeds">
            Add Seeds
          </Link>
          <Link className="nav-link" to="/addseeds">
            Messages
          </Link>
          <Link className="nav-link" to="/profile">
            Profile
          </Link>
          <LogOutButton className="nav-link"/>
        </>
      )}

      {/* Always show this link since the about page is not protected */}
      <Link className="nav-link" to="/map">
        Map
      </Link>

    </div>

  </div>
);

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links 
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Nav);
