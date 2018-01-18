import React from 'react'
import PropTypes from 'prop-types'
import Alert from 'react-s-alert'

/**
 * App level toast notification component
 */
class Toaster extends React.Component {
  static propTypes = {
    hideSnackbar: PropTypes.func,
    isSnackbarActive: PropTypes.bool,
    snackbarText: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
    snackbarTimeout: PropTypes.number
  }

  constructor() {
    super()
    console.log('toaster')
  }

  componentDidUpdate () {
    console.log(this.props)
    // const colors = { background: '#4F85AE', text: "#FFFFFF" }
    // notify.show(this.props.snackbarText, 'custom', 99999999, colors)
    const options = {
      position: 'bottom',
      effect: 'genie',
      onClose: this.props.hideSnackbar,
      beep: false,
      timeout: this.props.snackbarTimeout
    }
    Alert.info(this.props.snackbarText, options)
  }
  // {/* <ToastMessageAnimated
  // showAnimation="bounceInUp"
  // active={this.props.isSnackbarActive.toString()}
  // {/* timeOut= */}
  // timeOut=99999
  // onRemove={this.props.hideSnackbar}
  // message={this.props.snackbarText} /> */}
  render() {
    return (
      <Alert stack={{limit: 3}} />
    )
  }
}

export default Toaster
