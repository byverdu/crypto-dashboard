import React from 'react';
import { Button } from 'reactstrap';

const Form = ({
  children, onSubmit, refCallback
}) => <form
    ref={refCallback}
    onSubmit={onSubmit}
    noValidate
  >
    {children}
    <Button
      outline
      color="primary"
    >
      Submit
    </Button>
  </form>;

export default Form;
