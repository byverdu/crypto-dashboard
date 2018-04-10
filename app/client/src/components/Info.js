import React from 'react';
import { Alert } from 'reactstrap';

const Info = ({ text, type, children }) => <Alert color={type}>
  {text}
  {children && children}
</Alert>;

export default Info;
