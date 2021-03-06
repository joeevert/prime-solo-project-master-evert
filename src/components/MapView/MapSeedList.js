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

const styles = ({
  header: {
    color: '#fff', 
    fontWeight: 'bold', 
    backgroundColor: '#01632C', 
    marginBottom: '10px', 
    padding: '10px',
  }
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
            AVAILABLE IN YOUR AREA
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
