import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from "react-router";
import './MapContainer.css';

import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import Avatar from '@material-ui/core/Avatar';
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
    margin: '0', 
    padding: '10px',
  },
  card: {
    textAlign: 'left',
    padding: '15px',
    margin: '25px'
  },
  avatar: {
    margin: 10,
    width: 80,
    height: 80,
    backgroundColor: '#ddd'
  }, 
})

class MapSeedList extends Component {
  
  requestBtn = (id) => {
    console.log('request button clicked');
    this.props.dispatch({ type: 'GET_SEED_REQUEST',  payload: id});
    this.props.history.push('/requestseeds');
  }
  
  render() {
    const { classes } = this.props;
    return (
      <div>
          <Typography
            className={classes.header} 
            variant="h6"
          >
            SEEDS AVAILABLE
          </Typography>
          <List className="mapList">
            {this.props.reduxState.allSeeds.map( item =>
              <Card className={classes.card} key={item.id}>
                <Avatar 
                  className={classes.avatar}
                  alt={item.username}
                  src={item.profile_pic}
                />
                <Typography variant='h6'>{item.username}</Typography>
                <span>
                  <b>{item.category}:</b> {item.description}
                </span>
                <Button
                  className={classes.button}
                  onClick={() => this.requestBtn(item.id)}
                  style={{ backgroundColor: '#239956', color: '#fff' }}
                >
                  REQUEST
                </Button>
              </Card>)}
              {JSON.stringify(this.props.reduxState.allSeeds)}
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
