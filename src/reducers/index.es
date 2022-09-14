import { combineReducers } from 'redux'
import { createResponsiveStateReducer } from 'redux-responsive'

import baseLayers from './baseLayers'
import featureLayers from './featureLayers'
import gageInfo from './gageInfo'
import map from './map'
import LeafletMap from './LeafletMap'
import customLayer from './customLayer'
import subscriptionConfirmation from './subscriptionConfirmation'
import { subscriptionChangesById, allSubscriptionChanges, allProcessedSubscriptions } from './subscriptionChanges'
import subscriptionForm from './subscriptionForm'
import subscriptionList from './subscriptionList'
import { subscriptionsById, allSubscriptions } from './subscriptions'
import { gageSubscriptionById, allGageSubscriptions, displayGageSubscriptions }  from './gageSubscription'
import { toaster } from './toaster'
import user from './user'
import aboutDialog from './aboutDialog'
import popupData from './popupData'

import { createStore, compose } from 'redux';    

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const rootReducer = combineReducers({
  baseLayers: baseLayers,
  featureLayers: featureLayers,
  map: map,
  gageInfo,
  subscriptionConfirmation: subscriptionConfirmation,
  browser: createResponsiveStateReducer({
        extraSmall: 500,
        small: 700,
        medium: 900,
        large: 1025,
        extraLarge: 1400,
    }),
  subscriptionChanges: combineReducers({
    subscriptionChangesById,
    allSubscriptionChanges,
    allProcessedSubscriptions
  }),
  subscriptionForm,
  subscriptionList,
  subscriptions: combineReducers({
    subscriptionsById,
    allSubscriptions
  }),
  gageSubscriptions: combineReducers({
    gageSubscriptionById,
    allGageSubscriptions,
    displayGageSubscriptions
  }),
  customLayer,
  user,
  aboutDialog: aboutDialog,
  toaster,
  popupData
})

// Allows viewing state with redux devtools.
const store = createStore(
  rootReducer,
  composeEnhancers()
);