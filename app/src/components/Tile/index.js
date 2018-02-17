import React, { Component } from 'react';
import { Card } from 'reactstrap';
import axios from 'axios';
import TileBody from './TileBody';
import TileFooter from './TileFooter';
import TileHeader from './TileHeader';
import { getFiatCodeLetter, getAPIUrl } from '../../../utils';
import {
  getTileHeaderProps, getTileBodyProps, getTileFooterProps
} from './utils';

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
