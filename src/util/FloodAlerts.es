
import axios from 'axios'
import R from 'ramda'
import objectAssign from 'object-assign'

import AWS from 'aws-sdk/dist/aws-sdk'
import keys from '../keys'
import * as actions from '../actions'

import {store} from '../store'

function sendAlert (topicArn, stage, name) {
	const AWS = window.AWS;
    AWS.config.update(keys.awsConfig);
    var sns = new AWS.SNS();
    
    const params = {
    	TopicArn: topicArn,
    	Subject: 'Flood Gauge Alert!',
    	Message: `The ${name} flood gauge has entered a '${stage}' flood stage level`, 
    };

   	sns.publish(params, function(err_publish, data) {
		if (err_publish) {
		    console.log('Error sending a message', err_publish);
		}
		else {
		  console.log('Sent message:', data.MessageId);
		}
	});
}

function compareStage(lid, stage, name, existingTopics) {
	const theState = store.getState()
	// if (theState.floodStatus[lid] != stage) {
	if (theState.floodStatus[lid] != 'jesus') {
		store.dispatch(actions.updateSigStage(lid, "jesus"))
		// store.dispatch(actions.updateSigStage(lid, stage))

		const topicArn = keys.SNS_TOPIC_ARN_BASE + 'flood-test'
		// use the lid to connect with the topic for this flood gauge
		// const topicArn = keys.SNS_TOPIC_ARN_BASE + lid
		if (existingTopics.includes(topicArn)) {
			console.log(`send alert for ${lid}`)
			// sendAlert(topicArn, stage, name)
		}
	}
}

function checkTopic (gaugeData) {
	const AWS = window.AWS;
    AWS.config.update(keys.awsConfig);
    var sns = new AWS.SNS();

    sns.listTopics({}, function(err, data) {
		if (err) {
			console.log(err, err.stack); // an error occurred
		}
		else {
			const existingTopics =  R.pluck('TopicArn')(data.Topics);
			gaugeData.rows.map((gauge) => compareStage(gauge.lid, gauge.sigstage, gauge.title, existingTopics));
		}
	});
}

export function checkStage(account) {
  const query = `SELECT lid, sigstage, title FROM nws_ahps_gauges_texas_demo WHERE sigstage IN ('flood', 'moderate', 'major')`;
  return axios.get(`https://${account}.cartodb.com/api/v2/sql?q=${query}`)
    .then(({data}) => {
    	if (R.isEmpty(data.rows.length)) {
    		return;
    	}
    	checkTopic(data);
    });
}

export function initialStatus () {
	const query = `SELECT lid, sigstage FROM nws_ahps_gauges_texas_demo`;
	return axios.get(`https://tnris-flood.cartodb.com/api/v2/sql?q=${query}`)
		.then(({data}) => {
			const formatState = data.rows.map((gauge) => {
				let obj = {}
				obj[gauge.lid] = gauge.sigstage
				return obj
			})
			const initState = R.mergeAll(formatState)
			store.dispatch(actions.setSigStage(initState))
		});
}
