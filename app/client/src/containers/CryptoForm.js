import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { FormControl, Button, CircularProgress } from '@material-ui/core/';
import { fetchCryptocompareApi, addItemToApi } from '../redux/thunks';
import {
  Info,
  SelectGroup,
  RadioGroup,
  CustomDatePicker,
  TextFieldGroup
} from '../components';
import { getAPIUrlPriceHistorical } from '../clientUtils';

const formData = require( '../config/data' );

class CryptoForm extends React.PureComponent {
  constructor( props ) {
    super( props );
    this.state = {
      isValid: true,
      selectData: undefined,
      isFormSubmited: false,
      formValues: {
        fiatName: '',
        dateCrypto: null,
        exchangeData: undefined
      }
    };
    this.formElement = React.createRef();

    this.onSubmit = this.onSubmit.bind( this );
    this.handleChangeFiat = this.handleChangeFiat.bind( this );
    this.handleChangeDate = this.handleChangeDate.bind( this );
    this.handleChangeInput = this.handleChangeInput.bind( this );
    this.handleChangeExchange = this.handleChangeExchange.bind( this );
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
    if ( event.currentTarget.checkValidity()) {
      // Calling cryptocompare API to get historical trading price
      // if the price field is omitted
      if ( this.state.formValues.priceCrypto === undefined ) {
        this.fetchCryptocompareApiForHistoricalPrice.call( this, this.state.formValues );
      } else {
        this.props.addItemToApi( '/api/crypto', this.state.formValues );
      }

      event.currentTarget.reset();
      this.setState({ isFormSubmited: true });
    } else {
      this.setState({
        isValid: false,
        isFormSubmited: false
      });
    }
  }

  handleChangeFiat( event ) {
    const formValues = {
      ...this.state.formValues,
      fiatName: event.target.value
    };
    this.setState({ formValues });
  }

  handleChangeDate( selectedDate ) {
    const dateCrypto = selectedDate.toString();
    const formValues = {
      ...this.state.formValues,
      dateCrypto
    };
    this.setState({ formValues });
  }

  handleChangeInput( event ) {
    const { target } = event;
    const formValues = {
      ...this.state.formValues,
      [ target.name ]: target.value
    };
    this.setState({ formValues });
  }

  handleChangeExchange( exchangeData ) {
    const formValues = {
      ...this.state.formValues,
      exchangeData
    };
    this.setState({ formValues });
  }

  render() {
    const {
      selectData, isFormSubmited, formValues: { fiatName, dateCrypto }
    } = this.state;
    const radioFormProps = {
      handleChangeFiat: this.handleChangeFiat,
      fiatName,
      formData: formData.radioFiatFields
    };
    const dateFormProps = {
      handleChangeDate: this.handleChangeDate,
      dateCrypto,
      formData: formData.dateFields
    };
    const textFieldFormProps = {
      formData: formData.inputFields,
      handleChangeInput: this.handleChangeInput
    };
    const selectFormProps = {
      isFormSubmited,
      options: selectData,
      handleChangeExchange: this.handleChangeExchange
    };

    if ( !selectData ) {
      return <CircularProgress />;
    }

    return (
      <Fragment>
        <Info type="warning" message={null}>
            <h4>Watch out!</h4>
            <p>
              If the date is added and the price is omitted once the form is submited and average price for that date will be retrieved from the <b>Cryptocompare</b> API.
            </p>
        </Info>

        <FormControl component="form" onSubmit={this.onSubmit}>
          <CustomDatePicker {...dateFormProps} />
          <RadioGroup {...radioFormProps} />

          {fiatName === 'NA' ?
            <SelectGroup {...selectFormProps}/> :
            <input type="text" />
        }

          <TextFieldGroup {...textFieldFormProps} />
          <Button type="submit">Submit</Button>
        </FormControl>
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

