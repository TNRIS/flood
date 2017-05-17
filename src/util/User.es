import AWS from 'aws-sdk'
import 'amazon-cognito-js'

import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser } from 'amazon-cognito-identity-js'

import keys from '../keys'

import { store } from '../store'

import {
  getUserSubscriptions
} from '../actions/SubscriptionFormActions'


class AppUser {
  constructor() {
    this.AWS = AWS
    this.region = 'us-east-1'
    this.authenticated = false
    this.appConfig = {...keys.awsConfig}
    this.userData = {}

    this.userPoolId = this.appConfig.UserPoolId
    this.clientId = this.appConfig.ClientId

    this.poolData = {
      UserPoolId: this.userPoolId,
      ClientId: this.clientId
    }
    this.AWS.config.update({region: this.region})
  }

  setCognitoUser = (loginInfo) => {
    this.username = loginInfo.Username
    this.password = loginInfo.Password

    this.authenticationData = {
      Username: this.username,
      Password: this.password
    }
    this.authenticationDetails = new this.AWS.CognitoIdentityServiceProvider.AuthenticationDetails(
      this.authenticationData)
    this.userPool = new this.AWS.CognitoIdentityServiceProvider.CognitoUserPool(this.poolData)

    this.userData = {
      Username: this.username,
      Pool: this.userPool
    }
    this.cognitoUser = new this.AWS.CognitoIdentityServiceProvider.CognitoUser(this.userData)

    return this.cognitoUser
  }

  setUserAttributes = (attributes) => {
    this.phone = attributes.Phone
    this.email = attributes.Email

    this.dataPhoneNumber = {
      Name: 'phone_number',
      Value: `+1${this.phone}`
    }

    this.dataEmail = {
      Name: 'email',
      Value: this.email
    }

    this.attributePhoneNumber = new this.AWS.CognitoIdentityServiceProvider.CognitoUserAttribute(this.dataPhoneNumber)
    this.attributeEmail = new this.AWS.CognitoIdentityServiceProvider.CognitoUserAttribute(this.dataEmail)
    this.attributeList = [this.attributePhoneNumber, this.attributeEmail]

    return this.attributeList
  }

  authenticate = (callback) => {
    this.cognitoUser.authenticateUser(this.authenticationDetails, {
      onSuccess: (result) => {
        console.log(this.AWS.config.credentials)
        this.idToken = result.getIdToken().getJwtToken()
        this.AWS.config.credentials = new this.AWS.CognitoIdentityCredentials({
          IdentityPoolId: this.appConfig.IdentityPoolId,
          Logins: {
            [this.appConfig.Logins.cognito.identityProviderName]: this.idToken
          }
        }, {
          region: 'us-east-1'
        })
        console.log(this.AWS.config.credentials)

        this.AWS.config.credentials.refresh((error) => {
            if (error) {
                console.log(error);
                console.log(this.AWS.config.credentials)
            } else {
              this.identityId = this.AWS.config.credentials.params.IdentityId
              console.log(this)

              this.cognitoUser.getUserAttributes((err, att) => {
                if (err) console.log(err)
                else {
                  const user = {}
                  for (let i = 0; i < att.length; i++) {
                    user[att[i].Name] = att[i].Value
                  }
                  this.userData = {...user}
                  console.log(this.userData)
                }
              })
              return callback(0)
            }
        })
      }
    })
  }

  createCognitoSyncSession = () => {
    this.cognitoSync = new this.AWS.CognitoSync()
    return this.cognitoSync
  }

  signUp = (callback) => {
    this.userPool.signUp(this.username, this.password, this.attributeList, null, function(err, result){
        if (err) {
            return callback(err)
        }

        return callback(0)
    })
  }

  confirmSignup = (verificationCode, callback) => {
    this.cognitoUser.confirmRegistration(verificationCode, false, function(err, result) {
      if (err) {
        return callback(err)
      }
      console.log(result)

      return callback(0)
    })
  }

