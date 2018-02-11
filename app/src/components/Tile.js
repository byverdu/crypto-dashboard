import React from 'react';
import {
  Card, CardHeader, CardFooter, CardBody,
  CardTitle, ListGroup, ListGroupItem
} from 'reactstrap';
import { calculateTradingValue, fiatConverter } from '../../utils';

const Tile = ({
  name, date, amount, price, fiat
}) => {
  const fiatString = fiatConverter( fiat );
  const tradeValue = calculateTradingValue( amount, price );
  return (
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
            Bought {amount} {name} @ {price} = {fiatString} {tradeValue}
          </ListGroupItem>
        </ListGroup>
      </CardBody>
      <CardFooter className="text-muted">
        Trading @ API resp
      </CardFooter>
    </Card>
  );
};

export default Tile;
