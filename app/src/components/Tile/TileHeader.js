import React from 'react';
import { CardHeader } from 'reactstrap';

const TileHedaer = ({ name }) => (
  <CardHeader tag="h3">
    {name}
  </CardHeader>
);

export default TileHedaer;
