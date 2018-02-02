import React from 'react';
import { Button, FormGroup, Label } from 'reactstrap';
import data from '../../data';

const handleInvalid = ( element ) => {
  // if ( element.validity.isValid && document.querySelector( '.error' )) {
  //   document.querySelector( '.error' ).remove();
  // } else {
  const div = document.createElement( 'div' );
  div.className = 'error';
  div.textContent = element.validationMessage;
  element.insertAdjacentElement( 'afterend', div );
  // }
};

const handleChange = ( element ) => {
  if ( element.validity.valid && document.querySelector( '.error' )) {
    document.querySelector( '.error' ).remove();
  }
};

const renderFormItems = items =>
  items.map(( item, key ) => (
    <FormGroup key={key}>
      <Label
        for={item.name}
      >
        {item.text}
      </Label>
      <input
        onInvalid={ event => handleInvalid( event.target )}
        onBlur={ event => handleChange( event.target )}
        required
        type={item.typeInput}
        name={item.name}
        ref={item.name}
        id={item.name}
        placeholder={item.placeholder}
      />
    </FormGroup>
  ));

export default class CryptoForm extends React.Component {
  constructor( props ) {
    super( props );
    this.formElement = null;
    this.onSubmit = this.onSubmit.bind( this );
  }

  onSubmit( event ) {
    event.preventDefault();
    const errorElements = Array.from( document.querySelectorAll( '.error' ));
    errorElements.forEach( elem => elem.remove());
    console.log( this );
    this.formElement.checkValidity();
    // this.formElement.submit();
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
