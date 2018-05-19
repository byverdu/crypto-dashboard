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
  getSocketData
} from '../clientUtils';

const socket = require( 'socket.io-client' )( getSocketUrl());

class TileSection extends Component {
  constructor( props ) {
    super( props );

    this.state = {
      cryptos: [],
      socketData: []
    };

    this.showInfoComponent = true;
  }

  componentDidMount() {
    this.props.store.subscribe(() => {
      const cryptos = this.props.store.getState().api.data;
      this.showInfoComponent = false;
      this.setState({
        cryptos
      }, () => { this.showInfoComponent = true; });
    });

    this.props.dispatch(
      thunks.fetchApiData( '/api/crypto' )
    );
  }

  componentWillReceiveProps( nextProps ) {
    const oldProps = this.props.apiData.data.map( item => socketSubscriptionGenerator( item ));
    const newProps = nextProps.apiData.data.map( item => socketSubscriptionGenerator( item ));
    const subscriptions = generateSubscription( oldProps, newProps );
    const unsubscribe = generateUnsubscribe( oldProps, newProps );

    socket.emit( 'SubAdd', { subs: subscriptions });
    socket.on( 'm', ( message ) => {
      const socketData = getSocketData( message );
      console.log( socketData );

      if ( getSocketResponseFlag( socketData[ socketData.length - 2 ]) !== 'PRICEUNCHANGED' ) {
        this.setState({ socketData });
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
        {this.showInfoComponent &&
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
