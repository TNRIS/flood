import { connect } from 'react-redux'

import Popup from '../components/Popup'
import * as actions from '../actions'

const mapStateToProps = (state) => {
  return {
    browser: state.browser,
    gageInfo: state.gageInfo,
    popup: state.popup
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
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
