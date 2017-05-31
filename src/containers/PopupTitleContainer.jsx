import { connect } from 'react-redux'

import { showSubscriptionConfirmation } from '../actions/SubscribeActions'
import { showSnackbar } from '../actions/ToasterActions'

import PopupTitle from '../components/PopupTitle'

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
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
