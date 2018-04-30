import React from 'react';
import { FormGroup } from 'reactstrap';
import { InputWithError } from './index';

const renderFormItems = items =>
  items.map(( item, key ) => (
    <InputWithError key={key} {...item} />
  ));

const legendMap = {
  inputFields: 'Basic details for trade',
  radioFiatFields: 'Fiat trade was done',
  radioCryptoFields: 'Crypto pair trade was done'
};

const Fieldset = formData => (
  Object.keys( formData )
    .map(( item, key ) => (
      <FormGroup tag="fieldset" key={key}>
        <legend>
          {legendMap[ item ]}
        </legend>
        {renderFormItems( formData[ item ])}
    </FormGroup>
    ))
);

export default Fieldset;
