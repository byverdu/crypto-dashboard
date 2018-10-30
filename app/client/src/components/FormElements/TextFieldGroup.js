import React from 'react';
import * as UI from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = {};

const TextFieldGroup = ({
  handleChangeInput, formData
}) => (
  <UI.FormControl component="fieldset" required>
    <UI.FormLabel component="legend">Select Asset and Amount</UI.FormLabel>

    {formData && formData.map( prop => (
      <UI.TextField
        key={prop.name}
        {...prop}
        onChange={handleChangeInput}
      />
    ))}
  </UI.FormControl>
);

TextFieldGroup.propTypes = {
  handleChangeInput: PropTypes.func.isRequired,
  formData: PropTypes.array.isRequired,
  classes: PropTypes.any
};

export default withStyles( styles )( TextFieldGroup );
