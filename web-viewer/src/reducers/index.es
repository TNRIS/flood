
import { combineReducers } from 'redux';

import map from './map';

const app = combineReducers({
  map: map,
});

export default app;
