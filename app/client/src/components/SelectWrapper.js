import React, { Component, Fragment } from 'react';
import Select from 'react-select';
import 'whatwg-fetch';
import Info from './Info';

export default class SelectWrapper extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      selectedOption: '',
      validationMessage: '',
      isValid: true,
      options: []
    };
  }

  componentWillReceiveProps( newProps ) {
    if ( newProps.selectData.length > 0 && !newProps.isFormSubmitted ) {
      this.setState({
        options: newProps.selectData
      });
    }
    if ( newProps.isFormSubmitted ) {
      this.setState({
        selectedOption: ''
      });
    }
  }

  handleValidity( eventTarget ) {
    this.setState({
      isValid: eventTarget.validity.valid,
      validationMessage: eventTarget.validationMessage
    });
  }

  handleChange = ( selectedOption ) => {
    this.setState({
      selectedOption,
      isValid: true
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
    const { selectedOption, options } = this.state;

    return (
      <Fragment>
        <Select
          name="exchangeCrypto"
          required
          openOnFocus
          value={selectedOption}
          inputProps={{
            onInvalid: e => this.handleValidity( e.target )
          }}
          onChange={this.handleChange}
          options={options}
        />
      {this.renderError()}
      </Fragment>
    );
  }
}
