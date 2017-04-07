import { connect } from 'react-redux'

import Popup from '../components/Popup'
import * as actions from '../actions'

const mapStateToProps = (state) => {
  const props = {
    popupInfo: state.map.popup,
    browser: state.browser,
    popup: state.map.popup
  }

  if (state.map.popup && state.map.popup.data) {
    props.position = state.map.popup.data.latlng
    props.data = state.map.popup.data.data
    props.layerId = state.map.popup.id
  }

  return props
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
