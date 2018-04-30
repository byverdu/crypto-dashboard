import React, { Component, Fragment } from 'react';
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
    this.renderInput = this.renderInput.bind( this );
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

  renderInput() {
    const { text, value, ...inputProps } = this.props;
    const className = this.props.type === 'radio' ? 'form-check-input' : 'form-control';
    return (
      <Fragment>
        <input
            id={this.props.id}
            className={className}
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
      </Fragment>
    );
  }

  render() {
    // skipping text property so it isn't used as attribute
    const { text, type, id } = this.props;

    return (
      <FormGroup check={type === 'radio'}>
        <Label
          check={type === 'radio'}
          for={id}
        >
          {type === 'radio' && this.renderInput()}
          {text}
        </Label>
        {type !== 'radio' && this.renderInput()}
      </FormGroup>
    );
  }
}
