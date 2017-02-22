import { connect } from 'react-redux'

import * as actions from '../actions/SubscriptionsActions'
import Subscriptions from '../components/Subscriptions'

const mapStateToProps = (state) => {
  const props = {
    email: state.subscriptions.email,
    phone: state.subscriptions.phone,
    currentSubscriptions: state.subscriptions.currentSubscriptions,
    error: state.subscriptions.error,
    isFetching: state.subscriptions.isFetching,
    nextToken: state.subscriptions.nextToken
  }

  return props
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserSubscriptions: (email, phone, nextToken) => {
      dispatch(actions.getUserSubscriptions(email, phone, nextToken))
    }
  }
}

const SubscriptionsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Subscriptions)

export default SubscriptionsContainer
