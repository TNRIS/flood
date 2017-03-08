import { connect } from 'react-redux'

import * as actions from '../actions/SubscriptionFormActions'
import { setUserInfo } from '../actions/UserInfoActions'
import SubscriptionForm from '../components/SubscriptionForm'

import { clearSubscriptionList }  from '../actions/SubscriptionListActions'

const mapStateToProps = (state) => {
  const props = {
    email: state.user.email,
    phone: state.user.phone,
    currentSubscriptions: state.subscriptionForm.currentSubscriptions,
    error: state.subscriptionForm.error,
    isFetching: state.subscriptionForm.isFetching,
    nextToken: state.subscriptionForm.nextToken,
    allSubscriptions: state.subscriptions.allSubscriptions
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
