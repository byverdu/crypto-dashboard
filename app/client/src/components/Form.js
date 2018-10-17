import React from 'react';
import { Button } from 'reactstrap';
import { Fieldset } from './index';

const Form = ({
  formData, onSubmit, refCallback, ...props
}) => <form
    ref={refCallback}
    onSubmit={onSubmit}
    noValidate
  >
    <Fieldset {...formData} />
    {props.children}
    <Button
      outline
      color="primary"
    >
      Submit
    </Button>
  </form>;

export default Form;
