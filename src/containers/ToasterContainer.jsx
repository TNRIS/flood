import { connect } from 'react-redux'

import Toaster from '../components/Toaster'

import {
  hideSnackbar,
} from '../actions/ToasterActions'


const mapStateToProps = (state) => {
  return {
    isSnackbarActive: state.toaster.isSnackbarActive,
    snackbarText: state.toaster.snackbarText,
    snackbarTimeout: state.toaster.snackbarTimeout
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    hideSnackbar: () => {
      dispatch(hideSnackbar())
    }
  }
}

const ToasterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Toaster)

export default ToasterContainer
