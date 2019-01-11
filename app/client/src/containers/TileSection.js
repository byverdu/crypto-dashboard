import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCryptocompareApi, fetchApiData } from '../redux/thunks';
import Tile from './Tile';
import Info from '../components/Info';
import {
  socketSubscriptionGenerator,
  getCryptoPairToWatch,
  generateSubscription,
  getSocketUrl,
  generateUnsubscribe,
  getSocketResponseFlag,
  getSocketData,
  getFiatToWatch,
  getAPIUrlPriceMulti
} from '../clientUtils';

const socket = require( 'socket.io-client' )( getSocketUrl());

class TileSection extends Component {
  constructor( props ) {
    super( props );

    this.state = {
      cryptos: [],
      socketData: [],
      dataFetched: false
    };

    this.showStatusInfo = true;
    this.fiatToWatch = {
      coins: [],
      fiats: []
    };
    this.setIntervalID = null;

    this.fetchCryptocompareMultiApi = this.fetchCryptocompareMultiApi.bind( this );
    this.tileRenderer = this.tileRenderer.bind( this );
  }

  componentDidMount() {
    this.context.store.subscribe(() => {
      const cryptos = this.context.store.getState().apiReducer.data;
      this.showStatusInfo = false;
      this.setState({
        cryptos
      }, () => { this.showStatusInfo = false; });
    });

    this.props.fetchApiData( '/api/portfolio' )
      .then(() => {
        this.showStatusInfo = false;
      });
  }

  componentWillReceiveProps( nextProps ) {
    const oldProps = this.props.apiReducer.data.map(
      item => socketSubscriptionGenerator( item.exchangeData )
    );
    const newProps = nextProps.apiReducer.data.map(
      item => socketSubscriptionGenerator( item.exchangeData )
    );

    const subscriptions = generateSubscription( oldProps, newProps );
    const unsubscribe = generateUnsubscribe( oldProps, newProps );

    if ( nextProps ) {
      getFiatToWatch( this.fiatToWatch, nextProps.apiReducer.data );
    }

    socket.emit( 'SubAdd', { subs: subscriptions });
    socket.on( 'm', ( message ) => {
      if ( message.charAt( 0 ) !== '3' ) {
        const socketData = getSocketData( message );
        if ( getSocketResponseFlag( socketData.flag ) !== 'PRICEUNCHANGED' ) {
          const tradePosition = this.state.socketData.findIndex( item => item.pairToWatch === socketData.pairToWatch );

          if ( tradePosition === -1 ) {
            const newState = [socketData, ...this.state.socketData];
            this.setState({ socketData: newState });
          }

          const trade = this.state.socketData.find( item => item.pairToWatch === socketData.pairToWatch );

          if ( trade && ( socketData.price !== trade.price )) {
            const clone = this.state.socketData.slice();
            clone[ tradePosition ] = socketData;
            this.setState({ socketData: clone });
          }
        }
      }
    });

    if ( unsubscribe.length > 0 ) {
      socket.emit( 'SubRemove', { subs: unsubscribe });
    }
  }

  /* eslint-disable class-methods-use-this */
  componentWillUnmount() {
    socket.disconnect();
  }
  /* eslint-enable */

  fetchCryptocompareMultiApi() {
    const { fiats, coins } = this.fiatToWatch;
    if ( coins.length > 0 && fiats.length > 0 ) {
      const url = getAPIUrlPriceMulti( this.fiatToWatch );

      this.props.fetchCryptocompareApi( url, 'multi' );
    }
  }

  tileRenderer() {
    const { socketData } = this.state;
    return this.state.cryptos.map(( tile, key ) => {
      const pairToWatch = getCryptoPairToWatch(
        socketSubscriptionGenerator( tile.exchangeData )
      );
      const tempSocketData = socketData.find( item => item.pairToWatch === pairToWatch );

      return (
        <Fragment key={key}>
          <Tile
            position={key}
            pairToWatch={pairToWatch}
            socketData={tempSocketData}
            {...tile}
          />
        </Fragment>
      );
    });
  }

  render() {
    const { api, tileSection } = this.props;
    const infoType = api.status === 200 ? 'info' : 'warning';

    return (
      <Fragment>
        {this.showStatusInfo &&
          <Info message={api.message} type={infoType} />
        }
        <h1>
          Total Invested: {tileSection.totalInvested}
        </h1>
        <h1>
          New Total Invested: {this.state.socketData.length === 0 ? 'Loading data...' : ( tileSection.totalProfitLost ).toFixed( 4 )}
        </h1>
        <h1>
          Total Profit/Lost: {this.state.socketData.length === 0 ? 'Loading data...' : ( tileSection.totalProfitLost - tileSection.totalInvested ).toFixed( 4 ) }
        </h1>
        {this.tileRenderer()}
      </Fragment>
    );
  }
}

TileSection.contextTypes = {
  store: PropTypes.object
};

const mapStateToProps = ({ apiReducer, tileSectionReducer }) => ({
  api: apiReducer,
  tileSection: tileSectionReducer
});

const mapDispatchToProps = dispatch => ({
  fetchCryptocompareApi: ( url, endPoint ) => dispatch(
    fetchCryptocompareApi( url, endPoint )
  ),
  fetchApiData: url => dispatch(
    fetchApiData( url )
  )
});

export default connect( mapStateToProps, mapDispatchToProps )( TileSection );
