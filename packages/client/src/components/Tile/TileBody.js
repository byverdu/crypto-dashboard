import React, {useState} from 'react';
import { CardContent, List, ListItem, ListSubheader, ListItemText, Button, withStyles, Divider } from '@material-ui/core';
import { formattedDate, toLocaleString } from '../../clientUtils';
import { DATE_FORMAT, DATE_FORMAT_TIME } from '../../config/client';

const styles = theme => ({
  show: {
    display: 'block',
    position: 'absolute',
    boxShadow: '0 0 1px',
    background: 'white'
  },
  hide: {
    display: 'none'
  }
});

const TileBody = ({
  date, amount, name, price, tradeValue, exchange, trades, classes
}) => {
  const [showDate, setShowDates] = useState(false);

  return (
    <CardContent>
      <List
        subheader={
          <ListSubheader>Position Details</ListSubheader>}
      >
        <ListItem divider={true}>
          Trade date: {formattedDate(date, DATE_FORMAT)} at {exchange}
        </ListItem>
        <ListItem>
          Bought {amount} {name} @ {price} = {toLocaleString((tradeValue))}
        </ListItem>
        <ListItem>
          {
            trades &&
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setShowDates(!showDate)}
            >
              Show Last updates
            </Button>
          }
        </ListItem>
        <div className={showDate ? classes.show : classes.hide}>
          {trades && trades.trades.map(data => (
            <React.Fragment>
              <ListItem key={data.date} style={{flexWrap: 'wrap'}}>
                <ListItemText primary={formattedDate(data.date, DATE_FORMAT_TIME)} />
                {
                  data.closeAmount > 0 &&
                    <ListItemText style={{paddingLeft: 0}} primary={`Sold ${data.closeAmount} at ${data.closePrice} = ${data.closeAmount * data.closePrice}`} />
                }
              </ListItem>
              {trades.trades.length > 1 && <Divider/>}
            </React.Fragment>
          ))}
        </div>
      </List>
    </CardContent>
  );
}

export default withStyles(styles)(TileBody);
