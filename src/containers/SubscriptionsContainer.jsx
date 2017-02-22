import { connect } from 'react-redux'

import * as actions from '../actions/SubscriptionsActions'
import Subscriptions from '../components/Subscriptions'

const mapStateToProps = (state) => {
  const props = {
    email: state.subscriptions.email,
    phone: state.subscriptions.phone,
    currentSubscriptions: state.subscriptions.currentSubscriptions,
    error: state.subscriptions.error,
    isFetching: state.subscriptions.isFetching
  }

  return props
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserSubscriptions: (email, phone) => {
      dispatch(actions.getUserSubscriptions(email, phone))
    }
  }
}

const SubscriptionsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Subscriptions)

export default SubscriptionsContainer
