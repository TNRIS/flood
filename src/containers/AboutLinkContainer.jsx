import { connect } from 'react-redux'

import { showAboutDialog } from '../actions/AboutActions'
import AboutLink from '../components/AboutLink'

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    showAbout: () => {
      dispatch(showAboutDialog())
    }
  }
}

const AboutLinkContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AboutLink)

export default AboutLinkContainer
