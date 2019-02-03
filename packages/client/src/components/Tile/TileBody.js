import React from 'react';
import { CardContent, List, ListItem, ListSubheader } from '@material-ui/core';

import { formattedDate, toLocaleString } from '../../clientUtils';

const TileBody = ({
  date, amount, name, price, tradeValue, exchange
}) => (
  <CardContent>
    <List
      subheader={
        <ListSubheader>Position Details</ListSubheader>}
    >
      <ListItem divider={true}>
        Trade date: {formattedDate( date )} at {exchange}
      </ListItem>
      <ListItem>
        Bought {amount} {name} @ {price} = {toLocaleString((tradeValue))}
      </ListItem>
    </List>
  </CardContent>
);

export default TileBody;
