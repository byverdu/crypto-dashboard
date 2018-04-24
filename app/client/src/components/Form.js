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
  ...props, formData, onSubmit, refCallback
}) => <form
    ref={refCallback}
    onSubmit={onSubmit}
    noValidate
  >
    {renderFormItems( formData )}
    {props.children}
    <Button
      outline
      color="primary"
    >
      Submit
    </Button>
  </form>;

export default Form;
