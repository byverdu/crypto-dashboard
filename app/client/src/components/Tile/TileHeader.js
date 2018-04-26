import React from 'react';
import { CardHeader, Button } from 'reactstrap';

const TileHedaer = ({ name, onClickRemoveItem, onClickEditItem }) => {
  const imgSrc = `./icon/${name}.svg`;
  return (
    <CardHeader tag="h3">
      {name}
      <img src={imgSrc} />
      <Button onClick={onClickRemoveItem} color="danger">Remove</Button>
      <Button onClick={onClickEditItem} color="info">Edit</Button>
    </CardHeader>
  );
};

export default TileHedaer;
