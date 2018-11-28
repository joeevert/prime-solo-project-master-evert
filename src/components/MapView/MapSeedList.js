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
    margin: 'auto', 
    padding: '10px',
  },
  card: {
    width: '475px',
    textAlign: 'left',
    margin: '15px',
    overflow: 'scroll',
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
    const test= this.props.reduxState.allSeeds;

    let item = [{
      id:4,
      username:"erin",
      password:"$2b$10$0fb8ytGzDGb.hAFJJV702O668O9ZjkLf4kPYYfKPdJIx7DWjHXeDS",
      first_name:"Erin",
      last_name:"Burbank",
      latitude:"44.875",
      longitude:"-93.285",
      contact:"none",
      profile_pic:"/images/profile_pic_bob.jpg",
      item_id:[49,48,47],
      description:["what is this?","gross af","berry good"],
      quantity:[310,590,320],
      seed_id:[34,18,43],
      category:["Radish","Garden Huckleberry","Sunberry"]
    }]

    // let mappingTest =
    //   item.map((taco, index) =>
    //     <div>
    //       <h2>{taco.username}</h2>
    //       {taco.category.map(ocat =><li>{ocat}</li>)}
    //       {taco.description.map(ocat =><li>{ocat}</li>)}
    //       {taco.quantity.map(ocat =><li>{ocat}</li>)}
    //       {taco.item_id.map(ocat =><li>{ocat}</li>)}
    //     </div>
    // );

    return (
      <div>
        {/* {JSON.stringify(this.props.reduxState.allSeeds)} */}

      {/* <div>
        <ul>
          {mappingTest}
        </ul>
      </div> */}

          <Typography
            className={classes.header} 
            variant="h6"
          >
            SEEDS AVAILABLE
          </Typography>
          <List className="mapList">
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
                <Grid item xs={9}>
                <section style={{margin: 'auto'}}>
                  <div style={{display: 'inline-block', marginRight:'20px'}}>
                    {item.category.map((category, index) =>
                      <li key={index} style={{height: '30px'}}>
                        {category}
                      </li>)}
                  </div>
                  <div style={{display: 'inline-block', marginRight:'20px'}}>
                    {item.description.map((description, index) =>
                      <li key={index} style={{height: '30px'}}>
                        {description}
                      </li>)}
                  </div>
                  <div style={{display: 'inline-block'}}>
                    {item.quantity.map((quantity, index) =>
                      <li key={index} style={{height: '30px'}}>
                        {quantity}
                      </li>)}
                  </div>
                  <div style={{display: 'inline-block'}}>
                    {item.item_id.map((item_id, index) =>
                      <li key={index} style={{height: '30px'}}>
                        <Button
                          size='small'
                          color='primary'
                          style={{display: 'inline-block', marginLeft:'20px'}} 
                          onClick={() => this.requestBtn(item_id)}
                          >
                          REQUEST
                        </Button>
                      </li>)}
                  </div>
                </section>
                </Grid>
                </Grid>
              </Card>
            )}
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
