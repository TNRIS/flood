import {
  ADD_SUBSCRIBE_TO_CHANGE_LIST,
  ADD_UNSUBSCRIBE_TO_CHANGE_LIST,
  CLEAR_CENTER_AND_ZOOM,
  SET_CENTER_AND_ZOOM,
  UNQUEUE_CHANGE_FROM_CHANGE_LIST,
  SUBSCRIPTION_UPDATED
} from '../constants/SubscriptionChangeActionTypes'

import {
  getUserSubscriptions
 } from './SubscriptionFormActions'

import {
  updateSubscriptionsAttempt,
  updateSubscriptionsError,
  updateSubscriptionsSuccess
} from './SubscriptionListActions'

import {
  subscribeGauge
} from '../util/FloodAlerts'

import AWS from 'aws-sdk/dist/aws-sdk'
import keys from '../keys'

/**
 * Emits a SUBSCRIBE action on the queue of subscription changes
 * @param  {string} lid      lid of gage user is subscribing to
 * @param  {string} protocol the subscription protocol (email or sms)
 * @return {obj}              the action created
 */
export function addSubscribeToChangeList(lid, protocol) {
  return {
    type: ADD_SUBSCRIBE_TO_CHANGE_LIST,
    payload: {
      id: `${lid}_${protocol}_subscribe`,
      lid,
      protocol,
      subscriptionId: null,
      subscriptionAction: "SUBSCRIBE",
      changeRequestId: null
    }
  }
}

/**
 * Emits a UNSUBSCRIBE action on the queue of subscription changes
 * @param  {string} lid            lid of gage user is unsubscribing to
 * @param  {string} protocol       the subscription protocol (email or sms)
 * @param  {Number}    subscriptionId the id of the subscription held in the store
 * @return {obj}              the action created
 */
export function addUnsubscribeToChangeList(lid, protocol, subscriptionId) {
  return {
    type: ADD_UNSUBSCRIBE_TO_CHANGE_LIST,
    payload: {
      id: `${lid}_${protocol}_unsubscribe`,
      lid,
      protocol,
      subscriptionId,
      subscriptionAction: "UNSUBSCRIBE",
      changeRequestId: null
    }
  }
}

export function subscriptionUpdated(subscriptionChangeId, changeRequestId) {
  return {
    type: SUBSCRIPTION_UPDATED,
    payload: {
      id: subscriptionChangeId,
      changeRequestId: changeRequestId
    }
  }
}

/**
 * Emits an action to remove a subscription change from the queue
 * @param  {string} lid       lid of gage user is unsubscribing to
 * @param  {string} protocol  the subscription protocol (email or sms)
 * @param  {string} action    the action to be taken (subscribe or unsibscribe)
 * @return {obj}              the action created
 */
export function unqueueChangeFromChangeList(lid, protocol, action) {
  return {
    type: UNQUEUE_CHANGE_FROM_CHANGE_LIST,
    payload: {
      id: `${lid}_${protocol}_${action}`
    }
  }
}

/**
 * Iterates through the queue of subscription changes and sends a subscribe or unsubscribe request to Amazon
 * based on the action of the change in the queue.
 * @return {func} function to process the change queue
 */
export function saveSubscriptionChanges() {
  return (dispatch, getState) => {
    /**
     * Send unsubscribe request to Amazon and return errors or return the RequestId
     * @param  {number} subscriptionChangeId id of the subscription change to be made
     * @param  {string} subscriptionArn      SubscriptionArn for the subscription to be unsubscribed from
     */
    function unsubscribeGage(subscriptionChangeId, subscriptionArn) {
      // Set the variables required for the SDK request
      const WINDOW_AWS = window.AWS
      WINDOW_AWS.config.update(keys.awsConfig)
      const sns = new WINDOW_AWS.SNS()

      // Send the unsubscribe request
      sns.unsubscribe({SubscriptionArn: subscriptionArn}, (err, data) => {
        if (err) dispatch(subscriptionUpdated(subscriptionChangeId, err))
        else dispatch(subscriptionUpdated(subscriptionChangeId, data.ResponseMetadata.RequestId))
      })
    }

    setTimeout(() => {
      const allSubscriptionChangesCount = getState().subscriptionChanges.allSubscriptionChanges.length

      if (allSubscriptionChangesCount > 0) {
        // Dispatch action to tell the component that work is being done
        dispatch(updateSubscriptionsAttempt())

        // Set initial variables for iteration
        const currentState = getState()
        const user = currentState.user
        const changes = {...currentState.subscriptionChanges.subscriptionChangesById}

        // Start iteration on change queue
        for (const change in changes) {
          if (changes.hasOwnProperty(change)) {
            const changeData = changes[change]

            // Process unsubscribe requests
            if (changeData.subscriptionAction === 'UNSUBSCRIBE') {
              const subscription = currentState.subscriptions.subscriptionsById[changeData.subscriptionId].subscription
              const subscriptionArn = subscription.SubscriptionArn
              unsubscribeGage(changeData.id, subscriptionArn)
            }

            // Process subscribe requests
            else if (changeData.subscriptionAction === 'SUBSCRIBE') {
              if (changeData.protocol === 'email') {
                subscribeGauge(changeData.lid, "", user.email)
              }
              else if (changeData.protocol === 'sms') {
                subscribeGauge(changeData.lid, user.phone, "")
              }
            }
          }

          // Check to see if all of the subscription changes have been processed
          if (getState().subscriptionChanges.processedSubscriptionChanges.length === allSubscriptionChangesCount) {
            dispatch(updateSubscriptionsSuccess())
            dispatch(getUserSubscriptions(user.email, user.phone, ""))
          }
        }
      }
      // Finished processing the queue. Send an action to update the Subscription List component that we're done
      else {
        // Here we need a toast notification that no changes were found
        console.log("No subscriptions were found for this user...")
        //dispatch(updateSubscriptionsSuccess())
      }
    })
  }
}

/**
 * Emit action to change the center and zoom in the map
 * @param  {number} lat  latitude of new center point
 * @param  {number} lng  longitude of new center point
 * @param  {number} zoom map zoom level
 * @return {object} action
 */
export function setCenterAndZoom(lat, lng, zoom) {
  return {
    type: SET_CENTER_AND_ZOOM,
    lat,
    lng,
    zoom
  }
}

/**
 * Emit action to reset the map's state to a null center and zoom
 * @return {object} action
 */
export function clearCenterAndZoom() {
  return {
    type: CLEAR_CENTER_AND_ZOOM
  }
}
