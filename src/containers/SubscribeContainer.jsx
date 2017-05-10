import { connect } from 'react-redux'

import * as actions from '../actions'

import {
  showSnackbar
} from '../actions/ToasterActions'

import {
  subscribeGage
} from '../actions/SubscribeActions'

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
    showSnackbar: (toppings) => {
      dispatch(showSnackbar(toppings))
    },
    subscribeGage: (lid, protocol, endpoint) => {
      dispatch(subscribeGage(lid, protocol, endpoint))
    }
  }
}

const SubscribeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Subscribe)

export default SubscribeContainer
