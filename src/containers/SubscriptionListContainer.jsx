import { connect } from 'react-redux'

import * as actions from '../actions/SubscriptionFormActions'
import SubscriptionList from '../components/SubscriptionList'

const mapStateToProps = (state) => {
  const props = {
    subscriptions: state.subscriptions
  }

  return props
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const SubscriptionListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SubscriptionList)

export default SubscriptionListContainer
