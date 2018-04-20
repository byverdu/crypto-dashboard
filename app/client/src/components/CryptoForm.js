import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import * as thunks from '../redux/thunks';
import {
  Info,
  Form
} from './index';
import { getInputFieldValues, getCryptocompareUrl } from '../clientUtils';

class CryptoForm extends React.Component {
  constructor( props ) {
    super( props );
    this.formElement = null;
    this.onSubmit = this.onSubmit.bind( this );
    this.state = {
      isValid: true,
      formData: this.props.formData
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

      if ( inputValues.priceCrypto === '' ) {
        this.fetchCryptocompareApi.call( this, inputValues );
      } else {
        this.props.dispatch(
          thunks.addItemToApi( '/api/crypto', inputValues )
        );
      }
    } else {
      this.setState({
        isValid: false
      });
    }
  }

  testData() {
    this.props.dispatch(
      thunks.addItemToApi( '/api/crypto', {
        dateCrypto: '2018-03-02',
        nameCrypto: 'eth',
        amountCrypto: '0.0005',
        priceCrypto: '0.0008',
        fiatCrypto: 'dollar'
      })
    );
    this.formElement.submit();
  }

  render() {
    const { formData } = this.state;
    return (
      <Fragment>
        {
          process.env.NODE_ENV === 'development' && <button onClick={this.testData.bind( this )}>testData</button>
        }
        <Info type="warning">
          <h4 className="alert-heading">Watch out!</h4>
          <p>
            If the date is added and the price is omitted once the form is submited and average price for that date will be retrieved from the <b>Cryptocompare</b> API.
          </p>
        </Info>
        <Form
          data={formData}
          onSubmit={this.onSubmit}
          refCallback={( c ) => { this.formElement = c; }}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  apiData: state.api
});

export default connect( mapStateToProps )( CryptoForm );
