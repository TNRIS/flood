import { connect } from 'react-redux'

import {
  clearSubscriptionList,
  markSubscriptionForAdd,
  markSubscriptionForRemove,
  saveSubscriptionChanges
} from '../actions/SubscriptionListActions'
import SubscriptionList from '../components/SubscriptionList'

const mapStateToProps = (state) => {
  return {
    subscriptions: state.subscriptions,
    email: state.user.email,
    phone: state.user.phone
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    markSubscriptionForAdd: (lid, protocol) => {
      dispatch(markSubscriptionForAdd(lid, protocol))
    },
    markSubscriptionForRemove: (lid, protocol) => {
      dispatch(markSubscriptionForRemove(lid, protocol))
    },
    saveSubscriptionChanges: () => {
      dispatch(saveSubscriptionChanges())
    },
    clearSubscriptionList: () => {
      dispatch(clearSubscriptionList())
    }
  }
}

const SubscriptionListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SubscriptionList)

export default SubscriptionListContainer
