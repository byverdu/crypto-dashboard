import React, { Component, Fragment } from 'react';
import CryptoForm from '../components/CryptoForm';
import TileSection from '../containers/TileSection';


export default class App extends Component {
  constructor() {
    super();
    this.state = {
      isValidUser: false,
      cryptoData: [
        { name: 'ETH', amount: '56', date: 'today' }
      ]
    };
  }

  render() {
    return (
      <Fragment>
        {this.state.isValidUser}
        <CryptoForm/>
        <TileSection cryptoTiles={this.state.cryptoData} />
      </Fragment>
    );
  }
}
