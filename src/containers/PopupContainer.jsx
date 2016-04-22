import { connect } from 'react-redux'

import Popup from '../components/Popup'

const mapStateToProps = (state) => {
  const props = {
    popupInfo: state.map.popup,
    browser: state.browser,
  }

  if (state.map.popup && state.map.popup.data) {
    props.position = state.map.popup.data.latlng
    props.data = state.map.popup.data.data
    props.layerId = state.map.popup.id
  }

  return props
}

const mapDispatchToProps = () => {
  return {}
}

const PopupContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Popup)

export default PopupContainer
