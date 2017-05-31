import { connect } from 'react-redux'

import  AccountSettingsForm from '../components/AccountSettingsForm'
import { deleteAccount } from '../actions/UserActions'

const mapStateToProps = (state) => {
  return {
    allSubscriptions: state.subscriptions.allSubscriptions
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteAccount: () => {
      dispatch(deleteAccount())
    }
  }
}

const AccountSettingsFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountSettingsForm)

export default AccountSettingsFormContainer
