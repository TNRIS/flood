import { connect } from 'react-redux'

import * as actions from '../actions'
import {
  setUserInfo
} from '../actions/UserInfoActions'
import {
  showSnackbar
} from '../actions/ToasterActions'

import Subscribe from '../components/Subscribe'

const mapStateToProps = (state) => {
  return {
    openDialog: state.subscribeDialog.openDialog,
    lid: state.subscribeDialog.lid,
    name: state.subscribeDialog.name,
    email: state.user.email,
    phone: state.user.phone
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    hideSubscribe: () => {
      dispatch(actions.hideSubscribeDialog())
    },
    setUserInfo: (email, phone) => {
      dispatch(setUserInfo(email, phone))
    },
    showSnackbar: (toppings) => {
      dispatch(showSnackbar(toppings))
    }
  }
}

const SubscribeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Subscribe)

export default SubscribeContainer
