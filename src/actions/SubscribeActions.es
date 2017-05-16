import { showSnackbar } from './ToasterActions'
import { sendErrorReport } from './StevieActions'

import FloodAppUser from '../util/User'


export function addSubscriptionToUserDataset(subscriptionData) {
  return (dispatch) => {
    FloodAppUser.subscribe(subscriptionData)
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
export function subscribeGage(lid, protocol, endpoint) {
  return (dispatch, getState) => {
    // window.AWS.config.update(keys.awsConfig)
    const sns = new FloodAppUser.AWS.SNS()

    const topicParams = {
      Name: lid
    }

    // Create the topic, function is impotent so will create or return the existing topic
    return sns.createTopic(topicParams).promise()
      .then((data) => {
        const subscriptionParams = {
          TopicArn: data.TopicArn,
          Protocol: protocol,
          Endpoint: protocol === 'sms' ? `+1${endpoint}` : endpoint
        }
        return sns.subscribe(subscriptionParams).promise().then(
          (data) => {
            console.log(data)
            if (subscriptionParams.Protocol === 'sms') {
              dispatch(showSnackbar(`You have subscribed to the ${lid} flood gage.`))
              dispatch(confirmSubscription(subscriptionParams.Endpoint, lid))
            }
            dispatch(addSubscriptionToUserDataset({lid, protocol, endpoint, subscriptionArn: data.SubscriptionArn}))
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
