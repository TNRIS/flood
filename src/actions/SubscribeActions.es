import AWS from 'aws-sdk/dist/aws-sdk'
import keys from '../keys'

import { showSnackbar } from './ToasterActions'
import { sendErrorReport } from './StevieActions'

/**
 * Function confirms to the user that they have subscribed to a gage via sms
 * @param  {[type]} lid [description]
 * @return {[type]}     [description]
 */
export function confirmSubscription(phoneNumber, lid) {
  return dispatch => {
    const AWS = window.AWS
    AWS.config.update(keys.awsConfig)
    const sns = new AWS.SNS()

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
  return dispatch => {
    //create aws connection object
    const AWS = window.AWS
    window.AWS.config.update(keys.awsConfig)
    const sns = new AWS.SNS()

    const topicParams = {
      // Name: lid
      Name: 'flood-demo-temp'
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
          () => {
            if (subscriptionParams.Protocol === 'sms') {
              dispatch(showSnackbar(`You have subscribed to the ${lid} flood gage.`))
              dispatch(confirmSubscription(subscriptionParams.Endpoint, lid))
            }
          })
          .catch(err => dispatch(sendErrorReport(err)))
      })
      .catch((err) => dispatch(sendErrorReport(err)))
  }
}

// Richard's Demo Fake-Flood Button
export function demoSendAlert() {
  const AWS = window.AWS
  window.AWS.config.update(keys.awsConfig)
  const sns = new AWS.SNS()

  const confirm = {
    TopicArn: keys.SNS_TOPIC_ARN_BASE + "flood-demo-temp",
    Message: 'West Fork San Jacinto River near Humble has entered a major flood stage level. ' +
            'Info: http://bit.ly/2pYQpP7 My Alerts: http://bit.ly/myAlerts'
  }
  sns.publish(confirm).promise().catch(err => dispatch(sendErrorReport(err)))
}
// END OF RICHARD DEMO CODE
