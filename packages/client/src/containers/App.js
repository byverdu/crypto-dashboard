import React, { Component, Fragment } from 'react';
import 'whatwg-fetch';
import { Button, Grid, AppBar, Toolbar, Typography } from '@material-ui/core';
import { connect } from 'react-redux';

import { fetchAllExchangesNames } from '../redux/thunks';
import {eventSourceReceived, updateTotalProfitLost } from '../redux/actions';
import CryptoForm from './CryptoForm';
import TileSection from './TileSection';

const { getAPIUrl } = require( '../clientUtils' );
const STYLE = {padding: 20};
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
    // Temp meanwhile styles aren't available
    let btnText = 'Hide';
    let tempStyle = {
      display: 'block'
    };

    if ( !showForm ) {
      btnText = 'Show';
      tempStyle = {
        display: 'none'
      };
    }
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
          container
          alignItems="center"
          direction="column"
          style={STYLE}
        >
          <Button
            onClick={this.handleShowHide}
            color="primary"
            variant="contained"
          >
            {btnText} Form
          </Button>
          <section style={tempStyle}>
            <CryptoForm />
          </section>
        </Grid>
        <Grid
          container
          direction="column"
          style={STYLE}
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

export default connect( null, mapDispatchToProps )( App );