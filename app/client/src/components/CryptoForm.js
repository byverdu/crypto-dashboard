import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import * as thunks from '../redux/thunks';
import {
  Info,
  Form,
  SelectWrapper
} from './index';
import { getInputFieldValues, getCryptocompareUrl } from '../clientUtils';

const getSelectWrapperData = data => data.map( item => ({ value: item, label: item }));

const initSelect = {
  value: '',
  label: ''
};

class CryptoForm extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      isValid: true,
      formData: this.props.formData,
      selectedExchange: initSelect,
      selectedCrypto: initSelect,
      selectedPair: initSelect,
      dataExchanges: [],
      dataCryptos: null,
      dataPairs: null
    };
    this.formElement = null;
    this.moreDataToRender = null;

    this.onSubmit = this.onSubmit.bind( this );
    this.handleChangeExchange = this.handleChangeExchange.bind( this );
    this.handleChangeCrypto = this.handleChangeCrypto.bind( this );
    this.handleChangePair = this.handleChangePair.bind( this );
  }

  componentWillReceiveProps( newProps ) {
    const { data } = newProps.formReducer;
    const dataExchanges = getSelectWrapperData( Object.keys( data ));
    if ( dataExchanges.length > 0 ) {
      this.setState({ dataExchanges });
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
      this.setState({
        selectedExchange: initSelect,
        selectedCrypto: initSelect,
        selectedPair: initSelect,
        dataCryptos: null,
        dataPairs: null
      });
    } else {
      this.setState({
        isValid: false
      });
    }
  }

  handleChangeExchange( selectedExchange ) {
    const tempData = this.props.formReducer.data[ selectedExchange.label ];
    const dataCryptos = getSelectWrapperData( Object.keys( tempData ));
    this.setState({
      selectedExchange,
      dataCryptos
    });
  }

  handleChangeCrypto( selectedCrypto ) {
    const tempPair = this.props.formReducer.data[ this.state.selectedExchange.label ][ selectedCrypto.label ];
    const dataPairs = getSelectWrapperData( tempPair );
    this.setState({
      selectedCrypto,
      dataPairs
    });
  }

  handleChangePair( selectedPair ) {
    this.setState({
      selectedPair
    });
  }

  render() {
    const {
      formData,
      dataExchanges,
      dataCryptos,
      dataPairs,
      selectedExchange,
      selectedCrypto,
      selectedPair
    } = this.state;
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
            selectData={dataExchanges}
            name="exchangeCrypto"
            handleChangeSelect={this.handleChangeExchange}
            selectedOption={selectedExchange}
          />

          {this.state.dataCryptos && <SelectWrapper
            selectData={dataCryptos}
            name="coinCrypto"
            handleChangeSelect={this.handleChangeCrypto}
            selectedOption={selectedCrypto}
          />}

          {this.state.dataPairs && <SelectWrapper
            selectData={dataPairs}
            name="pairCrypto"
            handleChangeSelect={this.handleChangePair}
            selectedOption={selectedPair}
          />}

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
