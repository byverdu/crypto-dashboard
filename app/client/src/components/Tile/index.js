import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card } from 'reactstrap';
import * as thunks from '../../redux/thunks';
import TileBody from './TileBody';
import TileFooter from './TileFooter';
import TileHeader from './TileHeader';
// import { Form } from '../index';
import { applyValuesToInput, getInputFieldValues, getSocketResponseFlag } from '../../clientUtils';
import {
  getTileHeaderProps,
  getTileBodyProps,
  getTileFooterProps
} from './tileUtils';

// const formData = require( '../../config/data' );

class Tile extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      actualPrice: 0,
      position: this.props.position,
      showForm: false,
      pairToWatch: this.props.pairToWatch,
      priceTracker: []
    };

    this.formElement = null;
    this.onClickRemoveItem = this.onClickRemoveItem.bind( this );
    this.onClickEditItem = this.onClickEditItem.bind( this );
    this.onSubmit = this.onSubmit.bind( this );
  }

  componentWillReceiveProps( nextProps ) {
    const { pairToWatch, price, flag } = nextProps.socketData;
    let actualPrice = 0;
    console.log( nextProps );

    if ( nextProps && this.state.pairToWatch.includes( pairToWatch )) {
      if ( nextProps.fiatCrypto === 'na' ) {
        actualPrice = price;
      }
      if ( nextProps.fiatCrypto !== 'na' && Object.keys( nextProps.fiatData.priceMulti ).length > 0 ) {
        actualPrice = nextProps.fiatData.priceMulti[ nextProps.coinCrypto ][ nextProps.pairCrypto ];
      }
      // const actualPrice = nextProps.fiatCrypto === 'na' ?
      // price : nextProps.fiatData.priceMulti[ nextProps.coinCrypto ][ nextProps.pairCrypto ];

      this.setState({
        actualPrice,
        priceTracker: [
          ...this.state.priceTracker,
          {
            price,
            flag: getSocketResponseFlag( flag )
          }
        ]
      });
    }
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

  renderLastPrices() {
    return this.state.priceTracker.slice( -10 ).map(( item, index ) => (
      <div key={index}>
        <h4>{item.price}</h4>
        <img src={`./icon/${item.flag}.svg`} />
      </div>
    ));
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

  render() {
    const display = this.state.showForm ? 'block' : 'none';
    const tileHeaderProps = getTileHeaderProps(
      this.props,
      this.onClickRemoveItem,
      this.onClickEditItem,
      this.state.showForm
    );
    const tileBodyProps = getTileBodyProps( this.props );
    const tileFooterProps = getTileFooterProps( this.props, this.state );
    // const newData = applyValuesToInput( formData, this.props );

    return (
      <Card>
        <TileHeader {...tileHeaderProps} />
        <div style={{ display }}>
          {/* <Form
            formData={newData}
            onSubmit={this.onSubmit}
            refCallback={( c ) => { this.formElement = c; }}
          /> */}
        </div>
        <TileBody {...tileBodyProps} />
        <TileFooter {...tileFooterProps} />
        {this.state.priceTracker.length > 0 && this.renderLastPrices()}
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  apiData: state.api,
  fiatData: state.fiat
});

export default connect( mapStateToProps )( Tile );

Tile.propTypes = {
  position: PropTypes.number.isRequired,
  pairToWatch: PropTypes.string.isRequired,
  socketData: PropTypes.object.isRequired
};
