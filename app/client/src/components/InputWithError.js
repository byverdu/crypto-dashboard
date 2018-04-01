import React, { Component } from 'react';
import { FormGroup, Label } from 'reactstrap';
import Info from './Info';

export default class InputWithError extends Component {
  constructor( props ) {
    super( props );
    this.input = null;
    this.state = {
      isValid: true,
      validationMessage: ''
    };
    this.handleValidity = this.handleValidity.bind( this );
    this.renderError = this.renderError.bind( this );
  }

  handleValidity( eventTarget ) {
    this.setState({
      isValid: eventTarget.validity.valid,
      validationMessage: eventTarget.validationMessage
    });
  }

  renderError() {
    const {
      isValid, validationMessage
    } = this.state;
    // workaround to have validated a group of radio inputs
    const validRadioGroup = this.input ? this.input.validity.valid : false;

    return ( isValid || validRadioGroup ) ?
      null :
      <Info type="danger" text={validationMessage} />;
  }

  render() {
    // skipping text property so it isn't used as attribute
    const { text, ...inputProps } = this.props;
    const { name } = this.props;
    return (
      <FormGroup>
      <Label
        for={name}
      >
        {text}
      </Label>
      <input
        ref={( c ) => { this.input = c; } }
        onInvalid={
          event => this.handleValidity( event.target )
        }
        onChange={
          event => this.handleValidity( event.target )
        }
        {...inputProps}
      />
      {this.renderError()}
    </FormGroup>
    );
  }
}
