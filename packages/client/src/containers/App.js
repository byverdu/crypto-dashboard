import React, { Component } from 'react';
import 'whatwg-fetch';
import { Button, Grid, AppBar, Toolbar, Typography, withStyles } from '@material-ui/core';
import { connect } from 'react-redux';

import { fetchAllExchangesNames } from '../redux/thunks';
import {eventSourceReceived, updateTotalProfitLost } from '../redux/actions';
import CryptoForm from './CryptoForm';
import TileSection from './TileSection';

const { getAPIUrl } = require( '../clientUtils' );

const styles = theme => ({
  root: {
    padding: 20,
    maxWidth: 1500,
    margin: '0 auto'
  },
  show: {
    display: 'block'
  },
  hide: {
    display: 'none'
  }
});
class App extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      showForm: true
    };

    this.handleShowHide = this.handleShowHide.bind( this );
    this.eventSource = new EventSource( 'http://localhost:5000/events' );
  }

  componentDidMount() {
    this.props.fetchAllExchangesNames( getAPIUrl( 'all/exchanges' ));

    this.eventSource.onmessage = e => this.onMessageHandler( e );
  }

  onMessageHandler = ( msg ) => {
    console.log( JSON.parse( msg.data ));
    this.props.eventSourceReceived(JSON.parse( msg.data ));
    this.props.updateTotalProfitLost();
  }

  handleShowHide() {
    this.setState({
      showForm: !this.state.showForm
    });
  }

  render() {
    const { showForm } = this.state;
    const { classes } = this.props;
    const btnText = showForm ? 'Hide' : 'Show';
  
    return (
      <Grid 
        container
        direction="column"
        justify="center"
      >
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              Crypto Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid
          xl={12}
          container
          alignItems="center"
          direction="column"
          spacing={24}
          className={classes.root}
        >
          <Button
            onClick={this.handleShowHide}
            color="primary"
            variant="contained"
          >
            {btnText} Form
          </Button>
          <section className={showForm ? classes.show :  classes.hide}>
            <CryptoForm />
          </section>
        </Grid>
        <Grid
          container
          direction="column"
          className={classes.root}
        >
          <TileSection />
        </Grid>
      </Grid>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchAllExchangesNames: exchangesUrl => dispatch( fetchAllExchangesNames( exchangesUrl )),
  eventSourceReceived: data => dispatch( eventSourceReceived( data )),
  updateTotalProfitLost: () => dispatch( updateTotalProfitLost()),
});

export default withStyles(styles)(connect( null, mapDispatchToProps )( App ));
