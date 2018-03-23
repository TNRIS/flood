import { connect } from 'react-redux'

import {
  subscribeGage,
  hideSubscriptionConfirmation
} from '../actions/SubscribeActions'

import SubscriptionConfirmation from '../components/SubscriptionConfirmation'


const mapStateToProps = (state) => {
  return {
    showConfirmation: state.subscriptionConfirmation.showConfirmation,
    popupData: state.popupData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    hideSubscriptionConfirmation: () => {
      dispatch(hideSubscriptionConfirmation())
    },
    subscribeGage: (lid, flag) => {
      dispatch(subscribeGage(lid, flag))
    }
  }
}

const SubscriptionConfirmationContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SubscriptionConfirmation)

export default SubscriptionConfirmationContainer
