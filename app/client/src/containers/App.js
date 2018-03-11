import React, { Component, Fragment } from 'react';
import { Button } from 'reactstrap';
import CryptoForm from '../components/CryptoForm';
import TileSection from '../containers/TileSection';

const { formData } = require( '../config/data' );

export default class App extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      showForm: true
    };

    this.handleShowHide = this.handleShowHide.bind( this );
  }

  handleShowHide() {
    this.setState({
      showForm: !this.state.showForm
    });
  }

  render() {
    const { showForm } = this.state;
    const { store } = this.props;
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
        <TileSection store={store}/>
      </Fragment>
    );
  }
}