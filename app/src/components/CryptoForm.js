import React from 'react';
import { Button, FormGroup, Label } from 'reactstrap';
import data from '../../data';

const renderFormItems = items =>
  items.map(( item, key ) => (
    <FormGroup key={key}>
      <Label
        for={item.name}
      >
        {item.text}
      </Label>
      <input
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
  onSubmit() {
    console.log( this );
    this.formElement.submit();
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
          Submit eewew
        </Button>
      </form>
    );
  }
}
