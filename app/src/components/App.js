import React, { Component, Fragment } from 'react';
import CryptoForm from './CryptoForm';


export default class App extends Component {
  constructor() {
    super();
    this.state = {
      isValidUser: false
    };
  }

  render() {
    return (
      <Fragment>
        {this.state.isValidUser}
        {<CryptoForm/>}
      </Fragment>
    );
  }
}
