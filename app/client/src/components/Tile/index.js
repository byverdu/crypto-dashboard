import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card } from 'reactstrap';
import axios from 'axios'; //eslint-disable-line
import * as thunks from '../../redux/thunks';
import TileBody from './TileBody';
import TileFooter from './TileFooter';
import TileHeader from './TileHeader';
import {
  getFiatCodeLetter,
  getAPIUrl
} from '../../clientUtils';
import {
  getTileHeaderProps,
  getTileBodyProps,
  getTileFooterProps
} from './tileUtils';

class Tile extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      actualPrice: 0,
      position: this.props.position
    };
    this.count = 0;
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
    const tileHeaderProps = getTileHeaderProps( this.props, this.onClickRemoveItem.bind( this ));
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

const mapStateToProps = state => ({
  apiData: state.api
});

export default connect( mapStateToProps )( Tile );
