import React from 'react';
import { TextField, MenuItem } from '@material-ui/core';

const Select = ({
  options, label, handleChange, value
}) => (
  <TextField
    select
    label={`${label} name`}
    value={value}
    onChange={handleChange}
    helperText={`Please select your ${label}`}
    margin="normal"
    variant="outlined"
  >
    {
      options.map( option => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem> ))
    }
  </TextField>
);

export default Select;
