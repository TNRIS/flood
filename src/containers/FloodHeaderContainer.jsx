import { connect } from 'react-redux'
import FloodHeader from '../components/FloodHeader'

const mapStateToProps = (state) => {
  return {browser: state.browser}
}


const FloodHeaderContainer = connect(
  mapStateToProps
)(FloodHeader)

export default FloodHeaderContainer
