import { showSnackbar } from './ToasterActions'

import AWS from 'aws-sdk/dist/aws-sdk'
import keys from '../keys'

/**
 * Uses the AWS SNS notification system to notify dev team of errors within the app
 * @param  {object} error error object
 * @return {promise}      AWS SDK promise
 */
export function sendErrorReport(error) {
  return (dispatch) => {
    const AWS = window.AWS
    AWS.config.update(keys.awsConfig)
    const sns = new AWS.SNS()

    const errorMessage = {
      TopicArn: 'arn:aws:sns:us-east-1:746466009731:Stevie',
      Subject: 'Stevie found an ERROR!! - An error has occurred in the Texas Flood App',
      Message: error.name + '\n' + error.stack
    }
    console.log(errorMessage.Message)
    // return sns.publish(errorMessage).promise().then(
    //   () => dispatch(showSnackbar('An error has been reported to the TNRIS development team.'))
    // )
  }
}
