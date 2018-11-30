import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import {connect} from 'react-redux';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Home from '../Home/Home';
import MapView from '../MapView/MapView';
import Profile from '../Profile/Profile';
import RequestSeeds from '../RequestSeeds/RequestSeeds';
import Messages from'../Messages/Messages';
import AddSeedsContainer from '../AddSeeds/AddSeedsContainer';
import './App.css';

class App extends Component {
  componentDidMount () {
    this.props.dispatch({type: 'FETCH_USER'});
    // this.props.dispatch({ type: 'GET_ALL_SEEDS' });
  }

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />
            {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}
            <Route
              exact
              path="/map"
              component={MapView}
            />
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
            <ProtectedRoute
              exact
              path="/home"
              component={Home}
            />
            {/* protected route */}
            <ProtectedRoute
              exact
              path="/addseeds"
              component={AddSeedsContainer}
            />
            <ProtectedRoute
              exact
              path="/profile"
              component={Profile}
            />
            <ProtectedRoute
              exact
              path="/requestseeds"
              component={RequestSeeds}
            />
            <ProtectedRoute
              exact
              path="/messages"
              component={Messages}
            />
            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
        </div>
      </Router>
  )}
}

const mapStateToProps = reduxState => ({ reduxState });

export default connect(mapStateToProps)(App);
