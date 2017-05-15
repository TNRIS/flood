//Save a copy of this file in the current location as "secrets.es"
// and enter key values
export default {
  bingApiKey: "<BING MAPS API KEY>",
  googleAnalyticsId: "<GOOGLE ANALYTICS ID",
  aerisApiId: "<AERIS API ID>",
  aerisApiSecret: "<AERIS API SECRET>",
  awsConfig: {
    accessKeyId: "<AWS ACCESS KEY ID>",
    secretAccessKey: "<AWS SECRET ACCESS KEY>",
    region: "<REGION>",
    UserPoolId: '<COGNITO USER POOL ID>',
    ClientId: '<COGNITO APP CLIENT ID>',
    identityPoolId: '<COGNITO IDENTITY POOL ID>',
    logins: {
      'cognito-idp.us-east-1.amazonaws.com/<COGNITO USER POOL ID>' : ""
    }
  },
  mapboxAccessToken: "<MAPBOX ACCESS TOKEN",
  //topic base includes entire aws arn until the specific topic name. keep last colon.
  //example: 'arn:aws:sns:us-east-1:999999999999:'
  SNS_TOPIC_ARN_BASE: "<AWS TOPIC ARN>"
}
