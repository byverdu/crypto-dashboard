import React from 'react';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@material-ui/core/';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';

import SvgEURFlag from '../SvgIcon/EUR';
import SvgGBPFlag from '../SvgIcon/GBP';
import SvgUSDFlag from '../SvgIcon/USD';
import SvgNotApplicableFlag from '../SvgIcon/NA';

const flagVariant = {
  USD: SvgUSDFlag,
  EUR: SvgEURFlag,
  GBP: SvgGBPFlag,
  NA: SvgNotApplicableFlag
};

const styles = {
  root: {
    color: orange[ 100 ],
    '&$checked': {
      color: orange[ 500 ]
    }
  },
  checked: {}
};

const renderRadioLabel = ( prop ) => {
  const Icon = flagVariant[ prop.value ];

  return (
    <React.Fragment>
      <Icon />
        {prop.text}
    </React.Fragment>
  );
};

const FormRadioGroup = ({
  handleChangeFiat, formData, fiatName, classes
}) => (
  <FormControl component="fieldset" required>
    <FormLabel component="legend">Select Fiat</FormLabel>
    <RadioGroup
      aria-label="gender"
      value={fiatName}
      name="fiatName"
      onChange={handleChangeFiat}
    >
      {formData && formData.map( prop => (
        <FormControlLabel
          key={prop.id}
          value={prop.value}
          control={
            <Radio
              required
              classes={{
                root: classes.root,
                checked: classes.checked
              }}
            />
          }
          label={renderRadioLabel( prop )}
          labelPlacement="start"
        /> )
        )
      }
    </RadioGroup>
  </FormControl>
);

FormRadioGroup.propTypes = {
  handleChangeFiat: PropTypes.func.isRequired,
  formData: PropTypes.array.isRequired,
  fiatName: PropTypes.string.isRequired,
  classes: PropTypes.any
};

export default withStyles( styles )( FormRadioGroup );
