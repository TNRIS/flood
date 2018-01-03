import React from 'react'
import PropTypes from 'prop-types'
import { Snackbar } from 'react-mdl'

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
        <Snackbar
        active={this.props.isSnackbarActive}
        timeout={this.props.snackbarTimeout}
        onTimeout={this.props.hideSnackbar}>
          {this.props.snackbarText}
        </Snackbar>
      </div>
    )
  }
}

export default Toaster
