import React from 'react';
import { connect } from 'react-redux';
import { Step, StepLabel, StepContent, Stepper, Button } from '@material-ui/core';
import {
  fiatNameChanged,
  dateCryptoChanged,
  priceOrAmountTradeChanged,
  exchangedDataChanged
} from '../redux/actions/formSteps';

import {
  Info,
  SelectGroup,
  RadioGroup,
  CustomDatePicker,
  TextFieldGroup
} from '../components';

const formData = require( '../config/data' );

class FormStepper extends React.Component {
  stepLabels = [
    {
      label: 'Add a date for your trade',
      step: 'renderDateStep'
    },
    {
      label: 'Select fiat for your trade',
      step: 'renderRadioStep'
    },
    {
      label: 'Add exchange and value/pair of your trade',
      step: 'renderSelectGroup'
    },
    {
      label: 'Add amount and price of your trade',
      step: 'renderTextStep'
    }
  ]
  numberSteps = ( this.stepLabels.length - 1 );
  state = {
    activeStep: 0
  }

  handleNext = () => this.setState( prevState => ({
    activeStep: prevState.activeStep + 1
  }))

  handleBack = () => this.setState( prevState => ({
    activeStep: prevState.activeStep - 1
  }))

  renderStepButtons = () => <div>
    <Button
      disabled={this.state.activeStep === 0}
      onClick={this.handleBack}
    >
      Back
    </Button>
    <Button
      variant="contained"
      color="primary"
      onClick={this.handleNext}
    >
      {this.state.activeStep === this.numberSteps ? 'Finish' : 'Next'}
    </Button>
  </div>

  renderDateStep = () => {
    const dateFormProps = {
      handleChangeDate: this.props.dateCryptoChanged,
      dateCrypto: this.props.formValues.dateCrypto,
      formData: formData.dateFields
    };

    return (
      <React.Fragment>
        <CustomDatePicker {...dateFormProps} />
        {this.renderStepButtons()}
      </React.Fragment>
    );
  }

  renderSelectGroup = () => {
    const selectFormProps = {
      isFormSubmited: this.props.isFormSubmited,
      options: this.props.selectData,
      handleChangeExchange: this.props.exchangedDataChanged
    };

    return (
      <React.Fragment>
        <SelectGroup {...selectFormProps}/>
        {this.renderStepButtons()}
      </React.Fragment>
    );
  }

  renderRadioStep = () => {
    const radioFormProps = {
      handleChangeFiat: this.props.fiatNameChanged,
      fiatName: this.props.formValues.fiatName,
      formData: formData.radioFiatFields
    };

    return (
      <React.Fragment>
        <RadioGroup {...radioFormProps} />
        {this.renderStepButtons()}
      </React.Fragment>
    );
  }

  renderTextStep = () => {
    const textFieldFormProps = {
      formData: formData.inputFields,
      handleChangeInput: this.props.priceOrAmountTradeChanged
    };

    return (
      <React.Fragment>
        <Info type="warning" message={null}>
            <h4>Watch out!</h4>
            <p>
              If the date is added and the price is omitted once the form is submited and average price for that date will be retrieved from the <b>Cryptocompare</b> API.
            </p>
        </Info>
        <TextFieldGroup {...textFieldFormProps} />
        {this.renderStepButtons()}
      </React.Fragment>
    );
  }

  render() {
    const { activeStep } = this.state;

    return (
      <Stepper activeStep={activeStep} orientation="vertical">
        {
          this.stepLabels.map( step => (
            <Step key={activeStep}>
              <StepLabel>{step.label}</StepLabel>
              <StepContent>
                {this[ step.step ]()}
              </StepContent>
            </Step>
          ))
        }
      </Stepper>
    );
  }
}

const mapStateToProps = ({ formReducer }) => ({
  formValues: formReducer.formValues,
  selectData: formReducer.data
});

const mapDispatchToProps = dispatch => ({
  fiatNameChanged: event => dispatch( fiatNameChanged( event.target.value )),
  dateCryptoChanged: date => dispatch( dateCryptoChanged( date )),
  priceOrAmountTradeChanged: ({ target: { name, value } }) => dispatch( priceOrAmountTradeChanged({ name, value })),
  exchangedDataChanged: selectedData => dispatch( exchangedDataChanged( selectedData ))
});

export default connect( mapStateToProps, mapDispatchToProps )( FormStepper );
