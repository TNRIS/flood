import { connect } from 'react-redux'

import {
  subscribeGage,
  hideSubscriptionConfirmation
} from '../actions/SubscribeActions'

import SubscriptionConfirmation from '../components/SubscriptionConfirmation'


const mapStateToProps = (state) => {
  return {
    showConfirmation: state.subscriptionConfirmation.showConfirmation,
    lid: state.popupData.data.lid,
    name: state.popupData.data.name
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    hideSubscriptionConfirmation: () => {
      dispatch(hideSubscriptionConfirmation())
    },
    subscribeGage: (lid) => {
      dispatch(subscribeGage(lid))
    }
  }
}

const SubscriptionConfirmationContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SubscriptionConfirmation)

export default SubscriptionConfirmationContainer
