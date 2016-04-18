import { connect } from 'react-redux'

import Popup from '../components/Popup'

const mapStateToProps = (state) => {
  return {
    popupInfo: state.map.popup
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

const PopupContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Popup)

export default PopupContainer
