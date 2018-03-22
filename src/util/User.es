import AWS from 'aws-sdk'
import 'amazon-cognito-js'
import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails
} from 'amazon-cognito-identity-js'

import keys from '../keys'

import { store } from '../store'

import {
  getUserSubscriptions
} from '../actions/SubscriptionFormActions'

import {
  sendErrorReport
} from '../actions/StevieActions'

import {
  userSignOut,
  siteReset
} from '../actions/UserActions'

import { util } from 'aws-sdk/global'

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
    this.userPool = new CognitoUserPool(this.poolData)
  }

  setCognitoUser = (loginInfo) => {
    this.username = loginInfo.Username
    this.password = loginInfo.Password

    this.authenticationData = {
      Username: this.username,
      Password: this.password
    }
    this.authenticationDetails = new AuthenticationDetails(
      this.authenticationData)

    this.userData = {
      Username: this.username,
      Pool: this.userPool
    }
    this.cognitoUser = new CognitoUser(this.userData)

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

    this.attributePhoneNumber = new CognitoUserAttribute(this.dataPhoneNumber)
    this.attributeEmail = new CognitoUserAttribute(this.dataEmail)

    this.dataCurrentAlerts = {
      Name: 'custom:currentAlerts',
      Value: 'T'
    }

    this.dataPredictiveAlerts = {
      Name: 'custom:predictiveAlerts',
      Value: 'T'
    }

    this.attributeCurrentAlerts = new CognitoUserAttribute(this.dataCurrentAlerts)
    this.attributePredictiveAlerts = new CognitoUserAttribute(this.dataPredictiveAlerts)

    this.attributeList = [this.attributePhoneNumber, this.attributeEmail, this.attributeCurrentAlerts, this.attributePredictiveAlerts]

    return this.attributeList
  }

  setAlertAttributes = () => {
    this.dataCurrentAlerts = {
      Name: 'custom:currentAlerts',
      Value: 'T'
    }

    this.dataPredictiveAlerts = {
      Name: 'custom:predictiveAlerts',
      Value: 'T'
    }

    this.attributeCurrentAlerts = new CognitoUserAttribute(this.dataCurrentAlerts)
    this.attributePredictiveAlerts = new CognitoUserAttribute(this.dataPredictiveAlerts)

    const alertAttributeList = [this.attributeCurrentAlerts, this.attributePredictiveAlerts]
    this.cognitoUser.updateAttributes(alertAttributeList, function(err, result) {
      if (err) {
        return console.log(err)
      }
      return
    })
  }

  updateAlertAttribute = (updateAtt, newValue) => {
    this.dataUpdate = {
      Name: updateAtt,
      Value: newValue
    }

    this.updateAttribute = new CognitoUserAttribute(this.dataUpdate)

    const alertAttributeList = [this.updateAttribute]
    const result = this.cognitoUser.updateAttributes(alertAttributeList, function(err, result) {
      if (err) {
        return console.log(err)
      }
      console.log(result)
      return
    })
    console.log(this.userData)
    this.userData[updateAtt] = newValue
    // TO DO: add/remove subscriptions to topics based on the change
  }

  authenticate = (callback) => {
    this.cognitoUser.authenticateUser(this.authenticationDetails, {
      onSuccess: (result) => {
        this.idToken = result.getIdToken().getJwtToken()
        this.AWS.config.credentials = new this.AWS.CognitoIdentityCredentials({
          IdentityPoolId: this.appConfig.IdentityPoolId,
          Logins: {
            [this.appConfig.Logins.cognito.identityProviderName]: this.idToken
          }
        }, {
          region: 'us-east-1'
        })

        this.AWS.config.credentials.clearCachedId()
        this.AWS.config.credentials.refresh((error) => {
          if (error) {
            console.log(error)
          } else {
            this.identityId = this.AWS.config.credentials.params.IdentityId
            this.cognitoUser.getUserAttributes((err, att) => {
              if (err) store.dispatch(sendErrorReport(err))
              else {
                const user = {}
                for (let i = 0; i < att.length; i++) {
                  user[att[i].Name] = att[i].Value
                }
                this.userData = {...user}
                if (!(this.userData['custom:currentAlerts']) || !(this.userData['custom:predictiveAlerts'])) {
                  this.userData['custom:currentAlerts'] = 'T'
                  this.userData['custom:predictiveAlerts'] = 'T'
                  this.setAlertAttributes()
                }
              }
            })
            return callback(0)
          }
        })
      },
      onFailure: function(err) {
        return callback(err)
      },
    })
  }

  createCognitoSyncSession = () => {
    this.cognitoSync = new this.AWS.CognitoSync()
    return this.cognitoSync
  }

  signUp = (callback) => {
    this.userPool.signUp(this.username, this.password, this.attributeList, null, function(err, result) {
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
      return callback(0)
    })
  }

  deleteAccount = () => {
    return new Promise((resolve, reject) => {
      this.cognitoUser.deleteUser((err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  }

  resendVerificationCode = (callback) => {
    this.cognitoUser.resendConfirmationCode(function(err, result) {
      if (err) {
        return callback(err)
      }
      return callback(0)
    })
  }

  forgotPassword = (username, callback) => {
    this.userData = {
      Username: username,
      Pool: this.userPool
    }
    this.cognitoUser = new CognitoUser(this.userData)

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
      onSuccess: function() {
        return callback(0)
      },
      onFailure: function(err) {
        return callback(err)
      }
    })
  }

  signOut = (callback) => {
    this.cognitoUser.globalSignOut({
      onSuccess: function() {
        return callback(0)
      },
      onFailure: function(err) {
        console.log(err)
        return callback(err)
      }
    })
  }

  retrieveUser = (callback) => {
    this.cognitoUser = this.userPool.getCurrentUser()
    if (this.cognitoUser !== null) {
      const session = this.cognitoUser.getSession(function(err, session) {
        if (err) {
          return callback(err)
        }
        return session
      })

      try {
        this.idToken = session.getIdToken().getJwtToken()
        this.AWS.config.credentials = new this.AWS.CognitoIdentityCredentials({
          IdentityPoolId: this.appConfig.IdentityPoolId,
          Logins: {
            [this.appConfig.Logins.cognito.identityProviderName]: this.idToken
          }
        }, {
          region: 'us-east-1'
        })

        this.AWS.config.credentials.clearCachedId()
        this.AWS.config.credentials.refresh((error) => {
          if (error) {
            store.dispatch(sendErrorReport(error))
          } else {
            this.identityId = this.AWS.config.credentials.params.IdentityId
            this.cognitoUser.getUserAttributes((err, att) => {
              if (err) {
                store.dispatch(siteReset())
              }
              else {
                const user = {}
                for (let i = 0; i < att.length; i++) {
                  user[att[i].Name] = att[i].Value
                }
                this.userData = {...user}
                if (!(this.userData['custom:currentAlerts']) || !(this.userData['custom:predictiveAlerts'])) {
                  this.userData['custom:currentAlerts'] = 'T'
                  this.userData['custom:predictiveAlerts'] = 'T'
                  this.setAlertAttributes()
                }
              }
            })
            return callback(0, this.cognitoUser.username)
          }
        })
      }
      catch (e) {
        store.dispatch(siteReset())
        // alert("Your session has timed out.")
      }
    }
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
    const baseParams = {
      IdentityId: this.identityId,
      IdentityPoolId: this.appConfig.IdentityPoolId
    }
    this.syncSession.listDatasets({
      IdentityId: this.identityId,
      IdentityPoolId: this.appConfig.IdentityPoolId
    }, (err, data) => {
      if (err) store.dispatch(sendErrorReport(err))
      else {
        if (data.Datasets.length > 0 && data.Datasets[0].DatasetName === this.dataset) {
          this.getUserSubscriptions({
            ...baseParams,
            DatasetName: this.dataset
          }, callback)
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
      if (err) store.dispatch(sendErrorReport(err))
      else {
        subscriptions.Records.forEach((subscription) => {
          if (subscription.Value) {
            this.userSubscriptions.push(subscription)
          }
        })
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
      const stringData = JSON.stringify({
        ...subscriptionData,
        protocol: 'sms',
        endpoint: this.userData.phone_number
      })
      this.AWS.config.credentials.get(() => {
        const client = new this.AWS.CognitoSyncManager()
        client.openOrCreateDataset(this.dataset, (err, dataset) => {
          if (err) store.dispatch(sendErrorReport(err))
          dataset.put(subscriptionData.lid, stringData, (putError) => {
            if (putError) {
              store.dispatch(sendErrorReport(putError))
              reject(putError)
            }
            else {
              resolve()
            }
          })
        })
      })
    })
  }

  syncDataset() {
    return new Promise((resolve, reject) => {
      this.AWS.config.credentials.get(() => {
        const client = new this.AWS.CognitoSyncManager()
        client.openOrCreateDataset(this.dataset, (openError, dataset) => {
          if (openError) {
            store.dispatch(sendErrorReport(openError))
          }
          else {
            dataset.synchronize({
              onSuccess: (updatedDataset, newRecords) => {
                resolve(newRecords)
                store.dispatch(getUserSubscriptions())
              },
              onFailure: (syncError) => reject(syncError),
              onConflict: (dataset, conflicts, callback) => {
                const resolved = []

                for (let i = 0; i < conflicts.length; i++) {
                  const localRecord = conflicts[i].getLocalRecord()
                  const remoteRecord = conflicts[i].getRemoteRecord()

                  if (localRecord.value === "") {
                    resolved.push(conflicts[i].resolveWithLocalRecord())
                  }
                  else {
                    resolved.push(conflicts[i].resolveWithRemoteRecord())
                  }
                }

                dataset.resolve(resolved, () => {
                  resolve(resolved)
                  store.dispatch(getUserSubscriptions())
                  return callback(true)
                })
              },
            })
          }
        })
      })
    })
  }

  unsubscribe(arn) {
    return new Promise((resolve, reject) => {
      this.AWS.config.credentials.get(() => {
        const client = new this.AWS.CognitoSyncManager()
        client.openOrCreateDataset(this.dataset, (openError, dataset) => {
          if (openError) store.dispatch(sendErrorReport(openError))
          else {
            dataset.remove(arn, (removeError) => {
              if (removeError) {
                store.dispatch(sendErrorReport(removeError))
                reject(removeError)
              }
              else {
                resolve()
              }
            })
          }
        })
      })
    })
  }

}

export default (new FloodAppUser)
