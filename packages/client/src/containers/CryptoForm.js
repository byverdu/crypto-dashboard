import React from 'react';
import { connect } from 'react-redux';
import { FormControl, Button, CircularProgress } from '@material-ui/core/';
import { fetchCryptocompareApi, addItemToApi } from '../redux/thunks';
import { clearFormValues, formSubmitted } from '../redux/actions/formSteps';
import { getAPIUrlPriceHistorical, socketSubscriptionGenerator, calculateTradingValue, getCryptoPairToWatch } from '../clientUtils';
import FormStepper from './FormStepper';

const uuidv4 = require( 'uuid/v4' );

class CryptoForm extends React.PureComponent {
  async fetchCryptocompareApiForHistoricalPrice( dataToSave ) {
    const url = getAPIUrlPriceHistorical( dataToSave );
    const { amountCrypto, exchangeData: {selectedCrypto, selectedPair}} = dataToSave;
    const priceHistorical = await this.props.fetchCryptocompareApi( url );
    dataToSave.priceCrypto = priceHistorical[selectedCrypto][selectedPair];
    const amountInvested = calculateTradingValue(
      dataToSave.priceCrypto,
      amountCrypto
    );
    dataToSave.amountInvested = amountInvested;
    
    this.props.addItemToApi(
      'http://localhost:9000/api/add-entry',
      dataToSave
    );
  }

  onSubmit = ( event ) => {
    event.preventDefault();
    if ( event.currentTarget.checkValidity()) {
      const { formValues } = this.props.formReducer;
      const { priceCrypto, amountCrypto, exchangeData } = formValues;
      const pairToWatch = getCryptoPairToWatch( exchangeData );

      const dataToSave = {
        ...formValues,
        pairToWatch,
        uuid: uuidv4()
      };

      // Calling cryptocompare API to get historical trading price
      // if the price field is omitted
      if ( !priceCrypto ) {
        this.fetchCryptocompareApiForHistoricalPrice.call( this, dataToSave );
      } else {
        const amountInvested = calculateTradingValue( priceCrypto, amountCrypto );
        dataToSave.amountInvested = amountInvested;
        // const dataToSave = {
        //   ...formValues,
        //   pairToWatch,
        //   amountInvested,
        //   uuid: uuidv4()
        // };
        this.props.addItemToApi(
          'http://localhost:9000/api/add-entry',
          dataToSave
        );
      }

      event.currentTarget.reset();
      this.props.clearFormValues();
      this.props.formSubmitted( true );
    } else {
      this.props.formSubmitted( false );
    }
  }

  render() {
    const { data, isFormSubmitted } = this.props.formReducer;

    if ( !data ) {
      return <CircularProgress />;
    }

    return (
      <FormControl
        component="form"
        onSubmit={this.onSubmit}
      >
        <FormStepper isFormSubmited={isFormSubmitted} />
        <Button type="submit">Submit</Button>
      </FormControl>
    );
  }
}

const mapStateToProps = ({ formReducer, fiatCoinReducer }) => ({
  formReducer,
  fiatCoinReducer
});

const mapDispatchToProps = dispatch => ({
  fetchCryptocompareApi: ( url ) => dispatch(
    fetchCryptocompareApi( url ),
  ),
  addItemToApi: ( url, payload ) => dispatch(
    addItemToApi( url, payload )
  ),
  clearFormValues: () => dispatch( clearFormValues()),
  formSubmitted: payload => dispatch( formSubmitted( payload ))
});

export default connect( mapStateToProps, mapDispatchToProps )( CryptoForm );

