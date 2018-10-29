import React from 'react';
import * as UI from '@material-ui/core/';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import * as Colors from '@material-ui/core/colors';

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
    color: Colors.orange[ 100 ],
    '&$checked': {
      color: Colors.orange[ 500 ]
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
  <UI.FormControl component="fieldset" required>
    <UI.FormLabel component="legend">Select Fiat</UI.FormLabel>
    <UI.RadioGroup
      aria-label="gender"
      value={fiatName}
      name="fiatName"
      onChange={handleChangeFiat}
    >
      {formData && formData.map( prop => (
        <UI.FormControlLabel
          key={prop.id}
          value={prop.value}
          control={
            <UI.Radio
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
    </UI.RadioGroup>
  </UI.FormControl>
);

FormRadioGroup.propTypes = {
  handleChangeFiat: PropTypes.func.isRequired,
  formData: PropTypes.array.isRequired,
  fiatName: PropTypes.string.isRequired,
  classes: PropTypes.any
};

export default withStyles( styles )( FormRadioGroup );
