import { connect } from 'react-redux'

import {
  clearSubscriptionList,
  markSubscriptionForAdd,
  markSubscriptionForRemove
} from '../actions/SubscriptionListActions'
import SubscriptionList from '../components/SubscriptionList'

import {
  addSubscribeToChangeList,
  addUnsubscribeToChangeList,
  saveSubscriptionChanges,
  unqueueChangeFromChangeList
} from '../actions/SubscriptionChangeActions'

const mapStateToProps = (state) => {
  return {
    gageSubscriptionById: state.gageSubscriptions.gageSubscriptionById,
    allGageSubscriptions: state.gageSubscriptions.allGageSubscriptions,
    allSubscriptions: state.subscriptions.allSubscriptions,
    subscriptions: state.subscriptions,
    email: state.user.email,
    phone: state.user.phone
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addSubscribeToChangeList: (lid, protocol) => {
      dispatch(addSubscribeToChangeList(lid, protocol))
    },
    addUnsubscribeToChangeList: (lid, protocol, subscriptionId) => {
      dispatch(addUnsubscribeToChangeList(lid, protocol, subscriptionId))
    },
    markSubscriptionForAdd: (lid, protocol) => {
      dispatch(markSubscriptionForAdd(lid, protocol))
    },
    markSubscriptionForRemove: (lid, protocol) => {
      dispatch(markSubscriptionForRemove(lid, protocol))
    },
    saveSubscriptionChanges: () => {
      dispatch(saveSubscriptionChanges())
    },
    clearSubscriptionList: () => {
      dispatch(clearSubscriptionList())
    },
    unqueueChangeFromChangeList: (lid, protocol, action) => {
      dispatch(unqueueChangeFromChangeList(lid, protocol, action))
    }
  }
}

const SubscriptionListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SubscriptionList)

export default SubscriptionListContainer
