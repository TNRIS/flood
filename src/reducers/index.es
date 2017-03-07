import { combineReducers } from 'redux'
import { responsiveStateReducer } from 'redux-responsive'

import baseLayers from './baseLayers'
import featureLayers from './featureLayers'
import floodStatus from './floodStatus'
import map from './map'
import subscribeDialog from './subscribeDialog'
import { subscriptionChangesById, allSubscriptionChanges } from './subscriptionChanges'
import subscriptionForm from './subscriptionForm'
import subscriptionList from './subscriptionList'
import { subscriptionsById, allSubscriptions } from './subscriptions'
import { gageSubscriptionById, allGageSubscriptions }  from './gageSubscription'
import user from './user'

export const rootReducer = combineReducers({
  baseLayers: baseLayers,
  featureLayers: featureLayers,
  map: map,
  floodStatus: floodStatus,
  subscribeDialog: subscribeDialog,
  browser: responsiveStateReducer,
  subscriptionChanges: combineReducers({
    subscriptionChangesById: subscriptionChangesById,
    allSubscriptionChanges: allSubscriptionChanges
  }),
  subscriptionForm,
  subscriptionList,
  subscriptions: combineReducers({
    subscriptionsById: subscriptionsById,
    allSubscriptions: allSubscriptions
  }),
  gageSubscriptions: combineReducers({
    gageSubscriptionById,
    allGageSubscriptions
  }),
  user
})
