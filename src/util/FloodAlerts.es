// functions for handling flood stage changes on gauges, subscriptions, and notifications
import AWS from 'aws-sdk/dist/aws-sdk'
import keys from '../keys'


//initial function called for subscribing to a flood gauge. called from the subscribe form.
export function subscribeGauge(lid, protocol, endpoint) {
  //create aws connection object
  const AWS = window.AWS
  AWS.config.update(keys.awsConfig)
  const sns = new AWS.SNS()

  const topicParams = {
    Name: lid
  }

  // Create the topic, function is impotent so will create or return the existing topic
  sns.createTopic(topicParams).promise()
    .then((data) => {
      const subscriptionParams = {
        TopicArn: data.TopicArn,
        Protocol: protocol,
        Endpoint: protocol === 'sms' ? `+1${endpoint}` : endpoint
      }
      console.log(subscriptionParams)
      sns.subscribe(subscriptionParams).promise().then(
        () => {
          if (subscriptionParams.protocol === 'sms') {
            const confirm = {
              PhoneNumber: subscriptionParams.Endpoint,
              Message: (`You have subscribed to the ${lid} flood gage.`
                ` Visit map.texasflood.org to manage your flood gage subscriptions.`)
            }
            sns.publish(confirm).promise().catch(err => console.log(err))
          }
        })
    })
    .catch((err) => {
      console.log(err)
    })
}
