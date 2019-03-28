import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Card } from '@material-ui/core';
import { editItemFromApi, deleteItemFromApi, editTradeFromApi } from '../redux/thunks';
import TileBody from '../components/Tile/TileBody';
import TileFooter from '../components/Tile/TileFooter';
import { EditForm } from '../components';
import { updateTotalProfitLost } from '../redux/actions';
import TileHeader from '../components/Tile/TileHeader';
import { getSocketResponseFlag } from '../clientUtils';
import {
  getTileHeaderProps,
  getTileBodyProps,
  getTileFooterProps
} from '../components/Tile/tileUtils';


const styles = {
  card: {
    maxWidth: 400,
    margin: '10px auto'
  },
  footerList: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    padding: 12
  },
  footerListItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0 0 1px',
    flexBasis: '33%',
    padding: 2
  }
};

class Tile extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      actualPrice: 0,
      showForm: false,
      priceTracker: []
    };
  }

  componentWillReceiveProps( nextProps ) {
    console.log( nextProps );
    const {
      socketData,
    } = nextProps;

    if ( socketData ) {
      const { PRICE, FLAGS } = socketData;
      const flag = getSocketResponseFlag( FLAGS );
      this.setState({
        actualPrice: PRICE,
        priceTracker: [
          ...this.state.priceTracker,
          {
            PRICE,
            flag
          }
        ]
      })
    }
  }

  onClickRemoveItem = () => {
    const { uuid, deleteItemFromApi } = this.props;
    deleteItemFromApi( `http://0.0.0.0:9000/api/delete-entry/${uuid}`);
  }

  onClickEditItem = () => {
    this.setState({
      showForm: !this.state.showForm
    });
  }

  onSubmit = async ( event, data ) => {
    event.preventDefault();
    const {editItemFromApi, editTradeFromApi, deleteItemFromApi} = this.props;
    const {crypto, trades, isTradeToClose} = data;

    await editItemFromApi(
      `http://0.0.0.0:9000/api/edit-entry/${crypto.uuid}`,
      { data: crypto}
    );
    await editTradeFromApi(
      `http://0.0.0.0:9000/api/edit-trade/${crypto.uuid}`,
      { data: trades}
    );
    
    if (isTradeToClose) {
      await deleteItemFromApi( `http://0.0.0.0:9000/api/delete-entry/${crypto.uuid}`);
    }

    this.setState({
      showForm: !this.state.showForm
    });
  }

  renderLastPrices = () => {
    return this.state.priceTracker.slice( -12 ).map(( item, index ) => (
      <li key={index} className={this.props.classes.footerListItem}>
        <b>{( index + 1 )} - </b>
        <img alt="flag" src={`./icon/${item.flag}.svg`} />
        <h6 style={{ marginBottom: -0 }}>{item.price}</h6>
      </li>
    ));
  }

  render() {
    const display = this.state.showForm ? 'block' : 'none';
    const tileHeaderProps = getTileHeaderProps(
      this.props,
      this.onClickRemoveItem,
      this.onClickEditItem,
      this.state.showForm
    );
    const tileBodyProps = getTileBodyProps( this.props );
    const tileFooterProps = getTileFooterProps( this.props, this.state );

    return (
      <Card raised={true} className={this.props.classes.card}>
        <TileHeader {...tileHeaderProps} />
        <div style={{ display }}>
          {this.state.showForm &&
            <EditForm
              {...this.props}
              onSubmit={this.onSubmit}
            />
          }
        </div>
        <TileBody {...tileBodyProps} />
        <TileFooter {...tileFooterProps} />
        <ol className={this.props.classes.footerList}>
          {this.state.priceTracker.length > 0 && this.renderLastPrices()}
        </ol>
      </Card>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  deleteItemFromApi: ( url ) => dispatch(
    deleteItemFromApi( url )
  ),
  editItemFromApi: (url, data) => dispatch(
    editItemFromApi( url, data )
  ),
  editTradeFromApi: (url, data) => dispatch(
    editTradeFromApi( url, data )
  ),
  updateTotalProfitLost: newPriceTrade => dispatch( updateTotalProfitLost( newPriceTrade ))
});

const mapStateToProps = ({ apiReducer, tileSectionReducer, formReducer, tradesReducer }) => ({
  api: apiReducer,
  tileSection: tileSectionReducer,
  selectData: formReducer.data,
  allTrades: tradesReducer.trades
});

export default withStyles( styles )( connect( mapStateToProps, mapDispatchToProps )( Tile ));

Tile.propTypes = {
  socketData: PropTypes.object.isRequired
};
