import React, { Component } from 'react';
import {
  Card, CardHeader, CardFooter, CardBody,
  CardTitle, ListGroup, ListGroupItem
} from 'reactstrap';
import axios from 'axios';
import { calculateTradingValue, getFiatSign, getFiatCodeLetter } from '../../utils';

export default class Tile extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      actualPrice: 0,
      setIntervalId: 0
    };
  }

  componentDidMount() {
    this.setIntervalCallback();
    const setIntervalId = setInterval( this.setIntervalCallback.bind( this ), 10000 );

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

    return `https://min-api.cryptocompare.com/data/price?fsym=${nameCrypto}&tsyms=${fiatCodeLetter}`;
  }

  setIntervalCallback() {
    const axiosUrl = this.generateAxiosUrl();
    const fiatCodeLetter = getFiatCodeLetter( this.props.fiatCrypto );
    axios.get( axiosUrl )
      .then( response => this.setState({
        actualPrice: response.data[ fiatCodeLetter ]
      }));
  }

  render() {
    const {
      dateCrypto, nameCrypto, priceCrypto, amountCrypto
    } = this.props;
    const fiatSign = this.getFiatSign();
    const tradeValue = calculateTradingValue( amountCrypto, priceCrypto );

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
          Trading @ {fiatSign} {this.state.actualPrice}
        </CardFooter>
      </Card>
    );
  }
}
