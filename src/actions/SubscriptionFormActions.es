import {
  CLEAR_SUBSCRIPTIONS,
  GET_SUBSCRIPTIONS_ATTEMPT,
  GET_SUBSCRIPTIONS_ERROR,
  GET_SUBSCRIPTIONS_SUCCESS
} from '../constants/SubscriptionFormActionTypes'

import {
  addSubscriptionToSubscriptionList,
  clearSubscriptionList
} from './SubscriptionListActions'

import {
  showSnackbar
} from './ToasterActions'

import axios from 'axios'
import AWS from 'aws-sdk'
import keys from '../keys'
import { AuthenticationDetails, CognitoUserPool, CognitoUserAttribute, CognitoUser } from 'amazon-cognito-identity-js' 
import { CognitoSyncManager } from 'amazon-cognito-js'

/**
 * Action that clears all subscription data from the app store
 * @return {object} action
 */
export function clearSubscriptions() {
  return {
    type: CLEAR_SUBSCRIPTIONS
  }
}

/**
 * Action that indicates the beginning of an attempt to get subscriptions from Amazon
 * @return {object} action
 */
export function getSubscriptionsAttempt() {
  return {
    type: GET_SUBSCRIPTIONS_ATTEMPT,
  }
}

/**
 * Action that for an error in the get subscriptions API call
 * @param  {object} error error returned from Amazon
 * @return {object}       action
 */
export function getSubscriptionsError(error) {
  return {
    type: GET_SUBSCRIPTIONS_ERROR,
    error
  }
}

/**
 * Action for success in gathering subscriptions
 * @return {object} action
 */
export function getSubscriptionsSuccess() {
  return {
    type: GET_SUBSCRIPTIONS_SUCCESS
  }
}

/**
 * Function to get all subscriptions from Amazon and filter for subscriptions
 * that match the user's email and phone number
 * @param  {string} email     user's email
 * @param  {string} phone     user's phone number
 * @param  {string} nextToken token for the next API call if there are still more records to retrieve
 */
