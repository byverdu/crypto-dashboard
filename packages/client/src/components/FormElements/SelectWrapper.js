import React, { useState } from 'react';
import { InputLabel, Select, OutlinedInput, FormControl } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { Info } from '../index';
import invalidHandler from './invalidHandler';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
});

const SelectWrapper = ({
  options, label, handleChange, value, classes
}) => {
  const [isValid, setInvalid] = useState( true );
  const [errorMessage, setMessage] = useState( '' );
  const onInvalid = invalidHandler( setInvalid, setMessage );
  const internalHandler = ( e ) => {
    handleChange( e );
    onInvalid( e );
  };

  return (
    <FormControl variant="outlined" className={classes.formControl} required>
      <InputLabel htmlFor={label}>{label}</InputLabel>
      <Select
        required
        native
        value={value}
        name={label}
        onChange={internalHandler}
        onInvalid={onInvalid}
        input={
          <OutlinedInput
            labelWidth={100}
            name="age"
            id="outlined-age-simple"
          />
        }
        >
          <option></option>
        {
          options.map( option => (
            <option key={option} value={option}>
              {option}
            </option> ))
        }
      </Select>
      {!isValid && <Info type="error" message={errorMessage} />}
    </FormControl>
  );
};

export default withStyles( styles )( SelectWrapper );
