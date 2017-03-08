import { connect } from 'react-redux'

import * as actions from '../actions'
import About from '../components/About'

const mapStateToProps = (state) => {
  return {openDialog: state.aboutDialog.openDialog}
}

const mapDispatchToProps = (dispatch) => {
  return {
    hideAbout: () => {
      dispatch(actions.hideAboutDialog())
    }
  }
}

const AboutContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(About)

export default AboutContainer
