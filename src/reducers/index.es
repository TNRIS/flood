import { combineReducers } from 'redux'
import { createResponsiveStateReducer } from 'redux-responsive'

import baseLayers from './baseLayers'
import featureLayers from './featureLayers'
import gageInfo from './gageInfo'
import map from './map'
import subscriptionConfirmation from './subscriptionConfirmation'
import { subscriptionChangesById, allSubscriptionChanges, allProcessedSubscriptions } from './subscriptionChanges'
import subscriptionForm from './subscriptionForm'
import subscriptionList from './subscriptionList'
import { subscriptionsById, allSubscriptions } from './subscriptions'
import { gageSubscriptionById, allGageSubscriptions }  from './gageSubscription'
import { toaster } from './toaster'
import user from './user'
import aboutDialog from './aboutDialog'
import popupData from './popupData'

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
    allGageSubscriptions
  }),
  user,
  aboutDialog: aboutDialog,
  toaster,
  popupData
})
