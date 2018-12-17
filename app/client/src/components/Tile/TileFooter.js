import React from 'react';
import { Paper } from '@material-ui/core';

const TileFooter = ({
  actualPrice, amount, isProfit, profitLost, actualValue
}) => (
  <Paper elevation={8}>
    Trading @ {actualPrice} x {amount} = {actualValue}
    <div className={isProfit ? 'bg-success text-white' : 'bg-danger text-white'}>
      Profit / Lost {profitLost}
    </div>
  </Paper>
);

export default TileFooter;
