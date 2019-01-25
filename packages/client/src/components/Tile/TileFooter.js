import React from 'react';
import { Paper } from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  profit: {
    background: green[ 300 ],
    color: 'white'
  },
  lost: {
    background: red[ 300 ],
    color: 'white'
  }
};

const TileFooter = ({
  actualPrice, amount, isProfit, profitLost, actualValue, classes
}) => (
  <Paper elevation={8}>
    Trading @ {actualPrice} x {amount} = {actualValue}
    <div className={isProfit ? classes.profit : classes.lost}>
      Profit / Lost {profitLost}
    </div>
  </Paper>
);

export default withStyles( styles )( TileFooter );
