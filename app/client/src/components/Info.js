import React from 'react';
import { Alert } from 'reactstrap';

const Info = ({
  text, type, ...props
}) => {
  const className = props.fade ? 'hide' : '';

  return (
    <Alert color={type} className={className} >
      {text}
      {props.children && props.children}
    </Alert>
  );
};

export default Info;
