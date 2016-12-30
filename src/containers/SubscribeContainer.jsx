import { connect } from 'react-redux'

import * as actions from '../actions'
import Subscribe from '../components/Subscribe'

const mapStateToProps = (state) => {
  return {openDialog: state.subscribeDialog.openDialog,
          lid: state.subscribeDialog.lid,
          name: state.subscribeDialog.name}
}

const mapDispatchToProps = (dispatch) => {
  return {
    hideSubscribe: () => {
      dispatch(actions.hideSubscribeDialog())
    }
  }
}

const SubscribeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Subscribe)

export default SubscribeContainer
