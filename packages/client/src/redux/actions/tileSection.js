import { createAction } from 'redux-actions';
import {
  UPDATE_TOTAL_INVESTED,
  UPDATE_TOTAL_PROFIT_LOST,
  UPDATE_DATA_TOTAL_PROFIT_LOST,
  UPDATE_SUBSCRIPTIONS,
  UNSUBSCRIBE
} from '../constants';

const updateTotalInvested = createAction(
  UPDATE_TOTAL_INVESTED
);

const updateTotalProgitLost = createAction(
  UPDATE_TOTAL_PROFIT_LOST
);

const updateDataTotalProgitLost = createAction(
  UPDATE_DATA_TOTAL_PROFIT_LOST
);

const updateSubscriptions = createAction(
  UPDATE_SUBSCRIPTIONS
);

const unsubscribe = createAction(
  UNSUBSCRIBE
);

export {
  updateTotalInvested,
  updateTotalProgitLost,
  updateDataTotalProgitLost,
  updateSubscriptions,
  unsubscribe
};
