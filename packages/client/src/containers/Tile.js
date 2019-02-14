import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Card } from '@material-ui/core';
import { editItemFromApi, deleteItemFromApi } from '../redux/thunks';
import TileBody from '../components/Tile/TileBody';
import TileFooter from '../components/Tile/TileFooter';
import { updateTotalProfitLost } from '../redux/actions';
import TileHeader from '../components/Tile/TileHeader';
import { getInputFieldValues, getSocketResponseFlag, calculateTradingValue, test } from '../clientUtils';
import {
  getTileHeaderProps,
  getTileBodyProps,
  getTileFooterProps
} from '../components/Tile/tileUtils';


const styles = {
  card: {
    maxWidth: 400,
    margin: '0 auto'
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
      position: this.props.position,
      showForm: false,
      pairToWatch: this.props.pairToWatch,
      priceTracker: []
    };

    this.formElement = null;
    this.onClickRemoveItem = this.onClickRemoveItem.bind( this );
    this.onClickEditItem = this.onClickEditItem.bind( this );
    this.onSubmit = this.onSubmit.bind( this );
  }

  componentWillReceiveProps( nextProps ) {
    console.log( nextProps );
    const {
      socketData,
      api: {data},
      tileSection: {compareApiData}
    } = nextProps;

    if ( socketData ) {
      const { PRICE, FLAGS } = socketData;
      let actualPrice;
      data.forEach(( item ) => {
        if (item.fiatName !== 'NA') {
          actualPrice = test(item, compareApiData);
        } else {
          actualPrice = PRICE;
        }
  
        return calculateTradingValue( item.amountCrypto, actualPrice );
      });
      const flag = getSocketResponseFlag( FLAGS );
      this.setState({
        actualPrice,
        priceTracker: [
          ...this.state.priceTracker,
          {
            PRICE: actualPrice,
            flag
          }
        ]
      })
    }
  }

  onClickRemoveItem() {
    const { position } = this.state;
    const { pairToWatch, uuid } = this.props;
    this.props.deleteItemFromApi( `http://0.0.0.0:9000/api/delete-entry/${uuid}`, { cryptoToRemove: position, pairToWatch });
  }

  onClickEditItem() {
    this.setState({
      showForm: !this.state.showForm
    });
  }

  renderLastPrices() {
    return this.state.priceTracker.slice( -12 ).map(( item, index ) => (
      <li key={index} className={this.props.classes.footerListItem}>
        <b>{( index + 1 )} - </b>
        <img src={`./icon/${item.flag}.svg`} />
        <h6 style={{ marginBottom: -0 }}>{item.price}</h6>
      </li>
    ));
  }

  onSubmit( event ) {
    event.preventDefault();
    if ( this.formElement.checkValidity()) {
      const DOMToArray = Array.from( this.formElement.elements )
        .filter( elem => elem.nodeName === 'INPUT' );
      const inputValues = getInputFieldValues( DOMToArray );

      this.props.editItemFromApi( '/api/delete-entry', {
        data: inputValues,
        cryptoToRemove: this.state.position
      })
        .then(() => {
          this.setState({
            showForm: !this.state.showForm
          });
        });
    }
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
    // const newData = applyValuesToInput( formData, this.props );

    return (
      <Card raised={true} className={this.props.classes.card}>
        <TileHeader {...tileHeaderProps} />
        <div style={{ display }}>
          {/* <Form
            formData={newData}
            onSubmit={this.onSubmit}
            refCallback={( c ) => { this.formElement = c; }}
          /> */}
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
  deleteItemFromApi: ( url, data ) => dispatch(
    deleteItemFromApi( url, data )
  ),
  editItemFromApi: url => dispatch(
    editItemFromApi( url )
  ),
  updateTotalProfitLost: newPriceTrade => dispatch( updateTotalProfitLost( newPriceTrade ))
});

const mapStateToProps = ({ apiReducer, tileSectionReducer }) => ({
  api: apiReducer,
  tileSection: tileSectionReducer
});

export default withStyles( styles )( connect( mapStateToProps, mapDispatchToProps )( Tile ));

Tile.propTypes = {
  position: PropTypes.number.isRequired,
  pairToWatch: PropTypes.string.isRequired,
  socketData: PropTypes.object.isRequired
};
