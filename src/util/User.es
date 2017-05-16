import AWS from 'aws-sdk'
import 'amazon-cognito-js'

import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser } from 'amazon-cognito-identity-js'

import keys from '../keys'

import { store } from '../store'


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

  authenticate = (callback) => {
    this.cognitoUser.authenticateUser(this.authenticationDetails, {
      onSuccess: (result) => {
        this.idToken = result.getIdToken().getJwtToken()
        // this.AWS.config.credentials = new this.AWS.CognitoIdentityCredentials({
        this.credentials = new this.AWS.CognitoIdentityCredentials({
          IdentityPoolId: this.appConfig.IdentityPoolId,
          Logins: {
            [this.appConfig.Logins.cognito.identityProviderName]: this.idToken
          }
        }, {
          region: 'us-east-1'
        })

        this.identityId = this.credentials.params.IdentityId
        this.AWS.config.credentials = this.credentials

        this.cognitoUser.getUserAttributes((err, att) => {
          if (err) console.log(err)
          else {
            const user = {}
            for (let i = 0; i < att.length; i++) {
              user[att[i].Name] = att[i].Value
            }
            this.userData = {...user}
          }
        })
        return callback(0)
      }
    })
  }

  createCognitoSyncSession = () => {
    this.cognitoSync = new this.AWS.CognitoSync()
    return this.cognitoSync
  }

}


class FloodAppUser extends AppUser {
  constructor(loginInfo) {
    super(loginInfo)

    this.dataset = 'texasflood'
    this.syncSession = null
  }

  checkForSubscriptions(callback) {
    console.log(this.AWS.config.credentials)
    this.syncSession = this.createCognitoSyncSession()

    const baseParams = {
      IdentityId: this.identityId,
      IdentityPoolId: this.appConfig.IdentityPoolId
    }

    this.syncSession.listDatasets({
      IdentityId: this.identityId,
      IdentityPoolId: this.appConfig.IdentityPoolId
    }, (err, data) => {
      if (err) console.log(err)
      else {
        console.log(data)
        if (data.Datasets.length > 0 && data.Datasets[0].DatasetName === this.dataset) {
          this.syncSession.listRecords({...baseParams, DatasetName: this.dataset}, (err, data) => {
            if (err) console.log(err)
            else {
              console.log(data)
              return callback(data.Records)
            }
          })
        }
        else return callback([])
      }
    })
    console.log(this.AWS.config.credentials)
  }

  subscribe(subscriptionData) {
    console.log(this.AWS.config.credentials)
    this.AWS.config.credentials.get(() => {
      const client = new this.AWS.CognitoSyncManager()
      client.openOrCreateDataset(this.dataset, (err, dataset) => {
        if (err) console.log(err)
        else {
          dataset.put(subscriptionData.subscriptionArn, JSON.stringify(subscriptionData), (err, record) => {
            if (err) console.log(err)
            else this.synchronize()
          })
        }
      })
    })
  }

  synchronize() {
    dataset.synchronize({
      onSuccess: (dataset, newRecords) => {
        console.log(newRecords)
        store.dispatch(getUserSubscriptions())
      }
    })
  }

  unsubscribe(arn) {
    console.log(this.AWS.config.credentials)
    this.AWS.config.credentials.get(() => {
      const client = new this.AWS.CognitoSyncManager()
      client.openOrCreateDataset(this.dataset, (err, dataset) => {
        if (err) console.log(err)
        else {
          dataset.remove(arn, (err, record) => {
            if (err) console.log(err)
            else this.synchronize()
          })
        }
      })
    })
  }

  logout() {
    console.log("logging out")
  }
}

export default (new FloodAppUser)
