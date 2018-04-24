import React, { Component } from 'react';
import { FormGroup, Label } from 'reactstrap';
import Info from './Info';

const getMaxDate = () => new Date().toJSON().slice( 0, 10 );

export default class InputWithError extends Component {
  constructor( props ) {
    super( props );
    this.input = null;
    this.state = {
      isValid: true,
      validationMessage: '',
      value: ''
    };
    this.handleValidity = this.handleValidity.bind( this );
    this.renderError = this.renderError.bind( this );
  }

  componentWillReceiveProps() {
    this.setState({
      value: this.props.value ? this.props.value : ''
    });
  }

  handleValidity( eventTarget ) {
    this.setState({
      isValid: eventTarget.validity.valid,
      validationMessage: eventTarget.validationMessage,
      value: eventTarget.value
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
    const { text, value, ...inputProps } = this.props;

    return (
      <FormGroup>
      <Label
        for={this.props.id}
      >
        {text}
      </Label>
      <input
        id={this.props.id}
        ref={( c ) => { this.input = c; } }
        value={this.state.value}
        max={this.props.type === 'date' ? getMaxDate() : null}
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
