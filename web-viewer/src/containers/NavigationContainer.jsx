import { connect } from 'react-redux'

import { setWeatherLayer } from '../actions'
import NavigationBar from '../components/NavigationBar'

const mapStateToProps = (state) => {
  return {
    activeWeatherLayerId: state.weatherLayer.active
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onWeatherButtonClick: (id) => {
      dispatch(setWeatherLayer(id))
    }
  }
}

const NavigationContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationBar)

export default NavigationContainer