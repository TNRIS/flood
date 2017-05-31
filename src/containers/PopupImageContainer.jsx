import { connect } from 'react-redux'

import {
  popupImageLoadSuccess
} from '../actions/PopupActions'

import PopupImage from '../components/PopupImage'

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    popupImageLoadSuccess: () => {
      dispatch(popupImageLoadSuccess())
    }
  }
}

const PopupImageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PopupImage)

export default PopupImageContainer
