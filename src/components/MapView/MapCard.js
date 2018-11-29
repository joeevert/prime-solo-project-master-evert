import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from "react-router";
import './MapContainer.css';

import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
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
    // overflow: 'scroll',
  },
  avatar: {
    margin: '20px',
    width: 85,
    height: 85,
    backgroundColor: '#ddd'
  }, 
})

class MapCard extends Component {
  
  requestBtn = (id) => {
    console.log('request button clicked', id);
    this.props.dispatch({ type: 'GET_SEED_REQUEST',  payload: id});
    this.props.history.push('/requestseeds');
  }
  
  render() {
    const { classes } = this.props;
    return (
        <div>
            {this.props.reduxState.allSeeds.map( item =>
              <Card className={classes.card} key={item.id}>
              <Grid container spacing={8}>
                <Grid item xs={3} style={{backgroundColor: '#239956'}}>
                <Avatar 
                  className={classes.avatar}
                  alt={item.username}
                  src={item.profile_pic}
                  style={{display: 'inline-block', marginRight:'20px'}}
                />
                {/* <Typography variant='h6' style={{textAlign: 'center'}}>{item.username}</Typography> */}
                </Grid>
                <Grid item xs={9} style={{padding: '20px'}}>
                  <section style={{margin: 'auto'}}>
                    <div style={{display: 'inline-block', marginRight:'20px'}}>
                      {item.category.map((category, index) =>
                        <p key={index} style={{height: '30px'}}>
                          {category}
                        </p>)}
                    </div>
                    <div style={{display: 'inline-block', marginRight:'20px'}}>
                      {item.description.map((description, index) =>
                        <p key={index} style={{height: '30px'}}>
                          {description}
                        </p>)}
                    </div>
                    <div style={{display: 'inline-block'}}>
                      {item.quantity.map((quantity, index) =>
                        <p key={index} style={{height: '30px'}}>
                          {quantity}
                        </p>)}
                    </div>
                    <div style={{display: 'inline-block'}}>
                      {item.item_id.map((item_id, index) =>
                        <p key={index} style={{height: '30px'}}>
                          <Button
                            size='small'
                            color='primary'
                            style={{display: 'inline-block', marginLeft:'20px'}} 
                            onClick={() => this.requestBtn(item_id)}
                            >
                            REQUEST
                          </Button>
                        </p>)}
                    </div>
                  </section>
                  </Grid>
                </Grid>
              </Card>
            )}
        </div>
    );
  }
}

MapCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = reduxState => ({ reduxState });

export default connect(mapStateToProps)(withStyles(styles)(withRouter(MapCard)));
