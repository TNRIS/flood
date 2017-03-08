import {
  ADD_SUBSCRIBE_TO_CHANGE_LIST,
  ADD_UNSUBSCRIBE_TO_CHANGE_LIST,
  SAVE_SUBSCRIPTION_CHANGES_ATTEMPT,
  SAVE_SUBSCRIPTION_CHANGES_ERROR,
  SAVE_SUBSCRIPTION_CHANGES_SUCCESS,
  SET_CENTER_AND_ZOOM,
  UNQUEUE_CHANGE_FROM_CHANGE_LIST
} from '../constants/SubscriptionChangeActionTypes'

import { getUserSubscriptions } from './SubscriptionFormActions'

import { subscribeGauge } from '../util/FloodAlerts'


import AWS from 'aws-sdk/dist/aws-sdk'
import keys from '../keys'


export function addSubscribeToChangeList(lid, protocol) {
  return {
    type: ADD_SUBSCRIBE_TO_CHANGE_LIST,
    payload: {
      id: `${lid}_${protocol}_subscribe`,
      lid,
      protocol,
      subscriptionAction: "SUBSCRIBE"
    }
  }
}

export function addUnsubscribeToChangeList(lid, protocol, subscriptionId) {
  return {
    type: ADD_UNSUBSCRIBE_TO_CHANGE_LIST,
    payload: {
      id: `${lid}_${protocol}_unsubscribe`,
      lid,
      protocol,
      subscriptionId,
      subscriptionAction: "UNSUBSCRIBE"
    }
  }
}

export function unqueueChangeFromChangeList(lid, protocol, action) {
  return {
    type: UNQUEUE_CHANGE_FROM_CHANGE_LIST,
    payload: {
      id: `${lid}_${protocol}_${action}`
    }
  }
}

export function unsubscribeGage(subscriptionArn) {
  const WINDOW_AWS = window.AWS
  WINDOW_AWS.config.update(keys.awsConfig)
  const sns = new WINDOW_AWS.SNS()

  return sns.unsubscribe({SubscriptionArn: subscriptionArn}, (err, data) => {
    if (err) console.log(err, err.stack)
    else console.log(data)
  })
}

export function saveSubscriptionChanges() {
  return (dispatch, getState) => {
    setTimeout(() => {
      if (getState().subscriptionChanges.allSubscriptionChanges.length > 0) {
        const currentState = getState()
        const user = currentState.user
        const changes = {...currentState.subscriptionChanges.subscriptionChangesById}
        for (const change in changes) {
          if (changes.hasOwnProperty(change)) {
            const changeData = changes[change]
            if (changeData.subscriptionAction === 'UNSUBSCRIBE') {
              const subscription = currentState.subscriptions.subscriptionsById[changeData.subscriptionId].subscription
              const subscriptionArn = subscription.SubscriptionArn
              unsubscribeGage(subscriptionArn)
            }
            else if (changeData.subscriptionAction === 'SUBSCRIBE') {
              if (changeData.protocol === 'email') {
                subscribeGauge(changeData.lid, "", user.email)
              }
              else if (changeData.protocol === 'sms') {
                subscribeGauge(changeData.lid, user.phone, "")
              }
            }
          }
        }
        dispatch(getUserSubscriptions(user.email, user.phone, ""))
      }
    })
  }
}

export function setCenterAndZoom(lat, lng, zoom) {
  console.log("zooming")
  return {
    type: SET_CENTER_AND_ZOOM,
    lat,
    lng,
    zoom
  }
}
