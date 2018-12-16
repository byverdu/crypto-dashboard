import React from 'react';
import { connect } from 'react-redux';
import { FormControl, Button, CircularProgress } from '@material-ui/core/';
import { fetchCryptocompareApi, addItemToApi } from '../redux/thunks';
import { clearFormValues, formSubmitted } from '../redux/actions/formSteps';
import { getAPIUrlPriceHistorical } from '../clientUtils';
import FormStepper from './FormStepper';

class CryptoForm extends React.PureComponent {
  fetchCryptocompareApiForHistoricalPrice( inputValues ) {
    const url = getAPIUrlPriceHistorical( inputValues );

    this.props.fetchCryptocompareApi( url, 'historical' )
      .then(() => {
        inputValues.priceCrypto = this.props.fiatCoinReducer.priceHistorical;
        this.props.addItemToApi( '/api/crypto', inputValues );
      });
  }

  onSubmit = ( event ) => {
    event.preventDefault();
    if ( event.currentTarget.checkValidity()) {
      const { formValues } = this.props.formReducer;
      // Calling cryptocompare API to get historical trading price
      // if the price field is omitted
      if ( formValues.priceCrypto === undefined ) {
        this.fetchCryptocompareApiForHistoricalPrice.call( this, formValues );
      } else {
        this.props.addItemToApi( '/api/crypto', formValues );
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

