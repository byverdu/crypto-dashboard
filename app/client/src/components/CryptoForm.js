import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import * as thunks from '../redux/thunks';
import {
  Info,
  Form
} from './index';
import { getInputFieldValues, getCryptocompareUrl } from '../clientUtils';
import SelectContainer from '../containers/Select';

class CryptoForm extends React.PureComponent {
  constructor( props ) {
    super( props );
    this.state = {
      isValid: true,
      formData: this.props.formData,
      selectData: [],
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
      this.setState({ isFormSubmited: true });
    } else {
      this.setState({
        isValid: false
      });
    }
  }

  render() {
    const { formData, selectData, isFormSubmited } = this.state;

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

const mapStateToProps = state => ({
  apiData: state.api,
  formReducer: state.form
});

export default connect( mapStateToProps )( CryptoForm );
