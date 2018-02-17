import React, { Component } from 'react';
import {
  Card, CardHeader, CardFooter, CardBody,
  CardTitle, ListGroup, ListGroupItem
} from 'reactstrap';
import axios from 'axios';
import {
  calculateTradingValue, getFiatSign, getFiatCodeLetter, getAPIUrl, getProfitLost, isPositiveValue
} from '../../utils';

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

  getFiatSign() {
    return getFiatSign( this.props.fiatCrypto );
  }

  getFiatCodeLetter() {
    return getFiatCodeLetter( this.props.fiatCrypto );
  }

  generateAxiosUrl() {
    const nameCrypto = this.props.nameCrypto.toUpperCase();
    const fiatCodeLetter = getFiatCodeLetter( this.props.fiatCrypto );

    return getAPIUrl( `fsym=${nameCrypto}&tsyms=${fiatCodeLetter}` );
  }

  getActualPriceFromAPI() {
    const axiosUrl = this.generateAxiosUrl();
    const fiatCodeLetter = getFiatCodeLetter( this.props.fiatCrypto );
    axios.get( axiosUrl )
      .then( response => this.setState({
        actualPrice: response.data[ fiatCodeLetter ]
      }));
    console.log( this.state.actualPrice );
  }

  render() {
    const {
      dateCrypto, nameCrypto, priceCrypto, amountCrypto
    } = this.props;
    const { actualPrice } = this.state;
    const fiatSign = this.getFiatSign();
    const tradeValue = calculateTradingValue( amountCrypto, priceCrypto );
    const actualValue = calculateTradingValue( amountCrypto, actualPrice );
    const profitLost = getProfitLost( tradeValue, actualValue );
    const isProfit = isPositiveValue( profitLost );
    return (
      <Card>
        <CardHeader tag="h3">
          { nameCrypto }
        </CardHeader>
        <CardBody>
          <CardTitle>
            Position Details
          </CardTitle>
          <ListGroup>
            <ListGroupItem color="secondary">
              Trade date: {dateCrypto}
            </ListGroupItem>
            <ListGroupItem color="success">
              Bought {amountCrypto} {nameCrypto} @ {priceCrypto} = {fiatSign} {tradeValue}
            </ListGroupItem>
          </ListGroup>
        </CardBody>
        <CardFooter className="text-muted">
          Trading @ {fiatSign} {actualPrice} x {amountCrypto} = {fiatSign} {actualValue}
          <div className={isProfit ? 'bg-success text-white' : 'bg-danger text-white'}>
            Profit / Lost {fiatSign} {profitLost}
          </div>
        </CardFooter>
      </Card>
    );
  }
}
