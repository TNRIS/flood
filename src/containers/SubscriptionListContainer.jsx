import { connect } from 'react-redux'

import {
  clearSubscriptionList,
} from '../actions/SubscriptionListActions'
import SubscriptionList from '../components/SubscriptionList'

import {
  addSubscribeToChangeList,
  addUnsubscribeToChangeList,
  saveSubscriptionChanges,
  unqueueChangeFromChangeList
} from '../actions/SubscriptionChangeActions'

import {
  setCenterAndZoom
} from '../actions/MapActions'

import {
  setPopup
} from '../actions/PopupActions'

const mapStateToProps = (state) => {
  return {
    gageSubscriptionById: state.gageSubscriptions.gageSubscriptionById,
    allGageSubscriptions: state.gageSubscriptions.allGageSubscriptions,
    displayGageSubscriptions: state.gageSubscriptions.displayGageSubscriptions,
    allSubscriptions: state.subscriptions.allSubscriptions,
    subscriptions: state.subscriptions,
    email: state.user.email,
    phone: state.user.phone_number,
    gageInfo: state.gageInfo,
    isUpdating: state.subscriptionList.isUpdating,
    allSubscriptionChanges: state.subscriptionChanges.allSubscriptionChanges,
    browser: state.browser
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
    saveSubscriptionChanges: () => {
      dispatch(saveSubscriptionChanges())
    },
    setPopup: (popupData) => {
      dispatch(setPopup(popupData))
    },
    clearSubscriptionList: () => {
      dispatch(clearSubscriptionList())
    },
    unqueueChangeFromChangeList: (lid, protocol, action) => {
      dispatch(unqueueChangeFromChangeList(lid, protocol, action))
    },
    setCenterAndZoom: (lat, lng, zoom) => {
      dispatch(setCenterAndZoom(lat, lng, zoom))
    }
  }
}

const SubscriptionListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SubscriptionList)

export default SubscriptionListContainer
