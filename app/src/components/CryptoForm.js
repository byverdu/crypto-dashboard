import React from 'react';
import { Button } from 'reactstrap';
import InputWithError from './InputWithError';

const renderFormItems = items =>
  items.map(( item, key ) => (
    <InputWithError key={key} {...item} />
  ));

export default class CryptoForm extends React.Component {
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
      this.formElement.submit();
    } else {
      this.setState({
        isValid: false
      });
    }
  }

  render() {
    const { formData } = this.state;
    return (
      <form
        ref={( c ) => { this.formElement = c; } }
        method="post"
        action="/"
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
    );
  }
}
