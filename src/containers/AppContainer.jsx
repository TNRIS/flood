import { connect } from 'react-redux'

import App from '../components/App'

import {
  setCenterAndZoom
} from '../actions/SubscriptionChangeActions'

const mapStateToProps = (state) => {
  return {browser: state.browser}
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCenterAndZoom: (lat, lng, zoom) => {
      dispatch(setCenterAndZoom(lat, lng, zoom))
    }
  }
}

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default AppContainer
