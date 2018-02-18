import React from 'react';
import { CardHeader, Button } from 'reactstrap';

const TileHedaer = ({ name, onClickRemoveItem }) => (
  <CardHeader tag="h3">
    {name} <Button onClick={onClickRemoveItem} color="danger">Remove</Button>
  </CardHeader>
);

export default TileHedaer;
