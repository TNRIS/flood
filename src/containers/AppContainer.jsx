import { connect } from 'react-redux'

import App from '../components/App'
import { showSnackbar } from '../actions/ToasterActions'

import { retrieveUser } from '../actions/UserActions'

const mapStateToProps = (state) => {
  return {
    browser: state.browser,
    userAuthentication: state.user.authentication
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    showSnackbar: (toppings, timeout) => {
      dispatch(showSnackbar(toppings, timeout))
    },
    retrieveUser: () => {
      dispatch(retrieveUser())
    }
  }
}

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default AppContainer
