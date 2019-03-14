import React from 'react';
import { Typography, withStyles, Divider, Paper, Grid } from "@material-ui/core";
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
    padding: '10px'
  },
  lost: {
    background: red[ 300 ],
    color: 'white',
    padding: '10px'
  },
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  item: {
    padding: 10
  }
});

const checkProfitLost = (total, expected) => total > expected ? 'profit' : 'lost';
const newTotalInvested = (data, totalProfitLost) => `New Total Invested: ${data.length === 0 ? 0 : toLocaleString( totalProfitLost, 4 )}`;
const newTotalProfitLost = (data, totalProfitLost, totalInvested) => `Total Profit/Lost: ${data.length === 0 ? 0 : toLocaleString( totalProfitLost - totalInvested, 4 )}`

const Summary = ({
  tileSection: {
    totalInvested,
    totalProfitLost
  },
  api: {data},
  classes
}) => (
  <Grid item>
    <Paper className={classes.root}>
      <Typography
        variant="h3"
        color="inherit"
        className={classes.item}
      >
        Portfolio Resume
      </Typography>

      <Divider />

      <Typography
        variant="h4"
        color="inherit"
        className={classes.item}
      >
        Total Invested: {toLocaleString(totalInvested)}
      </Typography>

      <Divider variant="middle" />

      <Typography
        variant="h4"
        className={classes[checkProfitLost(totalProfitLost, totalInvested)]}
      >
        {newTotalInvested(data, totalProfitLost)}
      </Typography>

      <Divider variant="middle" />

      <Typography
        variant="h4"
        className={classes[checkProfitLost((totalProfitLost - totalInvested), 0)]}
      >
        {newTotalProfitLost(data, totalProfitLost, totalInvested)}
      </Typography>
    </Paper>
  </Grid>
);

export default withStyles(styles)(Summary);
