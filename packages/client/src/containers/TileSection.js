import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCryptocompareApi, fetchApiData } from '../redux/thunks';
import { updateSubscriptions } from '../redux/actions/tileSection';
import Tile from './Tile';
import Info from '../components/Info';
import { getAPIUrlPriceMulti, toLocaleString } from '../clientUtils';

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
    this.props.fetchApiData( 'http://localhost:9000/api/portfolio' )
      .then(() => {
        this.showStatusInfo = false;
      });
  }

  componentWillReceiveProps( nextProps ) {}

  fetchCryptocompareMultiApi() {
    const { fiats, coins } = this.fiatToWatch;
    if ( coins.length > 0 && fiats.length > 0 ) {
      const url = getAPIUrlPriceMulti( this.fiatToWatch );

      this.props.fetchCryptocompareApi( url, 'multi' );
    }
  }

  tileRenderer = () => {
    const {tileSection, api} = this.props;
    if (tileSection.compareApiData.length > 0) {
      return api.data.map(( tile, key ) => {
        const tempSocketData = tileSection.compareApiData.find( item => item.pairToWatch === tile.pairToWatch);

        return (
          <Fragment key={key}>
            <Tile
              position={key}
              pairToWatch={tile.pairToWatch}
              socketData={{...tempSocketData}}
              {...tile}
            />
          </Fragment>
        );
      });
    } else {
      const msg = 'Initial payload not received yet.'
      return (<Info message={msg} type="info" />)
    }
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
          Total Invested: {toLocaleString(tileSection.totalInvested)}
        </h1>
        <h1>
          New Total Invested: {api.data.length === 0 ? 'Loading data...' : toLocaleString( tileSection.totalProfitLost, 4 )}
        </h1>
        <h1>
          Total Profit/Lost: {api.data.length === 0 ? 'Loading data...' : toLocaleString( tileSection.totalProfitLost - tileSection.totalInvested, 4 )}
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
