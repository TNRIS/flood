import {
  ADD_SUBSCRIBE_TO_CHANGE_LIST,
  ADD_UNSUBSCRIBE_TO_CHANGE_LIST,
  UNQUEUE_CHANGE_FROM_CHANGE_LIST
} from '../constants/SubscriptionChangeActionTypes'

let nextSubscriptionChangeId = 0

export function addSubscribeToChangeList(lid, protocol) {
  return {
    type: ADD_SUBSCRIBE_TO_CHANGE_LIST,
    payload: {
      id: `${lid}_${protocol}_subscribe`,
      lid,
      protocol,
      subscriptionAction: "SUBSCRIBE"
    }
  }
}

export function addUnsubscribeToChangeList(lid, protocol, subscriptionId) {
  return {
    type: ADD_UNSUBSCRIBE_TO_CHANGE_LIST,
    payload: {
      id: `${lid}_${protocol}_unsubscribe`,
      lid,
      protocol,
      subscriptionId,
      subscriptionAction: "UNSUBSCRIBE"
    }
  }
}

export function unqueueChangeFromChangeList(lid, protocol, action) {
  return {
    type: UNQUEUE_CHANGE_FROM_CHANGE_LIST,
    payload: {
      id: `${lid}_${protocol}_${action}`
    }
  }
}

export function removeSubscription(subscriptionArn) {
  const WINDOW_AWS = window.AWS
  WINDOW_AWS.config.update(keys.awsConfig)
  const sns = new WINDOW_AWS.SNS()

  return sns.unsubscribe({SubscriptionArn: subscriptionArn}, (err, data) => {
    if (err) console.log(err, err.stack)
    else console.log(data)
  })
}
