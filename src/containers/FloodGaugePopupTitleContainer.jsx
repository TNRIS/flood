import { connect } from 'react-redux'

import * as actions from '../actions'
import PopupTitle from '../components/PopupTitle'

const gaugeIcon = require('../images/flood_gauge_white.png')

const mapStateToProps = (state) => {
  const props = {
    title: "Flood Gage Information"
  }
  return props
}

const mapDispatchToProps = (dispatch) => {

  return {
    showSubscribeDialog: () => {
      dispatch(actions.showSubscribeDialog())
    }
  }
}

const FloodGaugePopupTitleContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PopupTitle)

export default FloodGaugePopupTitleContainer
