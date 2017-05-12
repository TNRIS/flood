import { connect } from 'react-redux'

import * as actions from '../actions/SubscriptionFormActions'
import { userLogin, loginSuccessful, userSignUp, userVerify } from '../actions/UserActions'
import { showSnackbar } from '../actions/ToasterActions'
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
    isUpdating: state.subscriptionList.isUpdating,
    displayForm: state.subscriptionForm.displayForm
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
    },
    userLogin: (username, password) => {
      dispatch(userLogin(username, password))
    },
    swapDisplayForm: (form) => {
      dispatch(actions.swapDisplayForm(form))
    },
    userSignUp: (username, password, phone, email) => {
      dispatch(userSignUp(username, password, phone, email))
    },
    userVerify: (username, verificationCode) => {
      dispatch(userVerify(username, verificationCode))
    },
    showSnackbar: (message) => {
      dispatch(showSnackbar(message))
    }
  }
}

const SubscriptionFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SubscriptionForm)

export default SubscriptionFormContainer
