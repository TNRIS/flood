import { showSnackbar } from './ToasterActions'
import { sendErrorReport } from './StevieActions'

import {
  getUserSubscriptions
} from './SubscriptionFormActions'

import FloodAppUser from '../util/User'
import {
  SHOW_SUBSCRIPTION_CONFIRMATION,
  HIDE_SUBSCRIPTION_CONFIRMATION
} from '../constants/SubscribeActionTypes'

/**
 * Function to show the subscription confirmation modal
 * @return {boolean}  description
 */
export function showSubscriptionConfirmation() {
  return (dispatch) => {
    dispatch({
      type: SHOW_SUBSCRIPTION_CONFIRMATION
    })
  }
}

/**
 * Function to hide the subscription confirmation modal
 * @return {boolean}  description
 */
export function hideSubscriptionConfirmation() {
  return (dispatch) => {
    dispatch({
      type: HIDE_SUBSCRIPTION_CONFIRMATION
    })
  }
}

/**
 * Function confirms to the user that they have subscribed to a gage via sms
 * @param  {[type]} lid [description]
 * @return {[type]}     [description]
 */
export function confirmSubscription(phoneNumber, lid) {
  return dispatch => {
    const sns = new FloodAppUser.AWS.SNS()

    const confirm = {
      PhoneNumber: phoneNumber,
      Message: `You have subscribed to the ${lid} flood gage.` +
        ` Visit ` + SITE_URL + `/#/subscriptions to manage your flood gage subscriptions.`
    }
    sns.publish(confirm).promise().catch(err => dispatch(sendErrorReport(err)))
  }
}

function subscribeCurrentAndPredictive(dispatch, lid) {
  const sns = new FloodAppUser.AWS.SNS()
  const p = lid + "--PD"

  // Create the topic, function is impotent so will create or return the existing topic
  // Subscribe to the current alert topic
  return sns.createTopic({Name: lid}).promise()
    .then((topic) => {
      const subscriptionParams = {
        TopicArn: topic.TopicArn,
        Protocol: "sms",
        Endpoint: FloodAppUser.userData.phone_number
      }
      return sns.subscribe(subscriptionParams).promise().then(
        (subscription) => {
          FloodAppUser.subscribe({lid, subscriptionArn: subscription.SubscriptionArn})
          // Subscribe to the predictive alert topic
          return sns.createTopic({Name: p}).promise()
            .then((pTopic) => {
              const pSubscriptionParams = {
                TopicArn: pTopic.TopicArn,
                Protocol: "sms",
                Endpoint: FloodAppUser.userData.phone_number
              }
              return sns.subscribe(pSubscriptionParams).promise().then(
                (pSubscription) => {
                  console.log(pSubscription)
                  console.log(lid)
                  dispatch(showSnackbar(`You have subscribed to the ${lid} flood gage.`))
                  dispatch(confirmSubscription(pSubscriptionParams.Endpoint, lid))
                  FloodAppUser.subscribe({lid: p, subscriptionArn: pSubscription.SubscriptionArn}).then(FloodAppUser.syncDataset())
                })
                .catch((err) => {
                  dispatch(sendErrorReport(err))
                })
            })
            .catch((err) => {
              dispatch(sendErrorReport(err))
            })
        })
        .catch((err) => {
          dispatch(sendErrorReport(err))
        })
    })
    .catch((err) => {
      console.log(err)
      dispatch(sendErrorReport(err))
    })
}

function subscribeEitherOr(dispatch, lid, type) {
  const sns = new FloodAppUser.AWS.SNS()
  const p = lid + "--PD"
  const topicLid = type == 'c' ? lid : p

  const topicParams = {
    Name: topicLid
  }

  // Create the topic, function is impotent so will create or return the existing topic
  return sns.createTopic(topicParams).promise()
    .then((topic) => {
      const subscriptionParams = {
        TopicArn: topic.TopicArn,
        Protocol: "sms",
        Endpoint: FloodAppUser.userData.phone_number
      }
      return sns.subscribe(subscriptionParams).promise().then(
        (subscription) => {
          dispatch(showSnackbar(`You have subscribed to the ${lid} flood gage.`))
          dispatch(confirmSubscription(subscriptionParams.Endpoint, lid))
          FloodAppUser.subscribe({lid, subscriptionArn: subscription.SubscriptionArn}).then(FloodAppUser.syncDataset())
        })
        .catch((err) => {
          dispatch(sendErrorReport(err))
        })
    })
    .catch((err) => {
      dispatch(sendErrorReport(err))
    })
}

/**
 * Function to subscribe a gage
 * @param  {string} lid      gage lid
 * @param  {string} protocol subscription protocol
 * @param  {string} endpoint subscription endpoint
 * @return {promise}         AWS SDK promise
 */
export function subscribeGage(lid) {
  return (dispatch) => {

    const curr = FloodAppUser.userData['custom:currentAlerts']
    const pred = FloodAppUser.userData['custom:predictiveAlerts']
    if (curr == 'T' && pred == 'T') {
      return subscribeCurrentAndPredictive(dispatch, lid)
    }
    else if (curr == 'T' && pred == 'F') {
      return subscribeEitherOr(dispatch, lid, 'c')
    }
    else if (curr == 'F' && pred == 'T') {
      return subscribeEitherOr(dispatch, lid, 'p')
    }
  }
}
