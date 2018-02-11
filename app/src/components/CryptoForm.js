import React from 'react';
import { Button } from 'reactstrap';
import InputWithError from './InputWithError';
import { fiatConverter } from '../../utils';

const { formData } = require( '../../data' );

const renderGeneralFormItems = items =>
  items.map(( item, key ) => (
    <InputWithError key={key} {...item} />
  ));

const renderFiatFormItems = items =>
  items.map(( item, key ) => (
    <section key={key}>
      <label>
      {fiatConverter( item.text )} {item.text}
      </label>
      <input type={item.type} name={item.name} value={item.text} required/>
    </section>
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
