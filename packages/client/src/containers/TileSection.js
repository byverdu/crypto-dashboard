import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchApiData } from '../redux/thunks';
import { updateSubscriptions } from '../redux/actions/tileSection';
import Tile from './Tile';
import {Info, Summary} from '../components';
import { Card, CardHeader, Grid } from '@material-ui/core';

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
  }

  componentDidMount() {
    this.props.fetchApiData( 'http://localhost:9000/api/portfolio' )
      .then(() => {
        this.showStatusInfo = false;
      });
  }


  tileRenderer = () => {
    const {tileSection, api, trades} = this.props;
    if (tileSection.compareApiData.length > 0) {
      return api.data.sort((a,b) => new Date(a.dateCreation).getTime() - new Date(b.dateCreation).getTime()).map(( tile, key ) => {
        const tempSocketData = tileSection.compareApiData.find( item => item.pairToWatch === tile.pairToWatch);
        const tempTrades = trades.find(trade => trade.uuid === tile.uuid);

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
                socketData={{...tempSocketData}}
                trades={tempTrades}
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

const mapStateToProps = ({ apiReducer, tileSectionReducer, tradesReducer }) => ({
  api: apiReducer,
  tileSection: tileSectionReducer,
  trades: tradesReducer.trades
});

const mapDispatchToProps = dispatch => ({
  fetchApiData: url => dispatch(
    fetchApiData( url )
  ),
  updateSubscriptions: subscriptions => dispatch( updateSubscriptions( subscriptions ))
});

export default connect( mapStateToProps, mapDispatchToProps )( TileSection );
