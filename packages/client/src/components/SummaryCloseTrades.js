import React from 'react';
import { toLocaleString, formattedDate } from '../clientUtils';
import { DATE_FORMAT_TIME } from '../config/client';
import { Avatar, List, ListItem, ListItemText, ListItemAvatar, Typography, withStyles, Divider, Paper, Grid } from '@material-ui/core';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

const getTotalCount = (trades) => {
  let total = 0;

  if (trades.length > 0) {
    trades.forEach(trade => {
      total += trade.trades.reduce((prev, curr) => prev += (curr.closeAmount * curr.closePrice), 0)
    });
  }

  return toLocaleString(total);
}

const textFormatter = trade => `Sold ${trade.closeAmount} at ${trade.closePrice} = ${toLocaleString(trade.closeAmount * trade.closePrice)}`

const SummaryCloseTrades = ({
  trades,
  classes
}) => (
    <Grid item>
      <Paper className={classes.root}>
        <Typography variant="h3" color="inherit" style={{ padding: '10px' }}>
          Closed Trades
        </Typography>
        <Divider />
        {trades && trades.map(data => (
          <React.Fragment>
            <List>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar
                      src={`./icon/${data.crypto}.svg`}
                      alt={`crypto icon for ${data.crypto.toLowerCase()}`}
                        onError={( e ) => {
                          e.target.src = './icon/default.svg';
                        }}
                    />
                </ListItemAvatar>
                <ListItemText>
                  <Typography variant="h6">
                    Closed Trade for {data.crypto}
                  </Typography>
                </ListItemText>
              </ListItem>
              {data.trades && data.trades.map(trade => (
                  <ListItem key={trade.date} style={{ flexWrap: 'wrap' }}>
                    <ListItemText primary={formattedDate(trade.date, DATE_FORMAT_TIME)} />
                    {
                      trade.closeAmount > 0 &&
                      <ListItemText
                        style={{ paddingLeft: 0 }}
                        primary={textFormatter(trade)}
                      />
                    }
                  </ListItem>
              ))}
            </List>
            <Divider />
          </React.Fragment>
        ))}
        <Typography variant="h3" color="inherit" style={{ padding: '10px' }}>
          Total {getTotalCount(trades)}
        </Typography>
      </Paper>
    </Grid>
  );

export default withStyles(styles)(SummaryCloseTrades);
