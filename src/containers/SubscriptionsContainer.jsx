import { connect } from 'react-redux'

import * as actions from '../actions/SubscriptionsListActions'
import Subscriptions from '../components/Subscriptions'

const mapStateToProps = (state) => {
  const props = {
    email: state.email,
    phone: state.phone,
    subscriptions: state.subscriptions,
    error: state.error,
    isFetching: state.isFetching
  }

  return props
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSubscriptions: (email, phone) => {
      dispatch(actions.getSubscriptions(email, phone))
    }
  }
}

const SubscriptionsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Subscriptions)

export default SubscriptionsContainer
