import React from 'react'
import PropTypes from 'prop-types'
import { ToastMessageAnimated } from "react-toastr";

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
      <div>
        <ToastMessageAnimated
        showAnimation="bounceInUp"
        active={this.props.isSnackbarActive.toString()}
        timeOut={this.props.snackbarTimeout}
        onRemove={this.props.hideSnackbar}
        message={this.props.snackbarText} />
      </div>
    )
  }
}

export default Toaster
