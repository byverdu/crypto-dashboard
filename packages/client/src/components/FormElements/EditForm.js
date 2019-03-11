import React, { useState } from 'react';
import {
  RadioGroup,
  CustomDatePicker,
  SelectWrapper,
  Info
} from '../index.js';
import {TextField, Button, Chip, Divider} from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
const formData = require('../../config/data');

const EditForm = ({
  uuid,
  dateCrypto,
  fiatName,
  selectData,
  amountCrypto,
  priceCrypto,
  exchangeData: {
    selectedExchange,
    selectedCrypto,
    selectedPair
  },
  onSubmit,
  trades
}) => {
  const [editDate, setEditDate] = useState(dateCrypto);
  const [editFiatName, setEditFiatName] = useState(fiatName);
  const [editExchange, setEditExchange] = useState(selectedExchange);
  const [editCrypto, setEditCrypto] = useState(selectedCrypto);
  const [editPair, setEditPair] = useState(selectedPair);
  const [editAmountCrypto, setEditAmountCrypto] = useState(amountCrypto);
  const [editPriceCrypto, setEditPriceCrypto] = useState(priceCrypto);
  const [closingAmountCrypto, setClosingAmountCrypto] = useState(0);
  const [closingPriceCrypto, setClosingAmountPriceCrypto] = useState(0);
  const [closingCrypto, setClosingCrypto] = useState(false);
  const [notValidTrade, setNotValidTrade] = useState(false);

  const handleChangeExchange = (event) => setEditExchange(event.target.value);
  const handleChangeFiatName = (event) => setEditFiatName(event.target.value);
  const handleChangeCrypto = (event) => setEditCrypto(event.target.value);
  const handleChangePair = (event) => setEditPair(event.target.value);
  const handleChangeAmountCrypto = (event) => setEditAmountCrypto(event.target.value);
  const handleChangePriceCrypto = (event) => setEditPriceCrypto(event.target.value);
  const handleClosingAmountCrypto = (event) => {
    setClosingAmountCrypto(event.target.value);
    setNotValidTrade(updateAmountCrypto(Number(event.target.value)) < 0);
  } 

  const handleClosingPriceCrypto = (event) => setClosingAmountPriceCrypto(event.target.value);

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
  const priceCryptoProps = {
    variant: "outlined",
    value: editPriceCrypto,
    onChange: handleChangePriceCrypto,
    label: 'Amount invested',
    inputProps:{ step: '0.0001' },
    type: 'number'
  };
  const amountClosingCryptoProps = {
    variant: "outlined",
    value: closingAmountCrypto,
    onChange: handleClosingAmountCrypto,
    label: 'Amount Clsoing Trade',
    inputProps:{ step: '0.0001' },
    type: 'number',
    style: {margin: '10px 0'}
  };
  const priceClosingCryptoProps = {
    variant: "outlined",
    value: closingPriceCrypto,
    onChange: handleClosingPriceCrypto,
    label: 'Amount closing',
    inputProps:{ step: '0.0001' },
    type: 'number',
    style: {margin: '10px 0'}
  };

  const updateAmountCrypto = (closingAmountCrypto) => {
    return closingAmountCrypto > 0 ? editAmountCrypto - closingAmountCrypto : editAmountCrypto;
  }

  const handleOnSubmit = (event) => {
    const oldTrades = trades ? trades.trades : [];
    const editedValues = {
      crypto: {
        uuid,
        dateCrypto: editDate,
        fiatName: editFiatName,
        amountCrypto: updateAmountCrypto(closingAmountCrypto),
        priceCrypto: editPriceCrypto,
        exchangeData: {
          selectedExchange: editExchange,
          selectedCrypto: editCrypto,
          selectedPair: editPair
        },
        pairToWatch: `${editCrypto}~${editPair}`
      },
      trades: {
        uuid,
        trades: [
          ...oldTrades,
          {
            date: new Date(),
            closePrice: closingPriceCrypto,
            closeAmount: closingAmountCrypto
          }
        ]
      },
      isTradeToClose: updateAmountCrypto(closingAmountCrypto) === 0
    };

    onSubmit(event, editedValues);
  }

  return (
    <form onSubmit={handleOnSubmit}>
      <CustomDatePicker {...dateFormProps} />
      <RadioGroup {...radioFormProps} />
      <SelectWrapper {...selectExchangeProps} />
      <SelectWrapper {...selectCryptoProps} />
      <SelectWrapper {...selectPairProps} />
      <TextField {...amountCryptoProps} />
      <TextField {...priceCryptoProps} />
      <Divider />
      <Chip
        icon={<DoneIcon />}
        label="Data Closing Trade"
        clickable
        color="primary"
        onClick={() => setClosingCrypto(!closingCrypto)}
        variant="outlined"
        style={{margin: '10px 25%'}}
      />
      <div style={{display: closingCrypto ? 'block' : 'none', margin: 10}}>
        <TextField {...amountClosingCryptoProps} />
        <TextField {...priceClosingCryptoProps} />
      </div>
      <Divider />
      {notValidTrade &&
        <Info
          message="Your Closing trade must be positive"
          type="error"
        />
      }
      <Button
        disabled={notValidTrade}
        variant="contained"
        type="submit"
      >
        Submit
      </Button>
    </form>
  )
}

export default EditForm;
