import { connect } from 'react-redux'

import Popup from '../components/Popup'

const mapStateToProps = (state) => {
  return {
    browser: state.browser,
    gageInfo: state.gageInfo,
    popupData: state.popupData
  }
}

const PopupContainer = connect(
  mapStateToProps
)(Popup)

export default PopupContainer
