import React from 'react';
import { toLocaleString, formattedDate } from '../clientUtils';
import green from '@material-ui/core/colors/green';
import { DATE_FORMAT_TIME } from '../config/client';
import { Avatar, List, ListItem, ListItemText, ListItemAvatar, Typography, withStyles, Divider } from '@material-ui/core';

const styles = theme => ({
  main: {
    boxShadow: '0 0 1px',
    background: 'white',
    padding: 20,
    margin: '20px 0',
    width: 580
  },
  trade: {
    background: green[300],
    color: 'white',
    padding: '10px'
  }
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
    <div className={classes.main}>
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
    </div>
  );

export default withStyles(styles)(SummaryCloseTrades);
