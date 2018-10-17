import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchCryptocompareApi, addItemToApi } from '../redux/thunks';
import {
  Info,
  Form
} from '../components';
import { getInputFieldValues, getAPIUrlPriceHistorical } from '../clientUtils';
import SelectContainer from './Select';

const formData = require( '../config/data' );

class CryptoForm extends React.PureComponent {
  constructor( props ) {
    super( props );
    this.state = {
      isValid: true,
      selectData: {},
      isFormSubmited: false
    };
    this.formElement = null;

    this.onSubmit = this.onSubmit.bind( this );
  }

  componentWillReceiveProps( newProps ) {
    const { data: selectData } = newProps.formReducer;
    if ( selectData ) {
      this.setState({ selectData });
    }
  }

  fetchCryptocompareApiForHistoricalPrice( inputValues ) {
    const url = getAPIUrlPriceHistorical( inputValues );

    this.props.fetchCryptocompareApi( url, 'historical' )
      .then(() => {
        inputValues.priceCrypto = this.props.fiatCoinReducer.priceHistorical;
        this.props.addItemToApi( '/api/crypto', inputValues );
      });
  }

  onSubmit( event ) {
    event.preventDefault();
    if ( this.formElement.checkValidity()) {
      const DOMToArray = Array.from( this.formElement.elements )
        .filter( elem => elem.nodeName === 'INPUT' );
      const inputValues = getInputFieldValues( DOMToArray );

      // Calling cryptocompare API to get historical trading price
      // if the price field is omitted
      if ( inputValues.priceCrypto === '' ) {
        this.fetchCryptocompareApiForHistoricalPrice.call( this, inputValues );
      } else {
        this.props.addItemToApi( '/api/crypto', inputValues );
      }

      this.formElement.reset();
      this.setState({ isFormSubmited: true });
    } else {
      this.setState({
        isValid: false
      });
    }
  }

  render() {
    const { selectData, isFormSubmited } = this.state;

    return (
      <Fragment>
        <Info type="warning">
          <h4 className="alert-heading">Watch out!</h4>
          <p>
            If the date is added and the price is omitted once the form is submited and average price for that date will be retrieved from the <b>Cryptocompare</b> API.
          </p>
        </Info>
        <Form
          formData={formData}
          onSubmit={this.onSubmit}
          refCallback={( c ) => { this.formElement = c; }}
        >
          <SelectContainer
            selectData={selectData}
            isFormSubmited={isFormSubmited}
          />
          {
            this.props.formReducer && this.props.formReducer.status !== 200 ?
            <Info type="danger" text={this.props.formReducer.message} /> :
            null
          }
        </Form>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ formReducer, fiatCoinReducer }) => ({
  formReducer,
  fiatCoinReducer
});

const mapDispatchToProps = dispatch => ({
  fetchCryptocompareApi: ( url, endpointName ) => dispatch(
    fetchCryptocompareApi( url, endpointName )
  ),
  addItemToApi: ( url, payload ) => dispatch(
    addItemToApi( url, payload )
  )
});

export default connect( mapStateToProps, mapDispatchToProps )( CryptoForm );

