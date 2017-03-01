import { connect } from 'react-redux'

import {
  markSubscriptionForAdd,
  markSubscriptionForRemove
} from '../actions/SubscriptionListActions'
import SubscriptionList from '../components/SubscriptionList'

const mapStateToProps = (state) => {
  const props = {
    subscriptions: state.subscriptions,
    email: state.user.email,
    phone: state.user.phone
  }

  return props
}

const mapDispatchToProps = (dispatch) => {
  return {
    markSubscriptionForAdd: (lid, protocol) => {
      dispatch(markSubscriptionForAdd(lid, protocol))
    },
    markSubscriptionForRemove: (lid, protocol) => {
      dispatch(markSubscriptionForRemove(lid, protocol))
    }
  }
}

const SubscriptionListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SubscriptionList)

export default SubscriptionListContainer
