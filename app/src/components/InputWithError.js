import React, { PureComponent } from 'react';
import { FormGroup, Label } from 'reactstrap';
import Info from './Info';

export default class InputWithError extends PureComponent {
  constructor( props ) {
    super( props );
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

    return isValid ?
      null :
      <Info type="danger" text={validationMessage} />;
  }

  render() {
    const {
      name, text
    } = this.props;
    return (
      <FormGroup>
      <Label
        for={name}
      >
        {text}
      </Label>
      <input
        onInvalid={ event => this.handleValidity( event.target )}
        onBlur={ event => this.handleValidity( event.target )}
        required
        {...this.props}
      />
      {this.renderError()}
    </FormGroup>
    );
  }
}
