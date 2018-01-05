import React from 'react'
import PropTypes from 'prop-types'
import { ToastContainer, toast } from 'react-toastify';

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

  render() {
    return (
      // active={this.props.isSnackbarActive}
      toast({this.props.snackbarText}, {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: {this.props.snackbarTimeout},
        onClose: {this.props.hideSnackbar}
      })

      <div>
        <ToastContainer />
      </div>
    )
  }
}

export default Toaster
