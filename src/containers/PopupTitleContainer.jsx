import { connect } from 'react-redux'

import { showSubscriptionConfirmation } from '../actions/SubscribeActions'
import { showSnackbar } from '../actions/ToasterActions'

import {
  clearPopup
} from '../actions/PopupActions'

import PopupTitle from '../components/PopupTitle'

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearPopup: () => {
      dispatch(clearPopup())
    },
    showSubscriptionConfirmation: () => {
      dispatch(showSubscriptionConfirmation())
    },
    showSnackbar: (toppings) => {
      dispatch(showSnackbar(toppings))
    }
  }
}

const PopupTitleContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PopupTitle)

export default PopupTitleContainer
