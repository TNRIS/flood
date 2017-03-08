// functions for handling flood stage changes on gauges, subscriptions, and notifications
import axios from 'axios'
import R from 'ramda'
import objectAssign from 'object-assign'

import AWS from 'aws-sdk/dist/aws-sdk'
import keys from '../keys'
import * as actions from '../actions'

import {store} from '../store'

function sendAlert (topicArn, stage, name, sns) {
    const params = {
    	TopicArn: topicArn,
    	Subject: 'Flood Gage Alert!',
    	Message: `The ${name} flood gage has entered a '${stage}' flood stage level`
    };
    //send out the alert. success and failure logs are in aws. probably should code in here
    //to send dev's an email if there is a publishing failure
   	sns.publish(params, function(err_publish, data) {
		if (err_publish) {
		    console.log('Error sending a message', err_publish);
		}
		else {
		  console.log('Sent message:', data.MessageId);
		}
	});
}

function compareStage(lid, stage, name, existingTopics, sns) {
	const theState = store.getState()
	if (theState.floodStatus[lid] != stage) {
		//if the elevated stage isn't the same as what is in subscribeDialog reducer, update the reducer
		//currently commented out for demo
		// store.dispatch(actions.updateSigStage(lid, stage))

		const topicArn = keys.SNS_TOPIC_ARN_BASE + lid
		if (existingTopics.includes(topicArn)) {
			//if we have a topic for this gauge then we have subscribers so lets send out the alert
			console.log(`send alert for ${lid}`)
			sendAlert(topicArn, stage, name, sns)
		}
	}
}

function checkTopic (gaugeData) {
	const AWS = window.AWS;
    AWS.config.update(keys.awsConfig);
    const sns = new AWS.SNS();
    //retrieve the currently existing topics
    sns.listTopics({}, function(err, data) {
		if (err) {
			console.log(err, err.stack); // an error occurred
		}
		else {
			const existingTopics =  R.pluck('TopicArn')(data.Topics);
			//for each gauge with an elevated stage, compare the current stage with what stage we have
			//on stored in the subscribeDialog reducer
			gaugeData.rows.map((gauge) => compareStage(gauge.lid, gauge.sigstage, gauge.title, existingTopics, sns));
        }
	});
}

//initial function called for checking stages of flood gauges and determining whether to send notifications 
//to subscribers. function called from CartoDBLayer at the specified interval for the flood gauge layer
export function checkStage(account) {
  const query = `SELECT lid, sigstage, title FROM nws_ahps_gauges_texas_demo WHERE sigstage IN ('flood', 'moderate', 'major')`;
  //currently hard coded for the demo
  // const query = `SELECT lid, sigstage, title FROM nws_ahps_gauges_texas WHERE sigstage IN ('flood', 'moderate', 'major')`;
  return axios.get(`https://${account}.cartodb.com/api/v2/sql?q=${query}`)
    .then(({data}) => {
    	if (R.isEmpty(data.rows.length)) {
    		return;
    	}
    	//if we have gauges at the query designated high stages, check to see if we have topics we need to notify
    	checkTopic(data);
    });
}

function subscribeAlerts (protocol, endpoint, topicArn, sns) {
    const params = {
      Protocol: protocol,
      TopicArn: topicArn,
      Endpoint: endpoint
    };
    console.log(params)
    //subscribe to the gauge
    sns.subscribe(params, function (err_subscribe, data) {
      if (err_subscribe) {
        console.log("error when subscribe", err_subscribe);
        alert(`There was an error with your ${protocol} submission, please try again.`);
        return;
      }
      else {
        console.log("subscribe data", data);
        const lid = topicArn.split(":")[5];
		//successfully subscribed. amazon automatically sends a confimation email to email subscriptions
        //but sms subscriptions get no confirmation from amazon so we send our own
        if (protocol == "sms") {
        	const confirm = {
	        	PhoneNumber: endpoint,
	        	Message: `You have subscribed to the ${lid} flood gage via map.texasflood.org. Reply "STOP" at any time to stop receiving messages from this gage.`
	        };
			sns.publish(confirm, function(err_publish, data) {
				if (err_publish) {
				    console.log('Error sending a message', err_publish);
				    alert(`You were successfully subscribed but your confirmation text message failed.`);
				}
				else {
					console.log('Sent message:', data.MessageId);
				}
			});
        }
      }
    });
}

function createTopic (lid, phone, email, sns) {
    const params = {
		Name: lid
	};
	//create a topic fot the flood gauge using the lid as the name of the topic
	sns.createTopic(params, function(err, data) {
	  	if (err) {
	  		console.log(err, err.stack); 
	  	}
	  	else {
	  		console.log(data);
			//use the lid to connect with the topic for this flood gauge
			const topicArn = keys.SNS_TOPIC_ARN_BASE + lid
			//topic created successfully! now lets subscribe to it
			if (email) {
		      subscribeAlerts('email', email, topicArn, sns);
		    }
		    if (phone) {
		      subscribeAlerts('sms', `+1${phone}`, topicArn, sns);
		    }
	  	}
	});
}

//initial function called for subscribing to a flood gauge. called from the subscribe form.
export function subscribeGauge(lid, phone, email) {
	//create aws connection object
	const AWS = window.AWS;
    AWS.config.update(keys.awsConfig);
    const sns = new AWS.SNS();
    //check which topics currently exist
    sns.listTopics({}, function(err, data) {
		if (err) {
			console.log(err, err.stack); // an error occurred
		}
		else {
			const existingTopics =  R.pluck('TopicArn')(data.Topics);
			//use the lid to connect with the topic for this flood gauge
			const topicArn = keys.SNS_TOPIC_ARN_BASE + lid
			if (existingTopics.includes(topicArn)) {
				//if the gauge being subscribed to already has a topic, move forward with subscribing
				if (email) {
			      subscribeAlerts('email', email, topicArn, sns);
			    }
			    if (phone) {
			      subscribeAlerts('sms', `+1${phone}`, topicArn, sns);
			    }
			}
			else {
				//if a topic doesn't already exist for this flood gauge, go create one
				createTopic(lid, phone, email, sns);
			}
        }
	});
}


//function only run once on the initial app build. populationed the subscribeDialog reducer
//with the current stage of all flood gauges
export function initialStatus() {
	const query = `SELECT lid, name, latitude, longitude FROM nws_ahps_gauges_texas`;
	return axios.get(`https://tnris-flood.cartodb.com/api/v2/sql?q=${query}`)
		.then(({data}) => {
			const formatState = data.rows.map((gauge) => {
				let obj = {}
				obj[gauge.lid] = {"name": gauge.name, "latitude": gauge.latitude, "longitude": gauge.longitude}
				return obj
			})
			const initState = R.mergeAll(formatState)
			store.dispatch(actions.setGaugeInit(initState))
		});
}
