import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCryptocompareApi, fetchApiData } from '../redux/thunks';
import { updateSubscriptions } from '../redux/actions/tileSection';
import Tile from './Tile';
import {Info, Summary} from '../components';
import { getAPIUrlPriceMulti, toLocaleString } from '../clientUtils';
import { Card, CardHeader, Typography, Grid } from '@material-ui/core';

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

    // this.fetchCryptocompareMultiApi = this.fetchCryptocompareMultiApi.bind( this );
  }

  componentDidMount() {
    this.props.fetchApiData( 'http://localhost:9000/api/portfolio' )
      .then(() => {
        this.showStatusInfo = false;
      });
  }

  componentWillReceiveProps( nextProps ) {}

  // fetchCryptocompareMultiApi() {
  //   const { fiats, coins } = this.fiatToWatch;
  //   if ( coins.length > 0 && fiats.length > 0 ) {
  //     const url = getAPIUrlPriceMulti( this.fiatToWatch );

  //     this.props.fetchCryptocompareApi( url, 'multi' );
  //   }
  // }

  tileRenderer = () => {
    const {tileSection, api} = this.props;
    if (tileSection.compareApiData.length > 0) {
      return api.data.sort((a,b) => new Date(a.dateCreation).getTime() - new Date(b.dateCreation).getTime()).map(( tile, key ) => {
        const tempSocketData = tileSection.compareApiData.find( item => item.pairToWatch === tile.pairToWatch);

        if (!tempSocketData) {
          return (
            <Card raised>
              <CardHeader title={`Retrieving data for ${tile.pairToWatch}`} />
            </Card>
          )
        } else {
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
        }

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
        <Summary tileSection={tileSection} api={api} />
        <Grid
          container
          alignItems="center"
          direction="row"
        >
          {this.tileRenderer()}
        </Grid>
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
  // fetchCryptocompareApi: ( url, endPoint ) => dispatch(
  //   fetchCryptocompareApi( url, endPoint )
  // ),
  fetchApiData: url => dispatch(
    fetchApiData( url )
  ),
  updateSubscriptions: subscriptions => dispatch( updateSubscriptions( subscriptions ))
});

export default connect( mapStateToProps, mapDispatchToProps )( TileSection );
