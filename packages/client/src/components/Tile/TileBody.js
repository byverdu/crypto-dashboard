import React, {useState} from 'react';
import { CardContent, List, ListItem, ListSubheader, ListItemIcon, ListItemText, Button, withStyles } from '@material-ui/core';
import Done from '@material-ui/icons/Done';
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
  date, amount, name, price, tradeValue, exchange, updatedAt, classes
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
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setShowDates(!showDate)}
          >
            Show Last updates
          </Button>
        </ListItem>
        <div className={showDate ? classes.show : classes.hide}>
          {updatedAt.map(dateUpdate => (
            <ListItem>
              <ListItemIcon key={dateUpdate}>
                <Done />
              </ListItemIcon>
              <ListItemText primary={formattedDate(dateUpdate, DATE_FORMAT_TIME)} />
            </ListItem>
          ))}
        </div>
      </List>
    </CardContent>
  );
}

export default withStyles(styles)(TileBody);
