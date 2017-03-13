import { connect } from 'react-redux'

import * as actions from '../actions/SubscriptionFormActions'
import { setUserInfo } from '../actions/UserInfoActions'
import SubscriptionForm from '../components/SubscriptionForm'

import { clearSubscriptionList }  from '../actions/SubscriptionListActions'

const mapStateToProps = (state) => {
  const props = {
    allSubscriptions: state.subscriptions.allSubscriptions,
    currentSubscriptions: state.subscriptionForm.currentSubscriptions,
    email: state.user.email,
    error: state.subscriptionForm.error,
    isFetching: state.subscriptionForm.isFetching,
    nextToken: state.subscriptionForm.nextToken,
    phone: state.user.phone,
  }

  return props
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearSubscriptionList: () => {
      dispatch(clearSubscriptionList())
    },
    getUserSubscriptions: (email, phone, nextToken) => {
      dispatch(actions.getUserSubscriptions(email, phone, nextToken))
    },
    saveSubscriptionUpdates: () => {
      dispatch(actions.saveSubscriptionUpdates())
    },
    setUserInfo: (email, phone) => {
      dispatch(setUserInfo(email, phone))
    },
    subscriptionFormUpdated: () => {
      dispatch(actions.subscriptionFormUpdated(email, phone))
    }
  }
}

const SubscriptionFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SubscriptionForm)

export default SubscriptionFormContainer
