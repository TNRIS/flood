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

import AWS from 'aws-sdk/dist/aws-sdk' 
import keys from '../keys'

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

/**
 * Function to subscribe a gage
 * @param  {string} lid      gage lid
 * @param  {string} protocol subscription protocol
 * @param  {string} endpoint subscription endpoint
 * @return {promise}         AWS SDK promise
 */
export function subscribeGage(lid) {
  return (dispatch) => {
    const sns = new FloodAppUser.AWS.SNS()

    const topicParams = {
      // Name: lid
      Name: 'flood-demo-temp'
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
            FloodAppUser.subscribe({lid, subscriptionArn: subscription.SubscriptionArn})
          })
          .catch((err) => {
            console.log(err)
            // dispatch(sendErrorReport(err))
          })
      })
      .catch((err) => {
        console.log(err)
        // dispatch(sendErrorReport(err))
      })
  }
}

// Richard's Demo Fake-Flood Button
export function demoSendAlert() {
  const sns = new FloodAppUser.AWS.SNS()

  const confirm = {
    TopicArn: keys.SNS_TOPIC_ARN_BASE + "flood-demo-temp",
    Message: 'West Fork San Jacinto River near Humble has entered a major flood stage level. ' +
            'Info: http://bit.ly/2pYQpP7 My Alerts: http://bit.ly/myAlerts'
  }
  sns.publish(confirm).promise().catch(err => dispatch(sendErrorReport(err)))
}
// END OF RICHARD DEMO CODE
