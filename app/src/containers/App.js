import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Button } from 'reactstrap';
import CryptoForm from '../components/CryptoForm';
import TileSection from '../containers/TileSection';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      cryptoData: [],
      showForm: true
    };

    this.handleShowHide = this.handleShowHide.bind( this );
  }

  componentDidMount() {
    axios.get( 'api/crypto' )
      .then( response => this.setState({
        cryptoData: response.data
      }));
  }

  handleShowHide() {
    this.setState({
      showForm: !this.state.showForm
    });
  }

  render() {
    // Temp meanwhile styles aren't available
    let btnText = 'Hide';
    let tempStyle = {
      display: 'block'
    };

    if ( !this.state.showForm ) {
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
          <CryptoForm />
        </section>
        <TileSection
          cryptoTiles={this.state.cryptoData}
        />
      </Fragment>
    );
  }
}
