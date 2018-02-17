import React from 'react';
import { CardFooter } from 'reactstrap';

const TileFooter = ({
  actualPrice, amount, isProfit, profitLost, actualValue
}) => (
  <CardFooter className="text-muted">
    Trading @ {actualPrice} x {amount} = {actualValue}
    <div className={isProfit ? 'bg-success text-white' : 'bg-danger text-white'}>
      Profit / Lost {profitLost}
    </div>
  </CardFooter>
);

export default TileFooter;
