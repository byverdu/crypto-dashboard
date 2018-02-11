import React from 'react';
import { Button } from 'reactstrap';
import InputWithError from './InputWithError';
import data from '../../data';

const renderFormItems = items =>
  items.map(( item, key ) => (
    <InputWithError key={key} {...item} />
  ));

export default class CryptoForm extends React.Component {
  constructor( props ) {
    super( props );
    this.formElement = null;
    this.onSubmit = this.onSubmit.bind( this );
  }

  onSubmit( event ) {
    event.preventDefault();
    this.formElement.checkValidity();
    if ( document.querySelectorAll( 'input:invalid' ).length === 0 ) {
      this.formElement.submit();
    }
  }
  render() {
    return (
      <form ref={( c ) => { this.formElement = c; } } method="post" action="/">
        {renderFormItems( data.form )}
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
