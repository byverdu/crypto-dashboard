import React from 'react';
import {
  Card, CardHeader, CardFooter, CardBody,
  CardTitle, ListGroup, ListGroupItem
} from 'reactstrap';
import { calculateTradingValue, fiatConverter } from '../../utils';

const Tile = ({
  dateCrypto, nameCrypto, fiatCrypto, priceCrypto, amountCrypto
}) => {
  const fiatString = fiatConverter( fiatCrypto );
  const tradeValue = calculateTradingValue( amountCrypto, priceCrypto );
  return (
    <Card>
      <CardHeader tag="h3">
        { nameCrypto }
      </CardHeader>
      <CardBody>
        <CardTitle>
          Position Details
        </CardTitle>
        <ListGroup>
          <ListGroupItem color="secondary">
            Trade date: {dateCrypto}
          </ListGroupItem>
          <ListGroupItem color="success">
            Bought {amountCrypto} {nameCrypto} @ {priceCrypto} = {fiatString} {tradeValue}
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
