import { connect } from 'react-redux'

import Popup from '../components/Popup'
import * as actions from '../actions'
import {
  clearPopup,
  popupImageLoadAttempt,
  popupImageLoadSuccess
} from '../actions/PopupActions'

const mapStateToProps = (state) => {
  return {
    browser: state.browser,
    gageInfo: state.gageInfo,
    popupData: state.popupData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearPopup: () => {
      dispatch(clearPopup())
    },
    popupImageLoadAttempt: () => {
      dispatch(popupImageLoadAttempt())
    },
    popupImageLoadSuccess: () => {
      dispatch(popupImageLoadSuccess())
    },
    setLidAndName: (lid, name) => {
      dispatch(actions.setLidAndName(lid, name))
    }
  }
}

const PopupContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Popup)

export default PopupContainer
