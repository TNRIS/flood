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
  }

  componentDidUpdate () {
    if (this.props.snackbarText != '') {
      const options = {
        position: 'bottom',
        effect: 'genie',
        onClose: this.props.hideSnackbar,
        beep: false,
        timeout: this.props.snackbarTimeout
      }
      Alert.info(this.props.snackbarText, options)
    }
  }
  render() {
    return (
      <Alert stack={{limit: 3}} preserveContext />
    )
  }
}

export default Toaster
