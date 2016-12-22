
import axios from 'axios'
import R from 'ramda'
import AWS from 'aws-sdk/dist/aws-sdk'
import keys from '../keys'

function sendAlerts (lid, stage) {
	console.log(lid, stage);

	const AWS = window.AWS;
    AWS.config.update(keys.awsConfig);

    var sns = new AWS.SNS();

    const params = {
    	
    };

    sns.publish(params, function(err_publish, data) {
		if (err_publish) {
		    console.log('Error sending a message', err_publish);
		}
		else {
		  console.log('Sent message:', data.MessageId);
		  console.log(data);
		}
	});
}

function checkStage(account) {
  const query = `SELECT lid, sigstage FROM nws_ahps_gauges_texas_demo WHERE sigstage IN ('flood', 'moderate', 'major')`;
  return axios.get(`https://${account}.cartodb.com/api/v2/sql?q=${query}`)
    .then(({data}) => {
    	console.log(data);
    	if (R.isEmpty(data.rows.length)) {
    		return;
    	}
    	data.rows.map((gauge) => sendAlerts(gauge.lid, gauge.sigstage));
    });
}

export default {
  checkStage
};
