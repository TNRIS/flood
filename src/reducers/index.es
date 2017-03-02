import { combineReducers } from 'redux'
import { responsiveStateReducer } from 'redux-responsive'

import baseLayers from './baseLayers'
import featureLayers from './featureLayers'
import floodStatus from './floodStatus'
import map from './map'
import subscribeDialog from './subscribeDialog'
import subscriptionForm from './subscriptionForm'
import subscriptionList from './subscriptionList'
import { subscriptionsById, allSubscriptions } from './subscriptions'
import user from './user'

export const rootReducer = combineReducers({
  baseLayers: baseLayers,
  featureLayers: featureLayers,
  map: map,
  floodStatus: floodStatus,
  subscribeDialog: subscribeDialog,
  browser: responsiveStateReducer,
  subscriptionForm,
  subscriptionList,
  subscriptions: combineReducers({
    subscriptionsById: subscriptionsById,
    allSubscriptions: allSubscriptions
  }),
  user
})
