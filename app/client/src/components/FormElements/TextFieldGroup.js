import React from 'react';
import { FormControl, FormLabel, TextField } from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = {};

const TextFieldGroup = ({
  handleChangeInput, formData
}) => (
  <FormControl component="fieldset" required>
    <FormLabel component="legend">Select Asset and Amount</FormLabel>

    {formData && formData.map( prop => (
      <TextField
        key={prop.name}
        {...prop}
        variant="outlined"
        onChange={handleChangeInput}
      />
    ))}
  </FormControl>
);

TextFieldGroup.propTypes = {
  handleChangeInput: PropTypes.func.isRequired,
  formData: PropTypes.array.isRequired,
  classes: PropTypes.any
};

export default withStyles( styles )( TextFieldGroup );
