import React from 'react';
import { Button } from 'reactstrap';
import {
  InputWithError
} from './index';

const renderFormItems = items =>
  items.map(( item, key ) => (
    <InputWithError key={key} {...item} />
  ));

const Form = ({
  data, onSubmit, refCallback
}) => <form
    ref={refCallback}
    onSubmit={onSubmit}
    noValidate
  >
    {renderFormItems( data )}
    <Button
      outline
      color="primary"
    >
      Submit
    </Button>
  </form>;

export default Form;
