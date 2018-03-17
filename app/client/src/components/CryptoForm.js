import React, { Fragment } from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import * as thunks from '../redux/thunks';
import InputWithError from './InputWithError';
import { getInputFieldValues } from '../clientUtils';

const renderFormItems = items =>
  items.map(( item, key ) => (
    <InputWithError key={key} {...item} />
  ));

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

  onSubmit( event ) {
    event.preventDefault();
    if ( this.formElement.checkValidity()) {
      const DOMToArray = Array.from( this.formElement.elements )
        .filter( elem => elem.nodeName === 'INPUT' );
      const inputValues = getInputFieldValues( DOMToArray );

      this.props.dispatch(
        thunks.addItemToApi( '/api/crypto', inputValues )
      );
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
        <form
          ref={( c ) => { this.formElement = c; } }
          onSubmit={this.onSubmit}
          noValidate
        >
          {renderFormItems( formData.general )}
          {renderFormItems( formData.fiat )}
          <Button
            outline
            color="primary"
          >
            Submit
          </Button>
        </form>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  apiData: state.api
});

export default connect( mapStateToProps )( CryptoForm );
