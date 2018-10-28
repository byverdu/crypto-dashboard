import React, { Component, Fragment } from 'react';
import DatePicker from 'material-ui-pickers/DatePicker';
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/MuiPickersUtilsProvider';
import * as UI from '@material-ui/core/';
import Info from './Info';

const getMaxDate = () => new Date().toJSON().slice( 0, 10 );

export default class InputWithError extends Component {
  constructor( props ) {
    super( props );
    this.input = null;
    this.state = {
      isValid: true,
      validationMessage: '',
      value: undefined
    };
    this.handleValidity = this.handleValidity.bind( this );
    this.renderError = this.renderError.bind( this );
    this.handleChangeDate = this.handleChangeDate.bind( this );
    this.checkboxRender = this.checkboxRender.bind( this );
    this.datePickerRender = this.datePickerRender.bind( this );
    this.inputRender = this.inputRender.bind( this );
    this.handleChange = this.handleChange.bind( this );
  }

  shouldComponentUpdate( newProps ) {
    console.log( newProps );
    if ( newProps.value !== this.props.value ) {
      this.setState({
        value: this.props.value ? this.props.value : null
      });
    }

    return newProps.value !== this.state.value;
  }

  handleValidity( eventTarget ) {
    this.setState({
      isValid: eventTarget.target.validity.valid,
      validationMessage: eventTarget.target.validationMessage,
      value: eventTarget.target.value
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
      <Info type="alert" message={validationMessage} />;
  }

  handleChangeDate( date ) {
    this.setState({ value: date });
  }

  handleChange( event ) {
    this.setState({ value: event.target.checked });
  }

  datePickerRender( sharedProps ) {
    return ( <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        disableFuture
        // onInputChange={
        //   event => this.handleValidity( event.target )
        // }
        onChange={this.handleChangeDate}
        {...sharedProps}
      />


    </MuiPickersUtilsProvider> );
  }

  checkboxRender( sharedProps ) {
    return (
        <UI.FormControlLabel
          error={!this.state.isValid}
          value={sharedProps.value}
          control={<UI.Radio color="primary" />}
          label={sharedProps.label}
          labelPlacement="start"
        /> );
  }

  inputRender( sharedProps ) {
    return (
      <UI.TextField
        // label={text}
        // id={this.props.id}
        // value={this.state.value}
        // max={this.props.type === 'date' ? getMaxDate() : null}
        // variant="outlined"
        inputRef={( c ) => { this.input = c; }}
            onInvalid={
          event => this.handleValidity( event )
            }
        error={!this.state.isValid}
            onChange={
          event => this.handleValidity( event )
            }
        // placeholder={placeholder}
        {...sharedProps}
          />
    );
  }

  render() {
    // skipping text property so it isn't used as attribute
    const { text, isDate, ...inputProps } = this.props;
    const { value } = this.state;
    const sharedProps = {
      ...inputProps,
      variant: 'outlined',
      label: this.props.text,
      value: this.props.value ? this.props.value : value
    };

    return (
      <Fragment>
        {this.props.isDate &&
          this.datePickerRender( sharedProps )
        }
        {!this.props.type !== 'radio' &&
          this.inputRender( sharedProps )
        }
        {/* {this.props.type === 'radio' &&
          <UI.FormControl component="fieldset">
            <UI.RadioGroup
        aria-label="gender"
            value={this.state.value}
        name={sharedProps.name}
        onChange={this.handleValidity}
        >
            {this.checkboxRender( sharedProps )}
            </UI.RadioGroup>
          </UI.FormControl>
        } */}
        {this.renderError( sharedProps )}
      </Fragment>
    );
  }
}
