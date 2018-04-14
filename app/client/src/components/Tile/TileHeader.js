import React from 'react';
import { CardHeader, Button } from 'reactstrap';

const TileHedaer = ({ name, onClickRemoveItem, onClickEditItem }) => (
  <CardHeader tag="h3">
    {name}
    <Button onClick={onClickRemoveItem} color="danger">Remove</Button>
    <Button onClick={onClickEditItem} color="info">Edit</Button>
  </CardHeader>
);

export default TileHedaer;
