import { connect } from 'react-redux'

import * as actions from '../actions'
import PopupTitle from '../components/PopupTitle'

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    showSubscribe: () => {
      dispatch(actions.showSubscribeDialog())
    }
  }
}

const PopupTitleContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PopupTitle)

export default PopupTitleContainer
