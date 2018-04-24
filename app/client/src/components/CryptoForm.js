import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import * as thunks from '../redux/thunks';
import {
  Info,
  Form,
  SelectWrapper
} from './index';
import { getInputFieldValues, getCryptocompareUrl } from '../clientUtils';

class CryptoForm extends React.Component {
  constructor( props ) {
    super( props );
    this.formElement = null;
    this.onSubmit = this.onSubmit.bind( this );
    this.state = {
      isValid: true,
      formData: this.props.formData,
      isFormSubmitted: false
    };
  }

  fetchCryptocompareApi( inputValues ) {
    const url = getCryptocompareUrl( inputValues );

    this.props.dispatch(
      thunks.fetchCryptocompareApi( url )
    )
      .then(() => {
        inputValues.priceCrypto = this.props.apiData.priceValue;
        this.props.dispatch(
          thunks.addItemToApi( '/api/crypto', inputValues )
        );
      });
  }

  onSubmit( event ) {
    event.preventDefault();
    if ( this.formElement.checkValidity()) {
      const DOMToArray = Array.from( this.formElement.elements )
        .filter( elem => elem.nodeName === 'INPUT' );
      const inputValues = getInputFieldValues( DOMToArray );

      // Calling cryptocompare API to get default trading price
      // if the price field is omitted
      if ( inputValues.priceCrypto === '' ) {
        this.fetchCryptocompareApi.call( this, inputValues );
      } else {
        this.props.dispatch(
          thunks.addItemToApi( '/api/crypto', inputValues )
        );
      }

      this.formElement.reset();
      this.setState({
        isFormSubmitted: true
      });
    } else {
      this.setState({
        isValid: false
      });
    }
  }

  render() {
    const { formData } = this.state;
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
          <SelectWrapper
            selectData={this.props.selectData}
            isFormSubmitted={this.state.isFormSubmitted}
          />
        </Form>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  apiData: state.api
});

export default connect( mapStateToProps )( CryptoForm );
