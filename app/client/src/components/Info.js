import React from 'react';
import { Alert } from 'reactstrap';

const Info = ({
  ...props, text, type, children
}) => {
  const className = props.fade ? 'hide' : '';

  return (
    <Alert color={type} className={className} >
      {text}
      {children && children}
    </Alert>
  );
};

export default Info;
