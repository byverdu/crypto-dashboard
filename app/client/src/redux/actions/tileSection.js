import { createAction } from 'redux-actions';
import {
  UPDATE_TOTAL_INVESTED,
  UPDATE_TOTAL_PROFIT_LOST,
  UPDATE_DATA_TOTAL_PROFIT_LOST
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

export {
  updateTotalInvested,
  updateTotalProgitLost,
  updateDataTotalProgitLost
};
