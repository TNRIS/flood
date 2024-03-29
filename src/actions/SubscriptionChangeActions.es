import {
  ADD_SUBSCRIBE_TO_CHANGE_LIST,
  ADD_UNSUBSCRIBE_TO_CHANGE_LIST,
  CLEAR_CENTER_AND_ZOOM,
  SET_CENTER_AND_ZOOM,
  SUBSCRIPTION_UPDATED,
  UNQUEUE_CHANGE_FROM_CHANGE_LIST
} from '../constants/SubscriptionChangeActionTypes'

import {
  getUserSubscriptions
 } from './SubscriptionFormActions'

import {
  updateSubscriptionsAttempt,
  updateSubscriptionsSuccess,
  updateSubscriptionsError,
  clearSubscriptionList
} from './SubscriptionListActions'

import {
  showSnackbar
} from './ToasterActions'

import {
  subscribeGage
} from './SubscribeActions'

import {
  sendErrorReport
} from './StevieActions'

import FloodAppUser from '../util/User'

/**
 * SUBSCRIBE action on the queue of subscription changes
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
 * UNSUBSCRIBE action on the queue of subscription changes
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

/**
 * Action for a single subscription update
 * @param  {string} subscriptionChangeId id of record in the subscription changes portion of the store
 * @param  {string} changeRequestId      request id returned from Amazon
 * @return {obj}                      action
 */
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
    setTimeout(() => {
      const allSubscriptionChangesCount = getState().subscriptionChanges.allSubscriptionChanges.length

      if (allSubscriptionChangesCount > 0) {
        // Dispatch action to tell the component that work is being done
        dispatch(updateSubscriptionsAttempt())

        // Set initial variables for iteration
        const currentState = getState()
        const user = currentState.user
        const changes = {...currentState.subscriptionChanges.subscriptionChangesById}

        const sns = new FloodAppUser.AWS.SNS()

        const promiseQueue = []

        // Start iteration on change queue
        // for (const change of changes) {
        Object.keys(changes).forEach((change) => {
          if (changes.hasOwnProperty(change)) {
            const changeData = changes[change]

            // Process unsubscribe requests
            if (changeData.subscriptionAction === 'UNSUBSCRIBE') {
              const subscription = currentState.subscriptions.subscriptionsById[changeData.subscriptionId].subscription
              let subscriptionArn = subscription.subscriptionArn
              let subscriptionLid = subscription.lid

              // Emails subscriptions don't have a subscription ARN at this point in the object.
              if(subscriptionArn == 'pending confirmation') {
                if(subscription.lid && subscription.lid.length) {
                  let topic = sns.createTopic({Name: subscription.lid}).promise().then((data) => {
                    let subsbytopic = sns.listSubscriptionsByTopic({TopicArn: data.TopicArn}).promise().then((sbt) => {
                      sbt.Subscriptions.forEach(element => {
                        if(element.Endpoint == subscription.endpoint) {
                          subscriptionArn = element.SubscriptionArn
                        }
                      })
                      promiseQueue.push(sns.unsubscribe({SubscriptionArn: subscriptionArn}).promise()
                        .then((data) => {
                          dispatch(subscriptionUpdated(changeData.id, data.ResponseMetadata.RequestId))
                        })
                        .catch((err) => {
                          dispatch(updateSubscriptionsError(err))
                        })
                      )
                    });
                  })
                }
                // Run this immediately
                promiseQueue.push(FloodAppUser.unsubscribe(subscriptionLid))
              } else {
                promiseQueue.push(sns.unsubscribe({SubscriptionArn: subscriptionArn}).promise()
                  .then((data) => {
                    dispatch(subscriptionUpdated(changeData.id, data.ResponseMetadata.RequestId))
                  })
                  .catch((err) => {
                    dispatch(updateSubscriptionsError(err))
                  })
                )
                promiseQueue.push(FloodAppUser.unsubscribe(subscriptionLid))
              }
            }

            // Process subscribe requests
            else if (changeData.subscriptionAction === 'SUBSCRIBE') {
              if (changeData.protocol === 'sms' || changeData.protocol === 'email') {
                promiseQueue.push(dispatch(subscribeGage(changeData.lid, false)))
              }
            }
          }
        })

        // Add the sync operation to the promise queue
        promiseQueue.push(FloodAppUser.syncDataset())

        // Execute promise queue containing the subscription update operations.
        Promise.all(promiseQueue).then(() => {
          dispatch(updateSubscriptionsSuccess())
          dispatch(clearSubscriptionList())
          dispatch(getUserSubscriptions())
        }).catch(err => dispatch(sendErrorReport(err)))
      }

      // Finished processing the queue. Send an action to update the Subscription List component that we're done
      else {
        dispatch(showSnackbar("No subscription changes found."));
      }
    })
  }
}
