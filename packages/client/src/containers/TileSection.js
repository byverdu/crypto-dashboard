import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCryptocompareApi, fetchApiData } from '../redux/thunks';
import { updateSubscriptions } from '../redux/actions/tileSection';
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
  getAPIUrlPriceMulti,
  deleteRepeatedItems
} from '../clientUtils';
// import tileSection from '../redux/reducers/tileSection';

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

    this.fetchCryptocompareMultiApi = this.fetchCryptocompareMultiApi.bind( this );
  }

  componentDidMount() {
    this.context.store.subscribe(() => {
      const cryptos = this.context.store.getState().apiReducer.data;
      this.showStatusInfo = false;
      this.setState({
        cryptos
      }, () => { this.showStatusInfo = false; });
    });

    this.props.fetchApiData( 'http://localhost:9000/api/portfolio' )
      .then(() => {
        this.showStatusInfo = false;
      });
  }

  componentWillReceiveProps( nextProps ) {
    // const oldProps = this.props.api.data.map(
    //   item => socketSubscriptionGenerator( item.exchangeData )
    // );
    // const newProps = nextProps.api.data.map(
    //   item => socketSubscriptionGenerator( item.exchangeData )
    // );

    // const subscriptions = generateSubscription( oldProps, newProps );
    // const unsubscribe = generateUnsubscribe( oldProps, newProps );
    const subscriptions = nextProps.tileSection.pairsToSubscribe.filter( item => item.subscribed === false );

    // if ( nextProps.fiatName !== 'NA' ) {
    //   const { exchangeData: { selectedExchange } } = nextProps;
    //   subscriptions.push( '2~' );
    // }

    if ( nextProps ) {
      getFiatToWatch( this.fiatToWatch, nextProps.api.data );
    }

    const puta = this.triggerSubscription( nextProps );


    // if ( subscriptions.length > 0 && puta ) {
    // socket.emit( 'SubAdd', { subs: subscriptions });
    // socket.on( 'm', ( message ) => {
    //   if ( message.charAt( 0 ) !== '3' ) {
    //     const socketData = getSocketData( message );
    //     if ( getSocketResponseFlag( socketData.flag ) !== 'PRICEUNCHANGED' ) {
    //       const tradePosition = this.state.socketData.findIndex( item => item.pairToWatch === socketData.pairToWatch );

    //       if ( tradePosition === -1 ) {
    //         const newState = [socketData, ...this.state.socketData];
    //         this.setState({ socketData: newState });
    //       }

    //       const trade = this.state.socketData.find( item => item.pairToWatch === socketData.pairToWatch );

    //       if ( trade && ( socketData.price !== trade.price )) {
    //         const clone = this.state.socketData.slice();
    //         clone[ tradePosition ] = socketData;
    //         this.setState({ socketData: clone });
    //       }
    //     }
    //   }
    // });
    // // }

    // // if ( subscriptions.length > 0 && puta ) {
    // //   const pairsToSubscribed = subscriptions.map( item => ({ pairToWatch: item, subscribed: true }));
    // //   this.props.updateSubscriptions( pairsToSubscribed );
    // // }

    // if ( this.props.tileSection.pairsToUnsubscribe > 0 ) {
    //   socket.emit( 'SubRemove', { subs: subscriptions });
    // }
  }

  /* eslint-disable class-methods-use-this */
  componentWillUnmount() {
    socket.disconnect();
  }
  /* eslint-enable */

  triggerSubscription = props => props.tileSection.pairsToSubscribe.every( item => item.subscribed === false )

  fetchCryptocompareMultiApi() {
    const { fiats, coins } = this.fiatToWatch;
    if ( coins.length > 0 && fiats.length > 0 ) {
      const url = getAPIUrlPriceMulti( this.fiatToWatch );

      this.props.fetchCryptocompareApi( url, 'multi' );
    }
  }

  tileRenderer = () => {
    const { socketData } = this.state;
    return this.state.cryptos.map(( tile, key ) => {
      // const pairToWatch = getCryptoPairToWatch(
      //   socketSubscriptionGenerator( tile.exchangeData )
      // );
      const pairToWatch = '';
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
  ),
  updateSubscriptions: subscriptions => dispatch( updateSubscriptions( subscriptions ))
});

export default connect( mapStateToProps, mapDispatchToProps )( TileSection );
