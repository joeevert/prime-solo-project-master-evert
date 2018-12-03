import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddSeeds from './AddSeeds'

// material ui
import { withStyles } from '@material-ui/core/styles';

const styles = ({
  root: {
      marginTop: '50px'
  }
})

class AddSeedsContainer extends Component {
  render() {
    const { classes } = this.props;
    return (
      <section className={classes.root}>
        <AddSeeds />
      </section>
    );
  }
}

const mapStateToProps = reduxState => ({ reduxState });

export default connect(mapStateToProps)(withStyles(styles)(AddSeedsContainer));
