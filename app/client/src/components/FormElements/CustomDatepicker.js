import React, { useState } from 'react';
import DatePicker from 'material-ui-pickers/DatePicker';
import DateFnsUtils from '@date-io/date-fns';
import MuiPickersUtilsProvider from 'material-ui-pickers/MuiPickersUtilsProvider';
import * as UI from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import { Info } from '../index';
import invalidHandler from './invalidHandler';

const styles = {};

const CustomDatePicker = ({ formData, handleChangeDate, date }) => {
  const [isValid, setInvalid] = useState( true );
  const [errorMessage, setMessage] = useState( '' );
  const onInvalid = invalidHandler( setInvalid, setMessage );

  const internalHandler = ( e ) => {
    handleChangeDate( e );
    onInvalid( e );
  };

  return (
    <UI.FormControl component="fieldset" required>
      <UI.FormLabel component="legend">{formData.text}</UI.FormLabel>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
          disableFuture
          keyboard={true}
          required
          name={formData.name}
          onChange={internalHandler}
          onInvalid={ onInvalid }
          value={date}
          label={formData.text}
          variant="outlined"
        />
      </MuiPickersUtilsProvider>
      {!isValid && <Info type="error" message={errorMessage} />}
    </UI.FormControl>
  );
};

CustomDatePicker.propTypes = {
  handleChangeDate: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  date: PropTypes.string,
  classes: PropTypes.any
};

export default withStyles( styles )( CustomDatePicker );

