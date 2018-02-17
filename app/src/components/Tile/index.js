import React, { Component } from 'react';
import { Card } from 'reactstrap';
import axios from 'axios';
import TileBody from './TileBody';
import TileFooter from './TileFooter';
import TileHeader from './TileHeader';
import {
  calculateTradingValue,
  getValueWithFiatSign,
  getFiatCodeLetter,
  getAPIUrl,
  calculateProfitLost,
  isTradeProfitable
} from '../../../utils';

const getTileHeaderProps = props => ({ name: props.nameCrypto });

const getTileBodyProps = ( props ) => {
  const {
    dateCrypto: date,
    nameCrypto: name,
    priceCrypto: price,
    amountCrypto: amount,
    fiatCrypto: fiat
  } = props;
  const tradeValue = calculateTradingValue( amount, price );

  return {
    date,
    amount,
    name,
    price,
    tradeValue: getValueWithFiatSign( fiat, tradeValue )
  };
};

const getTileFooterProps = ( props, state ) => {
  const {
    priceCrypto: price,
    amountCrypto: amount,
    fiatCrypto: fiat
  } = props;
  const { actualPrice } = state;
  const tradeValue = calculateTradingValue( amount, price );
  const actualValue = calculateTradingValue( amount, actualPrice );
  const profitLost = calculateProfitLost( tradeValue, actualValue );
  const isProfit = isTradeProfitable( profitLost );

  return {
    actualPrice: getValueWithFiatSign( fiat, actualPrice ),
    amount,
    profitLost,
    isProfit,
    actualValue
  };
};

export default class Tile extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      actualPrice: 0,
      setIntervalId: 0
    };
  }

  componentDidMount() {
    this.getActualPriceFromAPI();
    const setIntervalId = setInterval( this.getActualPriceFromAPI.bind( this ), 10000 );

    this.setState({
      setIntervalId
    });
  }

  componentWillUnmount() {
    clearInterval( this.state.setIntervalId );
  }

  generateAxiosUrl() {
    const nameCrypto = this.props.nameCrypto.toUpperCase();
    const fiatCodeLetter = getFiatCodeLetter( this.props.fiatCrypto );

    return getAPIUrl( `fsym=${nameCrypto}&tsyms=${fiatCodeLetter}` );
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
    const tileHeaderProps = getTileHeaderProps( this.props );
    const tileBodyProps = getTileBodyProps( this.props );
    const tileFooterProps = getTileFooterProps( this.props, this.state );
    return (
      <Card>
        <TileHeader {...tileHeaderProps} />
        <TileBody {...tileBodyProps} />
        <TileFooter {...tileFooterProps} />
      </Card>
    );
  }
}
