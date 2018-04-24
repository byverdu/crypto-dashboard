import React, { Component, Fragment } from 'react';
import 'whatwg-fetch';
import { Button } from 'reactstrap';
import CryptoForm from '../components/CryptoForm';
import TileSection from '../containers/TileSection';

const { formData } = require( '../config/data' );

async function fetchExcange() {
  try {
    const response = await fetch( 'https://min-api.cryptocompare.com/data/all/exchanges' );

    if ( !response.ok ) {
      throw new Error();
    }

    const body = await response.json();
    return Object.keys( body );
  } catch ( e ) {
    console.log( e, 'error' );
    return e;
  }
}

export default class App extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      showForm: true,
      selectData: []
    };

    this.handleShowHide = this.handleShowHide.bind( this );
  }

  componentDidMount() {
    fetchExcange().then(( resp ) => {
      const selectData = resp.map( item => ({ value: item, label: item }));

      this.setState({ selectData });
    });
  }

  handleShowHide() {
    this.setState({
      showForm: !this.state.showForm
    });
  }

  render() {
    const { showForm, selectData } = this.state;
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
            selectData={selectData}
          />
        </section>
        <TileSection store={store}/>
      </Fragment>
    );
  }
}
