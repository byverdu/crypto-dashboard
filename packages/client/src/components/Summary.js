import React from 'react';
import { Typography, withStyles, Divider } from "@material-ui/core";
import { toLocaleString } from '../clientUtils';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';

const styles = theme => ({
  main: {
    boxShadow: '0 0 1px',
    background: 'white',
    padding: 20,
    margin: '20px 0',
    width: 580
  },
  profit: {
    background: green[ 300 ],
    color: 'white',
    padding: '10px 0'
  },
  lost: {
    background: red[ 300 ],
    color: 'white',
    padding: '10px 0'
  }
});

const checkProfitLost = (amount) => amount > 0 ? 'profit' : 'lost';

const Summary = ({
  tileSection: {
    totalInvested,
    totalProfitLost
  },
  api: {data},
  classes
}) => (
  <div className={classes.main}>
    <Typography variant="h3" color="inherit" style={{padding: '10px 0'}}>
      Portfolio Resume
    </Typography>
    <Divider />
    <Typography variant="h4" color="inherit" style={{padding: '10px 0'}}>
      Total Invested: {toLocaleString(totalInvested)}
    </Typography>
    <Divider variant="middle" />
    <Typography variant="h4" className={classes[checkProfitLost(totalProfitLost)]}>
      New Total Invested: {data.length === 0 ? 0 : toLocaleString( totalProfitLost, 4 )}
    </Typography>
    <Divider variant="middle" />
    <Typography variant="h4" className={classes[checkProfitLost(totalProfitLost - totalInvested)]}>
      Total Profit/Lost: {data.length === 0 ? 0 : toLocaleString( totalProfitLost - totalInvested, 4 )}
    </Typography>
  </div>
);

export default withStyles(styles)(Summary);
