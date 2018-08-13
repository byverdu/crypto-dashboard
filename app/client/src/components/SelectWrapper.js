import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { FormGroup, Label } from 'reactstrap';
import Info from './Info';

export default class SelectWrapper extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      selectedOption: '',
      validationMessage: '',
      isValid: true
    };

    this.handleValidity = this.handleValidity.bind( this );
  }

  componentWillReceiveProps( newProps ) {
    if ( newProps.selectedOption.label === '' ) {
      this.setState({
        selectedOption: ''
      });
    } else {
      this.setState({
        selectedOption: newProps.selectedOption
      });
    }
  }

  handleValidity( eventTarget ) {
    this.setState({
      isValid: eventTarget.validity.valid,
      validationMessage: eventTarget.validationMessage
    });
    // this.props.handleChangeSelect( this.state.selectedOption );
  }

  titleBuilder() {
    const name = this.props.name.split( 'Crypto' )[ 0 ];

    return `Select a ${name} for your trade`;
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
      name,
      handleChangeSelect,
      selectData
    } = this.props;

    return (
      <FormGroup>
         <Label
            for={this.props.id}
          >
            {this.titleBuilder()}
          </Label>
        <Select
          name={name}
          required
          openOnFocus
          value={this.state.selectedOption}
          inputProps={{
            onInvalid: e => this.handleValidity( e.target ),
            onChange: ( e ) => { this.handleValidity( e.target ); handleChangeSelect( this.state.selectedOption ); }
          }}
          options={selectData}
        />
      {this.renderError()}
      </FormGroup>
    );
  }
}

SelectWrapper.propTypes = {
  selectData: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  handleChangeSelect: PropTypes.func.isRequired,
  selectedOption: PropTypes.shape({ value: '', label: '' }).isRequired
};
