import React from 'react';
import {
  CardBody, CardTitle, ListGroup, ListGroupItem
} from 'reactstrap';

const TileBody = ({
  date, amount, name, price, tradeValue
}) => (
  <CardBody>
    <CardTitle>
      Position Details
    </CardTitle>
    <ListGroup>
      <ListGroupItem color="secondary">
        Trade date: {date}
      </ListGroupItem>
      <ListGroupItem color="success">
        Bought {amount} {name} @ {price} = {tradeValue}
      </ListGroupItem>
    </ListGroup>
  </CardBody>
);

export default TileBody;
