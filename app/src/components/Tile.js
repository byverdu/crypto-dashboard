import React from 'react';
import {
  Card, CardHeader, CardFooter, CardBody,
  CardTitle, ListGroup, ListGroupItem
} from 'reactstrap';
import calculateTradingValue from '../../utils';

const Tile = ({
  name, date, amount, price
}) => (
    <Card>
      <CardHeader tag="h3">
        { name }
      </CardHeader>
      <CardBody>
        <CardTitle>
          Position Details
        </CardTitle>
        <ListGroup>
          <ListGroupItem color="secondary">
            Trade date: {date}
          </ListGroupItem>
          <ListGroupItem color="success">
            Bought {amount} {name} @ {price} = {calculateTradingValue( amount, price )}
          </ListGroupItem>
        </ListGroup>
      </CardBody>
      <CardFooter className="text-muted">
        Trading @ API resp
      </CardFooter>
    </Card>
);

export default Tile;
