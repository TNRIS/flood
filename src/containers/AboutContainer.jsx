import { connect } from 'react-redux'

import { hideAboutDialog } from '../actions/AboutActions'
import About from '../components/About'

const mapStateToProps = (state) => {
  return {openDialog: state.aboutDialog.openDialog}
}

const mapDispatchToProps = (dispatch) => {
  return {
    hideAbout: () => {
      dispatch(hideAboutDialog())
    }
  }
}

const AboutContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(About)

export default AboutContainer
