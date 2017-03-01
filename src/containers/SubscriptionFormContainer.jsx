import { connect } from 'react-redux'

import * as actions from '../actions/SubscriptionFormActions'
import { setUserInfo } from '../actions/UserInfoActions'
import SubscriptionForm from '../components/SubscriptionForm'

const mapStateToProps = (state) => {
  const props = {
    email: state.user.email,
    phone: state.user.phone,
    currentSubscriptions: state.subscriptionForm.currentSubscriptions,
    error: state.subscriptionForm.error,
    isFetching: state.subscriptionForm.isFetching,
    nextToken: state.subscriptionForm.nextToken
  }

  return props
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearSubscriptions: () => {
      dispatch(actions.clearSubscriptions())
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
