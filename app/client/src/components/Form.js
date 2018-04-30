import React from 'react';
import { Button } from 'reactstrap';
import { Fieldset } from './index';

const Form = ({
  ...props, formData, onSubmit, refCallback
}) => <form
    ref={refCallback}
    onSubmit={onSubmit}
    noValidate
  >
    <Fieldset {...formData}></Fieldset>
    {props.children}
    <Button
      outline
      color="primary"
    >
      Submit
    </Button>
  </form>;

export default Form;
