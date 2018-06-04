import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as thunks from '../redux/thunks';
import Tile from '../components/Tile';
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
  }

  componentDidMount() {
    this.props.store.subscribe(() => {
      const cryptos = this.props.store.getState().api.data;
      this.showStatusInfo = false;
      this.setState({
        cryptos
      }, () => { this.showStatusInfo = true; });
    });

    // const { fiats, coins } = this.fiatToWatch;
    // if ( coins.length > 0 && fiats.length > 0 ) {
    //   const url = getAPIUrlPriceMulti( this.fiatToWatch );

    //   this.props.dispatch(
    //     thunks.fetchCryptocompareApi( url, 'multi' )
    //   );
    // }

    this.props.dispatch(
      thunks.fetchApiData( '/api/crypto' )
    ).then(() => {
      this.fetchCryptocompareMultiApi();
      // this.setIntervalID = setInterval( this.fetchCryptocompareMultiApi.bind( this ), 10000 );
    });
  }

  componentWillReceiveProps( nextProps ) {
    const oldProps = this.props.apiData.data.map( item => socketSubscriptionGenerator( item ));
    const newProps = nextProps.apiData.data.map( item => socketSubscriptionGenerator( item ));
    const subscriptions = generateSubscription( oldProps, newProps );
    const unsubscribe = generateUnsubscribe( oldProps, newProps );

    if ( nextProps ) {
      getFiatToWatch( this.fiatToWatch, nextProps.apiData.data );
    }

    socket.emit( 'SubAdd', { subs: subscriptions });
    socket.on( 'm', ( message ) => {
      const socketData = getSocketData( message );
      console.log( socketData );

      if ( getSocketResponseFlag( socketData.flag ) !== 'PRICEUNCHANGED' ) {
        this.setState({ socketData },
          () => this.fetchCryptocompareMultiApi());
      }
    });

    if ( unsubscribe.length > 0 ) {
      socket.emit( 'SubRemove', { subs: unsubscribe });
    }
  }

  /* eslint-disable class-methods-use-this */
  componentWillUnmount() {
    socket.disconnect();
    clearInterval( this.setIntervalID );
  }
  /* eslint-enable */

  fetchCryptocompareMultiApi() {
    const { fiats, coins } = this.fiatToWatch;
    if ( coins.length > 0 && fiats.length > 0 ) {
      const url = getAPIUrlPriceMulti( this.fiatToWatch );

      this.props.dispatch(
        thunks.fetchCryptocompareApi( url, 'multi' )
      );
    }
  }

  tileRenderer() {
    const { socketData } = this.state;
    return this.state.cryptos.map(( tile, key ) => {
      const pairToWatch = getCryptoPairToWatch(
        socketSubscriptionGenerator( tile )
      );

      return (
        <Fragment key={key}>
          <Tile
            position={key}
            pairToWatch={pairToWatch}
            socketData={socketData}
            {...tile}
          />
        </Fragment>
      );
    });
  }

  render() {
    const { apiData } = this.props;
    const infoType = apiData.status === 200 ? 'info' : 'danger';

    return (
      <Fragment>
        {this.showStatusInfo &&
          <Info fade text={apiData.message} type={infoType} />
        }
        {this.tileRenderer()}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  apiData: state.api
});

export default connect( mapStateToProps )( TileSection );