  resendVerificationCode = (callback) => {
    this.cognitoUser.resendConfirmationCode(function(err, result) {
        if (err) {
          return callback (err)
        }
        console.log('call result: ' + result)
        return callback(0)
    })
  }

  forgotPassword = (username, callback) => {
    this.userPool = new this.AWS.CognitoIdentityServiceProvider.CognitoUserPool(this.poolData)

    this.userData = {
      Username: username,
      Pool: this.userPool
    }
    this.cognitoUser = new this.AWS.CognitoIdentityServiceProvider.CognitoUser(this.userData)

    this.cognitoUser.forgotPassword({
      onFailure: function(err) {
        return callback(err)
      },
      inputVerificationCode: function(data) {
        return callback(0)
      }
    })
  }

  confirmPassword = (verificationCode, password, callback) => {
    this.cognitoUser.confirmPassword(verificationCode, password, {
      onSuccess: function () {
          return callback(0)
      },
      onFailure: function(err) {
          return callback(err)
      }
    })
  }

}


class FloodAppUser extends AppUser {
  constructor() {
    super()

    this.dataset = 'texasflood'
    this.userSubscriptions = []
    this.syncSession = null
  }

  checkForSubscriptions(callback) {
    this.syncSession = this.createCognitoSyncSession()
    console.log(this.syncSession)
    console.log(this.AWS.config.credentials)
    const baseParams = {
      IdentityId: this.identityId,
      IdentityPoolId: this.appConfig.IdentityPoolId
    }
    console.log(baseParams)

    this.syncSession.listDatasets({
      IdentityId: this.identityId,
      IdentityPoolId: this.appConfig.IdentityPoolId
    }, (err, data) => {
      if (err) console.log(err)
      else {
        if (data.Datasets.length > 0 && data.Datasets[0].DatasetName === this.dataset) {
          this.getUserSubscriptions({...baseParams, DatasetName: this.dataset}, callback)
        }
        else return callback([])
      }
    })
  }

  getUserSubscriptions(params, callback) {
    if (!params.nextToken) {
      this.userSubscriptions = []
    }
    this.syncSession.listRecords(params, (err, subscriptions) => {
      if (err) console.log(err)
      else {
        this.userSubscriptions = this.userSubscriptions.concat(subscriptions.Records)
        if (subscriptions.nextToken) {
          this.getUserSubscriptions({nextToken})
        }
        else {
          return callback(this.userSubscriptions)
        }
      }
    })
  }

  subscribe(subscriptionData) {
    return new Promise((resolve, reject) => {
      const stringData = JSON.stringify({...subscriptionData, protocol: "sms", endpoint: this.userData.phone_number})
      this.AWS.config.credentials.get(() => {
        const client = new this.AWS.CognitoSyncManager()
        client.openOrCreateDataset(this.dataset, (err, dataset) => {
          if (err) console.log(err)
          dataset.put(
            subscriptionData.subscriptionArn, stringData, (putError) => {
              if (putError) reject(putError)
              dataset.synchronize({
                onSuccess: (updatedDataset, newRecords) => {
                  resolve(newRecords)
                  store.dispatch(getUserSubscriptions())
                },
                onFailure: (syncError) => {
                  reject(syncError)
                }
              })
            })
        })
      })
    })
  }

  unsubscribe(arn) {
    return new Promise((resolve, reject) => {
      this.AWS.config.credentials.get(() => {
        const client = new this.AWS.CognitoSyncManager()
        client.openOrCreateDataset(this.dataset, (err, dataset) => {
          if (err) console.log(err)
          dataset.remove(arn, (removeError) => {
            if (removeError) reject(removeError)
            dataset.synchronize({
              onSuccess: (updatedDataset, newRecords) => resolve(newRecords),
              onFailure: (syncError) => reject(syncError)
            })
          })
        })
      })
    })
  }

  logout() {
    console.log("logging out")
  }
}

export default (new FloodAppUser)
