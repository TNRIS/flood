import { connect } from 'react-redux'

import * as actions from '../actions'
import { clearPopup } from '../actions//PopupActions'
import PopupTitle from '../components/PopupTitle'

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    showSubscribe: () => {
      dispatch(actions.showSubscribeDialog())
    },
    clearPopup: () => {
      dispatch(clearPopup())
    }
  }
}

const PopupTitleContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PopupTitle)

export default PopupTitleContainer
