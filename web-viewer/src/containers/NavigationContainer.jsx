import { connect } from 'react-redux'

import NavigationBar from '../components/NavigationBar'

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

const NavigationContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationBar)

export default NavigationContainer
