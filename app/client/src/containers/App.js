import React, { Component, Fragment } from 'react';
import 'whatwg-fetch';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';

import * as thunks from '../redux/thunks';
import CryptoForm from '../components/CryptoForm';
import TileSection from '../containers/TileSection';

const formData = require( '../config/data' );
const { getAPIUrl } = require( '../clientUtils' );

export default class App extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      showForm: true
    };

    this.handleShowHide = this.handleShowHide.bind( this );
  }

  componentDidMount() {
    const exchangesUrl = getAPIUrl( 'all/exchanges' );
    this.context.store.dispatch(
      thunks.fetchAllExchangesNames( exchangesUrl )
    );
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
      <Fragment>
        <Button
          onClick={this.handleShowHide}
          color="primary"
        >
          {btnText} Form
        </Button>
        <section style={tempStyle}>
          <CryptoForm
            formData={formData}
          />
        </section>
        <TileSection />
      </Fragment>
    );
  }
}

App.contextTypes = {
  store: PropTypes.object
};
