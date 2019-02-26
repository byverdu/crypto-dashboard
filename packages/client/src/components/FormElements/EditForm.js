import React, { useState } from 'react';
import {
  RadioGroup,
  CustomDatePicker,
  SelectWrapper
} from '../index.js';
import {TextField, Button} from '@material-ui/core';
const formData = require('../../config/data');

const EditForm = ({
  uuid,
  dateCrypto,
  fiatName,
  selectData,
  amountCrypto,
  amountInvested,
  exchangeData: {
    selectedExchange,
    selectedCrypto,
    selectedPair
  },
  onSubmit
}) => {
  const [editDate, setEditDate] = useState(dateCrypto);
  const [editFiatName, setEditFiatName] = useState(fiatName);
  const [editExchange, setEditExchange] = useState(selectedExchange);
  const [editCrypto, setEditCrypto] = useState(selectedCrypto);
  const [editPair, setEditPair] = useState(selectedPair);
  const [editAmountCrypto, setEditAmountCrypto] = useState(amountCrypto);
  const [editAmountInvested, setEditAmountInvested] = useState(amountInvested);

  const handleChangeExchange = (event) => setEditExchange(event.target.value);
  const handleChangeFiatName = (event) => setEditFiatName(event.target.value);
  const handleChangeCrypto = (event) => setEditCrypto(event.target.value);
  const handleChangePair = (event) => setEditPair(event.target.value);
  const handleChangeAmountCrypto = (event) => setEditAmountCrypto(event.target.value);
  const handleChangeAmountInvested = (event) => setEditAmountInvested(event.target.value);

  const dateFormProps = {
    handleChangeDate: setEditDate,
    dateCrypto: editDate,
    formData: formData.dateFields
  };
  const radioFormProps = {
    handleChangeFiat: handleChangeFiatName,
    fiatName: editFiatName,
    formData: formData.radioFiatFields
  };
  const selectExchangeProps = {
    options: Object.keys(selectData),
    label: "Exchange",
    value: editExchange,
    handleChange: handleChangeExchange
  };
  const cryptoOptions = editExchange === selectedExchange ?
    Object.keys(selectData[selectedExchange]) :
    Object.keys(selectData[editExchange]);

  const selectCryptoProps = {
    options: cryptoOptions,
    label: "Coin",
    value: editCrypto,
    handleChange: handleChangeCrypto
  };
  const pairOptions = editExchange === selectedExchange ?
    selectData[selectedExchange][selectedCrypto] :
    (selectData[editExchange][editCrypto] ?
      selectData[editExchange][editCrypto] : []);
  const selectPairProps = {
    options: pairOptions,
    label: "Pair",
    value: editPair,
    handleChange: handleChangePair
  };
  const amountCryptoProps = {
    variant: "outlined",
    value: editAmountCrypto,
    onChange: handleChangeAmountCrypto,
    label: 'Amount Crypto invested',
    inputProps:{ step: '0.0001' },
    type: 'number'
  };
  const amountInvestedProps = {
    variant: "outlined",
    value: editAmountInvested,
    onChange: handleChangeAmountInvested,
    label: 'Amount invested',
    inputProps:{ step: '0.0001' },
    type: 'number'
  };

  const handleOnSubmit = (event) => {
    const editedValues = {
      uuid,
      dateCrypto: editDate,
      fiatName: editFiatName,
      amountCrypto: editAmountCrypto,
      amountInvested: editAmountInvested,
      exchangeData: {
        selectedExchange: editExchange,
        selectedCrypto: editCrypto,
        selectedPair: editPair
      },
      updatedAt: new Date()
    };

    onSubmit(event, editedValues);
  }


  return (
    <form
      onSubmit={handleOnSubmit}
    >
      <CustomDatePicker {...dateFormProps} />
      <RadioGroup {...radioFormProps} />
      <SelectWrapper {...selectExchangeProps} />
      <SelectWrapper {...selectCryptoProps} />
      <SelectWrapper {...selectPairProps} />
      <TextField {...amountCryptoProps} />
      <TextField {...amountInvestedProps} />
      <Button type="submit">Submit</Button>
    </form>
  )
}

export default EditForm;
