import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card } from 'reactstrap';
import axios from 'axios'; //eslint-disable-line
import * as thunks from '../../redux/thunks';
import TileBody from './TileBody';
import TileFooter from './TileFooter';
import TileHeader from './TileHeader';
import { Form } from '../index';
import {
  getFiatCodeLetter,
  getAPIUrl,
  applyValuesToInput,
  getInputFieldValues
} from '../../clientUtils';
import {
  getTileHeaderProps,
  getTileBodyProps,
  getTileFooterProps
} from './tileUtils';

const { formData } = require( '../../config/data' );

class Tile extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      actualPrice: 0,
      position: this.props.position,
      showForm: false
    };

    this.formElement = null;
    this.onClickRemoveItem = this.onClickRemoveItem.bind( this );
    this.onClickEditItem = this.onClickEditItem.bind( this );
    this.onSubmit = this.onSubmit.bind( this );
  }

  componentDidMount() {
    this.getActualPriceFromAPI();
    this.getActualPriceFromAPI.bind( this );
  }


  onClickRemoveItem() {
    this.props.dispatch(
      thunks.deleteItemFromApi( '/api/crypto', {
        cryptoToRemove: this.state.position
      })
    );
  }

  onClickEditItem() {
    this.setState({
      showForm: !this.state.showForm
    });
  }

  onSubmit( event ) {
    event.preventDefault();
    if ( this.formElement.checkValidity()) {
      const DOMToArray = Array.from( this.formElement.elements )
        .filter( elem => elem.nodeName === 'INPUT' );
      const inputValues = getInputFieldValues( DOMToArray );

      this.props.dispatch(
        thunks.editItemFromApi( '/api/crypto', {
          data: inputValues,
          cryptoToRemove: this.state.position
        })
      )
        .then(() => {
          this.setState({
            showForm: !this.state.showForm
          });
        });
    }
  }

  generateAxiosUrl() {
    const nameCrypto = this.props.nameCrypto.toUpperCase();
    const fiatCodeLetter = getFiatCodeLetter( this.props.fiatCrypto );
    const timestamp = ( Date.parse( this.props.dateCrypto ) / 1000 );


    return getAPIUrl( `fsym=${nameCrypto}&tsyms=${fiatCodeLetter}&ts=${timestamp}` );
  }

  getActualPriceFromAPI() {
    const url = this.generateAxiosUrl();
    const fiatCodeLetter = getFiatCodeLetter( this.props.fiatCrypto );
    axios.get( url )
      .then( response => this.setState({
        actualPrice: response.data[ fiatCodeLetter ]
      }));
    console.log( this.state.actualPrice );
  }


  render() {
    const display = this.state.showForm ? 'block' : 'none';
    const tileHeaderProps = getTileHeaderProps(
      this.props,
      this.onClickRemoveItem,
      this.onClickEditItem
    );
    const tileBodyProps = getTileBodyProps( this.props );
    const tileFooterProps = getTileFooterProps( this.props, this.state );
    const newData = applyValuesToInput( formData, this.props );

    return (
      <Card>
        <TileHeader {...tileHeaderProps} />
        <div style={{ display }}>
          <Form
            data={newData}
            onSubmit={this.onSubmit}
            refCallback={( c ) => { this.formElement = c; }}
          />
        </div>
        <TileBody {...tileBodyProps} />
        <TileFooter {...tileFooterProps} />
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  apiData: state.api
});

export default connect( mapStateToProps )( Tile );