export function getUserSubscriptions(email, phone, nextToken) {
  var authenticationData = { 
        Username : '4102418409', 
        Password : "TestTest123!", 
    }; 
    var authenticationDetails = new AWS.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData); 
    var poolData = { 
        UserPoolId : keys.awsConfig.userPoolId, // Your user pool id here 
        ClientId : keys.awsConfig.clientId // Your client id here 
    }; 
    var userPool = new AWS.CognitoIdentityServiceProvider.CognitoUserPool(poolData); 
    var userData = { 
        Username : '4102418409', 
        Pool : userPool 
    }; 
    var cognitoUser = new AWS.CognitoIdentityServiceProvider.CognitoUser(userData); 
     
    cognitoUser.authenticateUser(authenticationDetails, { 
        onSuccess: function (result) { 
            // console.log('access token + ' + result.getAccessToken().getJwtToken()); 
            const token = result.getAccessToken().getJwtToken() 
            
            const logins = keys.awsConfig.logins 
            const loginKey = Object.keys(logins)[0] 
            console.log(loginKey) 
            logins[loginKey] = result.getIdToken().getJwtToken() 
            AWS.config.region = 'us-east-1' 
            AWS.config.credentials = new AWS.CognitoIdentityCredentials({ 
                IdentityPoolId : keys.awsConfig.identityPoolId, // your identity pool id here 
                Logins : logins 
            }); 
            var idToken = result.getIdToken().getJwtToken() 
            AWS.config.credentials.get(function() {
                    var cognitosync = new AWS.CognitoSync();
                    var params = {
                      DatasetName: 'texasflood', /* required */
                      IdentityId: AWS.config.credentials.identityId, /* required */
                      IdentityPoolId: keys.awsConfig.identityPoolId
                    };
                    cognitosync.listRecords(params, function(err, data) {
                      if (err) {console.log(err, err.stack)} // an error occurred
                      else    { console.log(data)
                        var params = {
                            DatasetName: 'texasflood', /* required */
                            IdentityId: AWS.config.credentials.identityId, /* required */
                            IdentityPoolId: keys.awsConfig.identityPoolId,
                            SyncSessionToken: data.SyncSessionToken,
                            RecordPatches: [
                              {
                                Key: 'third', /* required */
                                Op: "replace", /* required */
                                SyncCount: 0, /* required */
                                Value: 'testerz'
                              }
                            ]
                          }
                          console.log(params)
                          cognitosync.updateRecords(params, function(err, data) {
                            if (err) console.log(err, err.stack); // an error occurred
                            else     console.log(data);           // successful response
                          });         // successful response
                        }
                    });
                    
 
                    // const client = new AWS.CognitoSyncManager()
                    // client.openOrCreateDataset('texasflood', function(err, dataset) {
                    //           console.log(dataset)
                    //            // <!-- Read Records -->
                    //           // dataset.get('newLid', function(err, value) {
                    //           //   console.log('myRecord: ' + value);
                    //           // });

                    //           // <!-- Write Records -->
                    //           const object = {email: "something@somewhere.com", phone: "7894522837"}
                    //           dataset.put('atbt2.email', object, function(err, record) {
                    //             console.log(err);
                    //           });
                    //           // dataset.put('atbt2.phone', 'arn:blach:topic:unique_id2', function(err, record) {
                    //           //   console.log(record);
                    //           // });
                    //           // dataset.put('hmmt3.phone', 'arn:blach:topic:unique_id3', function(err, record) {
                    //           //   console.log(record);
                    //           // });

                    //           // <!-- Delete Records -->
                    //           // dataset.remove('oldKey', function(err, record) {
                    //           //   if (!err) { console.log('success'); }
                    //           // });

                    //           dataset.synchronize({

                    //             onSuccess: function(dataset, newRecords) {
                    //                console.log(dataset)
                    //             },

                    //             onFailure: function(err) {
                    //                console.log(err)
                    //             },

                    //             onConflict: function(dataset, conflicts, callback) {

                    //                var resolved = [];

                    //                for (var i=0; i<conflicts.length; i++) {

                    //                   // Take remote version.
                    //                   resolved.push(conflicts[i].resolveWithRemoteRecord());

                    //                   // Or... take local version.
                    //                   // resolved.push(conflicts[i].resolveWithLocalRecord());

                    //                   // Or... use custom logic.
                    //                   // var newValue = conflicts[i].getRemoteRecord().getValue() + conflicts[i].getLocalRecord().getValue();
                    //                   // resolved.push(conflicts[i].resolveWithValue(newValue);

                    //                }

                    //                dataset.resolve(resolved, function() {
                    //                   return callback(true);
                    //                });

                    //                // Or... callback false to stop the synchronization process.
                    //                // return callback(false);

                    //             },

                    //             onDatasetDeleted: function(dataset, datasetName, callback) {

                    //                // Return true to delete the local copy of the dataset.
                    //                // Return false to handle deleted datasets outsid ethe synchronization callback.

                    //                return callback(true);

                    //             },

                    //             onDatasetsMerged: function(dataset, datasetNames, callback) {

                    //                // Return true to continue the synchronization process.
                    //                // Return false to handle dataset merges outside the synchroniziation callback.

                    //                return callback(false);

                    //             }

                    //           });
                    // })
            });
            
 
 
            // AWS.config.credentials.refresh(function () { 
              // const sns = new AWS.SNS() 
              // const topicParams = { 
              //   Name: "ATBT2" 
              // } 
              // sns.createTopic(topicParams).promise() 
              //       .then((data) => { 
              //         const subscriptionParams = { 
              //           TopicArn: data.TopicArn, 
              //           Protocol: "sms", 
              //           Endpoint: `+15555555555`
              //         } 
              //         sns.subscribe(subscriptionParams).promise().then( 
              //           () => { 
              //             if (subscriptionParams.Protocol === 'sms') { 
              //               console.log(`You have subscribed to the ${lid} flood gage.`) 
              //             } 
              //           }) 
              //           .catch(err => console.log(err)) 
              //       }) 
              //       .catch((err) => console.log(err)) 
            // }) 
            // const nextToken = null 
            // sns.listSubscriptions({NextToken: nextToken}, (err, data) => { 
            //     if (err) { 
            //       console.log(err) 
            //     } 
            //     if (data) { 
            //       console.log(data) 
            //       let counter = 0 
            //       // Get the current state of subscriptions in the app, set a regex for filtering, and define a default record 
            //       // if (!nextToken) { 
            //       //   dispatch(clearSubscriptionList()) 
            //       // } 
            //       // const gagePattern = new RegExp("^([A-Z]{4}[0-9])$") 
            //       // // Iterate through the records 
            //       // data.Subscriptions.forEach((sub) => { 
            //       //   const endpoint = sub.Endpoint 
            //       //   const topic = sub.TopicArn.split(":").pop() 
 
            //       //   if (gagePattern.test(topic)) { 
            //       //     if (phone && (endpoint === ("+1" + phone) || endpoint === phone)) { 
            //       //       dispatch(addSubscriptionToSubscriptionList(topic, sub, "sms", endpoint)) 
            //       //     } 
            //       //     if (email && endpoint === email) { 
            //       //       dispatch(addSubscriptionToSubscriptionList(topic, sub, "email", endpoint)) 
            //       //     } 
            //       //   } 
            //       //   counter++ 
            //       //   if (counter === data.Subscriptions.length) { 
            //       //     if (data.NextToken) { 
            //       //       dispatch(getUserSubscriptions(email, phone, data.NextToken)) 
            //       //     } 
            //       //     else { 
            //       //       dispatch(getSubscriptionsSuccess()) 
            //       //       if (getState().subscriptions.allSubscriptions.length === 0) { 
            //       //         dispatch( 
            //       //           showSnackbar("No subscriptions found. Click a gage to subscribe and start receiving notifications.") 
            //       //         ) 
            //       //       } 
            //       //     } 
            //       //   } 
            //       // }) 
            //     } 
            //   }) 
 
        }, 
 
        onFailure: function(err) { 
          console.log("failed") 
            alert(err); 
        }, 
 
        newPasswordRequired: function(userAttributes, requiredAttributes) { 
          console.log("new password required") 
            // User was signed up by an admin and must provide new  
            // password and required attributes, if any, to complete  
            // authentication. 
 
            // userAttributes: object, which is the user's current profile. It will list all attributes that are associated with the user.  
            // Required attributes according to schema, which don’t have any values yet, will have blank values. 
            // requiredAttributes: list of attributes that must be set by the user along with new password to complete the sign-in. 
            delete userAttributes.email_verified; 
            delete userAttributes.phone_number_verified; 
            // Get these details and call  
            // newPassword: password that user has given 
            // attributesData: object with key as attribute name and value that the user has given. 
            var newPassword = "TestTest123!" 
            cognitoUser.completeNewPasswordChallenge(newPassword, userAttributes, this) 
        } 
 
    }); 
 
  const WINDOW_AWS = window.AWS
  WINDOW_AWS.config.update(keys.awsConfig)
  const sns = new WINDOW_AWS.SNS()

  return (dispatch, getState) => {
    dispatch(getSubscriptionsAttempt())
    return sns.listSubscriptions({NextToken: nextToken}, (err, data) => {
      if (err) {
        dispatch(getSubscriptionsError(err))
      }
      if (data) {
        let counter = 0
        // Get the current state of subscriptions in the app, set a regex for filtering, and define a default record
        if (!nextToken) {
          dispatch(clearSubscriptionList())
        }
        const gagePattern = new RegExp("^([A-Z]{4}[0-9])$")
        // Iterate through the records
        data.Subscriptions.forEach((sub) => {
          const endpoint = sub.Endpoint
          const topic = sub.TopicArn.split(":").pop()

          if (gagePattern.test(topic)) {
            if (phone && (endpoint === ("+1" + phone) || endpoint === phone)) {
              dispatch(addSubscriptionToSubscriptionList(topic, sub, "sms", endpoint))
            }
            if (email && endpoint === email) {
              dispatch(addSubscriptionToSubscriptionList(topic, sub, "email", endpoint))
            }
          }
          counter++
          if (counter === data.Subscriptions.length) {
            if (data.NextToken) {
              dispatch(getUserSubscriptions(email, phone, data.NextToken))
            }
            else {
              dispatch(getSubscriptionsSuccess())
              if (getState().subscriptions.allSubscriptions.length === 0) {
                dispatch(
                  showSnackbar("No subscriptions found. Click a gage to subscribe and start receiving notifications.")
                )
              }
            }
          }
        })
      }
    })
  }
}
