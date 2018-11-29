import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from "react-router";
import MapCard from './MapCard';
import './MapContainer.css';

// material ui
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  button: {
    padding: 10,
    backgroundColor: '#239956',
    margin: theme.spacing.unit,
  },
  header: {
    color: '#fff', 
    fontWeight: 'bold', 
    backgroundColor: '#01632C', 
    marginBottom: '10px', 
    padding: '10px',
  },
  card: {
    width: '600px',
    textAlign: 'left',
    margin: 'auto',
    marginBottom: '15px'
  },
  avatar: {
    margin: '20px',
    width: 85,
    height: 85,
    backgroundColor: '#ddd'
  }, 
})

class MapSeedList extends Component {
  
  requestBtn = (id) => {
    console.log('request button clicked', id);
    this.props.dispatch({ type: 'GET_SEED_REQUEST',  payload: id});
    this.props.history.push('/requestseeds');
  }
  
  render() {
    const { classes } = this.props;
    return (
      <div>
        {/* {JSON.stringify(this.props.reduxState.allSeeds)} */}
          <Typography
            className={classes.header} 
            variant="h6"
          >
            SEEDS AVAILABLE
          </Typography>
          <List>
            <MapCard />
          </List>
      </div>
    );
  }
}

MapSeedList.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = reduxState => ({ reduxState });

export default connect(mapStateToProps)(withStyles(styles)(withRouter(MapSeedList)));
