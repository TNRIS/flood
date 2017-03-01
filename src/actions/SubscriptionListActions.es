import {
  MARK_SUBSCRIPTION_FOR_ADD,
  MARK_SUBSCRIPTION_FOR_REMOVE,
  SEED_SUBSCRIPTION_LIST
} from '../constants/SubscriptionListActionTypes'

export const markSubscriptionForAdd = (lid, protocol) => {
  return {
    type: MARK_SUBSCRIPTION_FOR_ADD,
    lid,
    protocol
  }
}

export const markSubscriptionForRemove = (lid, protocol) => {
  return {
    type: MARK_SUBSCRIPTION_FOR_REMOVE,
    lid,
    protocol
  }
}

export const seedSubscriptionList = (subscriptions) => {
  return {
    type: SEED_SUBSCRIPTION_LIST,
    subscriptions
  }
}
