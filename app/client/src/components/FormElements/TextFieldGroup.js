import React, { useState } from 'react';
import { FormControl, FormLabel, TextField } from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import { Info } from '../index';
import invalidHandler from './invalidHandler';

const styles = {};

const TextFieldGroup = ({
  handleChangeInput, formData
}) => {
  const [isValid, setInvalid] = useState( true );
  const [errorMessage, setMessage] = useState( '' );
  const onInvalid = invalidHandler( setInvalid, setMessage );
  const internalHandler = ( e ) => {
    handleChangeInput( e );
    onInvalid( e );
  };

  return (
    <FormControl component="fieldset" required>
      <FormLabel component="legend">Select Asset and Amount</FormLabel>

      {formData && formData.map(( prop, index ) => (
        <React.Fragment key={`${prop.name}-${index}`}>
            <TextField
              key={`${prop.name}-${index}`}
              {...prop}
              variant="outlined"
              onChange={internalHandler}
              onInvalid={onInvalid}
            />
          {( prop.required && !isValid ) && <Info key={prop.name} type="error" message={errorMessage} />}
        </React.Fragment>
      ))}
    </FormControl>
  );
};

TextFieldGroup.propTypes = {
  handleChangeInput: PropTypes.func.isRequired,
  formData: PropTypes.array.isRequired,
  classes: PropTypes.any
};

export default withStyles( styles )( TextFieldGroup );
