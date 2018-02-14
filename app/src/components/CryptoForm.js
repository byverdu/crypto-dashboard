import React from 'react';
import { Button } from 'reactstrap';
import InputWithError from './InputWithError';

const { formData } = require( '../../data' );

const renderGeneralFormItems = items =>
  items.map(( item, key ) => (
    <InputWithError key={key} {...item} />
  ));

const renderFiatFormItems = items =>
  items.map(( item, key ) => (
    <InputWithError key={key} {...item} />
  ));

export default class CryptoForm extends React.Component {
  constructor( props ) {
    super( props );
    this.formElement = null;
    this.onSubmit = this.onSubmit.bind( this );
    this.state = {
      isValid: true
    };
  }

  onSubmit( event ) {
    event.target.focus();
    event.preventDefault();
    this.formElement.checkValidity();
    if ( document.querySelectorAll( 'input:invalid' ).length === 0 ) {
      this.formElement.submit();
    } else {
      this.setState({
        isValid: false
      });
    }
  }

  render() {
    return (
      <form
        ref={( c ) => { this.formElement = c; } }
        method="post"
        action="/"
      >
        {renderGeneralFormItems( formData.general )}
        {renderFiatFormItems( formData.fiat )}
        <Button
          outline
          color="primary"
          onClick={this.onSubmit}
        >
          Submit
        </Button>
      </form>
    );
  }
}
