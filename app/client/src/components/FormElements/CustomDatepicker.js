import React from 'react';
import DatePicker from 'material-ui-pickers/DatePicker';
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/MuiPickersUtilsProvider';
import * as UI from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = {};

const CustomDatePicker = ({ formData, handleChangeDate, date }) => (
    <UI.FormControl component="fieldset" required>
    <UI.FormLabel component="legend">{formData.text}</UI.FormLabel>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
          disableFuture
          required
          onChange={handleChangeDate}
          value={date}
          label={formData.text}
          variant="outlined"
        />
      </MuiPickersUtilsProvider>
    </UI.FormControl>
);

CustomDatePicker.propTypes = {
  handleChangeDate: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  date: PropTypes.string.isRequired,
  classes: PropTypes.any
};

export default withStyles( styles )( CustomDatePicker );
