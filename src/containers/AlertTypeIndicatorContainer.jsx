import { connect } from 'react-redux'

import AlertTypeIndicator from '../components/AlertTypeIndicator'
import { showSnackbar } from '../actions/ToasterActions'

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    showSnackbar: (toppings, timeout) => {
      dispatch(showSnackbar(toppings, timeout))
    }
  }
}

const AlertTypeIndicatorContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AlertTypeIndicator)

export default AlertTypeIndicatorContainer
