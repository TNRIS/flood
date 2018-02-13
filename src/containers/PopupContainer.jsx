import { connect } from 'react-redux'

import Popup from '../components/Popup'

import { withRouter } from 'react-router'

const mapStateToProps = (state) => {
  return {
    browser: state.browser,
    gageInfo: state.gageInfo,
    popupData: state.popupData
  }
}

const popupWithRouter = withRouter(Popup)

const PopupContainer = connect(
  mapStateToProps
)(popupWithRouter)

export default PopupContainer
