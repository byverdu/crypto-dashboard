import React from 'react';
import { Alert } from 'reactstrap';

const Info = ({ text, type }) => <Alert color={type}>
  {text}
</Alert>;

export default Info;
