
import { combineReducers } from 'redux';

import layers from './layers';

const app = combineReducers({
  layers: layers,
});

export default app;
