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
 * @param  {string} phoneNumber user phone number endpoint
 * @param  {string} lid gage lid
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
 * Function subscribes user to both current and predictive alert topics
 * @param  {object} dispatch store dispatcher
 * @param  {string} lid gage lid
 * @param  {boolean} newFlag new subscription alert flag
 * @return {promise}         AWS SDK promise
 */
function subscribeCurrentAndPredictive(dispatch, lid, newFlag) {
  const sns = new FloodAppUser.AWS.SNS()
  const p = lid + "--PD"

  // Create the topic, function is impotent so will create or return the existing topic
  // Subscribe to the current alert topic
  return sns.createTopic({Name: lid}).promise()
    .then((topic) => {
      let contact_method;
      if(FloodAppUser.userData.phone_number && FloodAppUser.userData.phone_number.length) {
        contact_method = 'phone_number'
      } else if(FloodAppUser.userData.email && FloodAppUser.userData.email.length) {
        contact_method = 'email'
      }

      let subscriptionParams;
      if(contact_method == 'phone_number') {
        subscriptionParams = {
          TopicArn: topic.TopicArn,
          Protocol: "sms",
          Endpoint: FloodAppUser.userData.phone_number
        }
      } else if(contact_method == 'email') {
        subscriptionParams = {
          TopicArn: topic.TopicArn,
          Protocol: "email",
          Endpoint: FloodAppUser.userData.email
        }
      }
      if(!contact_method) {
        dispatch(sendErrorReport("No contact method found for user."));
      }
      return sns.subscribe(subscriptionParams).promise().then(
        (subscription) => {
          FloodAppUser.subscribe({lid, subscriptionArn: subscription.SubscriptionArn})
          // Subscribe to the predictive alert topic
          return sns.createTopic({Name: p}).promise()
            .then((pTopic) => {
              let pSubscriptionParams;

              if(contact_method == 'phone_number') {
                pSubscriptionParams = {
                  TopicArn: pTopic.TopicArn,
                  Protocol: "sms",
                  Endpoint: FloodAppUser.userData.phone_number
                }
              }
              else if(contact_method == 'email') {
                pSubscriptionParams = {
                  TopicArn: pTopic.TopicArn,
                  Protocol: "email",
                  Endpoint: FloodAppUser.userData.email
                }
              }
              return sns.subscribe(pSubscriptionParams).promise().then(
                (pSubscription) => {
                  if (newFlag === true) {
                    dispatch(showSnackbar(`You have subscribed to the ${lid} flood gage.`))
                    dispatch(confirmSubscription(pSubscriptionParams.Endpoint, lid))
                  }
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

/**
 * Function subscribes user to either current or predictive alert topics
 * @param  {object} dispatch store dispatcher
 * @param  {string} lid gage lid
 * @param  {string} type 'c' or 'p' alert type identifier
 * @param  {boolean} newFlag new subscription alert flag
 * @return {promise}         AWS SDK promise
 */
function subscribeEitherOr(dispatch, lid, type, newFlag) {
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
          if (newFlag === true) {
            dispatch(showSnackbar(`You have subscribed to the ${lid} flood gage.`))
            dispatch(confirmSubscription(subscriptionParams.Endpoint, lid))
          }
          FloodAppUser.subscribe({lid: topicLid, subscriptionArn: subscription.SubscriptionArn}).then(FloodAppUser.syncDataset())
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
 * @param  {boolean} newFlag new subscription alert flag
 * @return {promise}         AWS SDK promise
 */
export function subscribeGage(lid, newFlag) {
  return (dispatch) => {

    const curr = FloodAppUser.userData['custom:currentAlerts']
    const pred = FloodAppUser.userData['custom:predictiveAlerts']
    if (curr == 'T' && pred == 'T') {
      return subscribeCurrentAndPredictive(dispatch, lid, newFlag)
    }
    else if (curr == 'T' && pred == 'F') {
      return subscribeEitherOr(dispatch, lid, 'c', newFlag)
    }
    else if (curr == 'F' && pred == 'T') {
      return subscribeEitherOr(dispatch, lid, 'p', newFlag)
    }
    else if (curr == 'F' && pred == 'F') {
      dispatch(showSnackbar(`You have no alert types enabled in your Settings. You must have at least one alert type enabled to subscribe to gages.`))
    }
  }
}
