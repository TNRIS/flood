import { connect } from 'react-redux'

import App from '../components/App'
import { showSnackbar } from '../actions/ToasterActions'

import {
  setCenterAndZoom
} from '../actions/SubscriptionChangeActions'

import { retrieveUser } from '../actions/UserActions'

const mapStateToProps = (state) => {
  return {browser: state.browser}
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCenterAndZoom: (lat, lng, zoom) => {
      dispatch(setCenterAndZoom(lat, lng, zoom))
    },
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
