import { connect } from 'react-redux'

import * as actions from '../actions'
import AboutLink from '../components/AboutLink'

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    showAbout: () => {
      dispatch(actions.showAboutDialog())
    }
  }
}

const AboutLinkContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AboutLink)

export default AboutLinkContainer
