import React, { Component, Fragment } from 'react';
import axios from 'axios';
import CryptoForm from '../components/CryptoForm';
import TileSection from '../containers/TileSection';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      cryptoData: []
    };
  }

  componentDidMount() {
    axios.get( 'api/crypto' )
      .then( response => this.setState({ cryptoData: response.data }));
  }

  render() {
    return (
      <Fragment>
        <CryptoForm/>
        <TileSection cryptoTiles={this.state.cryptoData} />
      </Fragment>
    );
  }
}
