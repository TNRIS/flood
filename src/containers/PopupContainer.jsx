import { connect } from 'react-redux'

import Popup from '../components/Popup'

const mapStateToProps = (state) => {
  let props = {
    popupInfo: state.map.popup
  }

  if (state.map.popup && state.map.popup.data) {
    props.position = state.map.popup.data.latlng
    props.data = state.map.popup.data.data
    props.layerId = state.map.popup.id
  }

  return props
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

const PopupContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Popup)

export default PopupContainer
