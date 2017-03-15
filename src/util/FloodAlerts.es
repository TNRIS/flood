// functions for handling flood stage changes on gauges, subscriptions, and notifications
import axios from 'axios'
import R from 'ramda'
import objectAssign from 'object-assign'

import AWS from 'aws-sdk/dist/aws-sdk'
import keys from '../keys'
import * as actions from '../actions'

import {store} from '../store'


function subscribeAlerts(protocol, endpoint, topicArn, sns) {
  const params = {
    Protocol: protocol,
    TopicArn: topicArn,
    Endpoint: endpoint
  }

  return sns.subscribe(params).promise()
    .then(() => {
      const lid = topicArn.split(":")[5]
      //successfully subscribed. amazon automatically sends a confimation email to email subscriptions
      //but sms subscriptions get no confirmation from amazon so we send our own
      if (protocol === "sms") {
        const confirm = {
          PhoneNumber: endpoint,
          Message: `You have subscribed to the ${lid} flood gage via map.texasflood.org. Reply "STOP" at any time to` +
                   `stop receiving messages from this gage.`
        }
        sns.publish(confirm, (errPublish, dataPublish) => {
          if (errPublish) {
            console.log('Error sending a message', errPublish)
            alert(`You were successfully subscribed but your confirmation text message failed.`)
          }
          else {
            console.log('Sent message:', dataPublish.MessageId)
          }
        })
      }
    })
    .catch(err => console.log(err))
}

function createTopic(lid, phone, email, sns) {
  const params = {
    Name: lid
  }
  //create a topic fot the flood gauge using the lid as the name of the topic
  sns.createTopic(params, (err, data) => {
    if (err) {
      console.log(err, err.stack)
    }
    else {
      console.log(data)
      //use the lid to connect with the topic for this flood gauge
      const topicArn = keys.SNS_TOPIC_ARN_BASE + lid
      //topic created successfully! now lets subscribe to it
      if (email) {
        return subscribeAlerts('email', email, topicArn, sns)
      }
      if (phone) {
        return subscribeAlerts('sms', `+1${phone}`, topicArn, sns)
      }
    }
  })
}

//initial function called for subscribing to a flood gauge. called from the subscribe form.
export function subscribeGauge(lid, phone, email) {
  //create aws connection object
  const AWS = window.AWS
  AWS.config.update(keys.awsConfig)
  const sns = new AWS.SNS()
  //check which topics currently exist
  return sns.listTopics().promise()
    .then((data) => {
      const existingTopics =  R.pluck('TopicArn')(data.Topics)
      //use the lid to connect with the topic for this flood gauge
      const topicArn = keys.SNS_TOPIC_ARN_BASE + lid
      if (existingTopics.includes(topicArn)) {
        //if the gauge being subscribed to already has a topic, move forward with subscribing
        if (email) {
          subscribeAlerts('email', email, topicArn, sns)
        }
        if (phone) {
          subscribeAlerts('sms', `+1${phone}`, topicArn, sns)
        }
      }
      else {
        //if a topic doesn't already exist for this flood gauge, go create one
        createTopic(lid, phone, email, sns)
      }
    })
    .catch((err) => {
      console.log(err)
    })
}


//function only run once on the initial app build. populationed the subscribeDialog reducer
//with the current stage of all flood gauges
export function initialStatus() {
  const query = `SELECT lid, name, latitude, longitude FROM nws_ahps_gauges_texas`
  return axios.get(`https://tnris-flood.cartodb.com/api/v2/sql?q=${query}`)
    .then(({data}) => {
      const formatState = data.rows.map((gauge) => {
        const obj = {}
        obj[gauge.lid] = {"name": gauge.name, "latitude": gauge.latitude, "longitude": gauge.longitude}
        return obj
      })
      const initState = R.mergeAll(formatState)
      store.dispatch(actions.setGaugeInit(initState))
    })
}
