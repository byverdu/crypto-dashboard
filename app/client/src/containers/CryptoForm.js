import React from 'react';
import { connect } from 'react-redux';
import { FormControl, Button, CircularProgress } from '@material-ui/core/';
import { fetchCryptocompareApi, addItemToApi } from '../redux/thunks';
import { clearFormValues, formSubmitted } from '../redux/actions/formSteps';
import { getAPIUrlPriceHistorical, socketSubscriptionGenerator, calculateTradingValue } from '../clientUtils';
import FormStepper from './FormStepper';

class CryptoForm extends React.PureComponent {
  fetchCryptocompareApiForHistoricalPrice( inputValues ) {
    const url = getAPIUrlPriceHistorical( inputValues );

    this.props.fetchCryptocompareApi( url, 'historical' )
      .then(() => {
        inputValues.priceCrypto = this.props.fiatCoinReducer.priceHistorical;
        this.props.addItemToApi( '/api/add-entry', inputValues );
      });
  }

  onSubmit = ( event ) => {
    event.preventDefault();
    if ( event.currentTarget.checkValidity()) {
      const { formValues } = this.props.formReducer;
      const { priceCrypto, amountCrypto, exchangeData } = formValues;
      // Calling cryptocompare API to get historical trading price
      // if the price field is omitted
      if ( priceCrypto === undefined ) {
        this.fetchCryptocompareApiForHistoricalPrice.call( this, formValues );
      } else {
        const pairToWatch = socketSubscriptionGenerator( exchangeData );
        const amountInvested = calculateTradingValue( priceCrypto, amountCrypto );
        const dataToSave = {
          ...formValues,
          pairToWatch,
          amountInvested
        };
        this.props.addItemToApi( '/api/add-entry', dataToSave );
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
  fetchCryptocompareApi: ( url, endpointName ) => dispatch(
    fetchCryptocompareApi( url, endpointName ),
  ),
  addItemToApi: ( url, payload ) => dispatch(
    addItemToApi( url, payload )
  ),
  clearFormValues: () => dispatch( clearFormValues()),
  formSubmitted: payload => dispatch( formSubmitted( payload ))
});

export default connect( mapStateToProps, mapDispatchToProps )( CryptoForm );

